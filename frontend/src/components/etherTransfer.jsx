import React, { Component } from "react";
import getWeb3 from "../getWeb3";
import EtherContract from "../blockchain/build/contracts/Ether.json";
import fire from "./fire";
import _ from "lodash";

let contractInstance = null;
const contract = require("truffle-contract");

class EtherTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      web3: null,
      successful: false,
      messages: [],
      messages1: []
    };
    this.db = fire;
    this.db1 = fire;
    let app = this.db.database().ref("ether");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });
    let app1 = this.db1.database().ref("code");
    app.on("value", snapshot => {
      this.getData1(snapshot.val());
    });
  }

  getData1(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        return cloned;
      })
      .value();

    var size = this.state.messages.length;

    this.setState({
      messages1: messages
    });
    console.log(messages);
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

    var size = this.state.messages.length;

    this.setState({
      messages: messages
    });
    console.log(messages);
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3,
          metamask: true
        });
        this.instantiateContract();
      })
      .catch(() => {
        this.setState({ metamask: false });
        console.log(
          "Error finding web3. Please make sure metamask is installed"
        );
      });
  }

  instantiateContract() {
    const instance = this;
    this.state.web3.eth.getAccounts((error, result) => {
      if (error != null) {
        console.log("Could not get accounts");
      } else {
        console.log(result);
        [this.state.web3.eth.defaultAccount] = result;
        const auctionContract = contract(EtherContract);
        auctionContract.setProvider(this.state.web3.currentProvider);
        auctionContract.deployed().then(i => {
          contractInstance = i;
        });
        console.log(this.state.web3);
      }
    });
  }

  formSubmit = e => {
    e.preventDefault();
    console.log("entered form submit");
    const thisInstance = this;

    thisInstance.state.web3.eth.sendTransaction({
      from: "0xfe7237016f99b562064811b8612b72ca1b97f93e",
      to: "0x6bBa72f7bDCa056377F984fccbB69Fb3b1883c07",
      value: thisInstance.state.web3.utils.toWei("2", "ether")
    });
  };

  formSubmit1 = e => {
    e.preventDefault();
    console.log("entered form submit");
    const thisInstance = this;

    thisInstance.state.web3.eth.sendTransaction({
      from: "0xfe7237016f99b562064811b8612b72ca1b97f93e",
      to: "0x6bBa72f7bDCa056377F984fccbB69Fb3b1883c07",
      value: thisInstance.state.web3.utils.toWei(this.state.ether, "ether")
    });
  };

  getAmount = e => {
    e.preventDefault();
    const thisInstance = this;
    contractInstance.getAmount
      .call({ from: thisInstance.state.web3.eth.defaultAccount })
      .then(res => {
        console.log(res);
        if (res) {
          console.log("*****************************");
          console.log(res);

          thisInstance.setState({ successful: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let messageNodes = this.state.messages1.map(message => {
      return (
        <div className="card-white">
          <p style={{ fontSize: 20 }}>Product name: </p>
          <p style={{ fontSize: 30, color: "#94a21d" }}>{message.name}</p>
          <p style={{ fontSize: 20 }}>Amount: </p>
          <p style={{ fontSize: 30, color: "#94a21d" }}>{message.price}</p>
          <p style={{ fontSize: 20 }}>Account no.: </p>
          <p style={{ fontSize: 15, color: "#94a21d" }}>{message.accoun}</p>
          <button style={{ padding: 10, fontWeight: "bold" }} type="submit">
            Submit
          </button>
        </div>
      );
    });

    let etherNodes = this.state.messages.map(message => {
      this.state.ether = message.ether;
      return (
        <div className="card-white">
          <p style={{ fontSize: 20 }}>Amount: </p>
          <p style={{ fontSize: 30, color: "#94a21d" }}>{message.ether}</p>
          <p style={{ fontSize: 20 }}>Account no.: </p>
          <p style={{ fontSize: 15, color: "#94a21d" }}>{message.account}</p>

          <button style={{ padding: 10, fontWeight: "bold" }} type="submit">
            Submit
          </button>
        </div>
      );
    });

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Reward for the environment saviour</h1>
        <div className="ether" style={{ marginTop: -1 }}>
          <div className="col-md-4 row">
            <form onSubmit={this.formSubmit}>
              <div className="card-black">Barcode</div>
              {messageNodes}
            </form>
          </div>

          <div className="col-md-4 row">
            <form onSubmit={this.formSubmit1}>
              <div className="card-black">Dustbin</div>
              {etherNodes}
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="footer">
          Environ - A better place to live © ENVIRON | All rights reserved
        </div>
      </div>
    );
  }
}

export default EtherTransfer;
