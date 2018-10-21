import React, { Component } from "react";
import "../App.css";

class Sound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ padding: 20, margin: 40 }}>
        {this.props.message}
        <br />
        {this.props.tag}
      </div>
    );
  }
}
export default Sound;
