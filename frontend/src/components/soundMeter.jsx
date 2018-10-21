import React, { Component } from "react";
import "../App.css";
import Sound from "./sound";
import fire from "./fire";
import trim from "trim";
import _ from "lodash";
import mic from "../static/mic.png";

class SoundMeter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      frequency: ""
    };
    this.db = fire;
    let app = this.db.database().ref("sound");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        return cloned;
      })
      .value();
    this.setState({
      messages: messages,
      frequency: messages[0]["tag"]
    });
    console.log(messages[0]["tag"]);
  }

  render() {
    let messageNodes = this.state.messages.map(message => {
      return (
        <div
          style={{
            textAlign: "center",
            width: 400,
            margin: 10,
            backgroundColor: "#000",
            color: "#94a21d",
            display: "inline-block",
            borderRadius: 3
          }}
        >
          <div>
            <Sound message={message.decibels} tag={message.tag} />
          </div>
        </div>
      );
    });
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1 />
        <h1>
          Report noise pollution. Don't bear it. For reporting this act follow
          below link:
        </h1>
        <div style={{ padding: 15, color: "#000", background: "#fff" }}>
          <a
            href="https://webapp.halton.gov.uk/generalenquiry/?type=noise"
            style={{ color: "#000", textDecoration: "none" }}
          >
            https://webapp.halton.gov.uk/generalenquiry/?type=noise
          </a>
        </div>
        <br />
        <img src={mic} style={{ width: 80, height: 80 }} />
        <br />
        <h1> Conclusion: </h1>
        <h1 style={{ color: "#fff" }}> {this.state.frequency}</h1>
        <br />
        {messageNodes}
      </div>
    );
  }
}

export default SoundMeter;
