import React, { Component } from "react";
import "../App.css";
import main from "../static/carousel.jpg";
import help from "../static/help1.png";
import { relative } from "path";
import banner from "../static/carousel2.jpg";

class Test extends Component {
  state = {};
  render() {
    return (
      <div>
        <div id="banner" data-video={banner} />
        <div style={{ padding: 20, background: "#000" }}>
          <div>
            <p style={{ fontSize: 55, margin: 5, color: "#fff" }}>Features</p>
          </div>
          <br />
          <div style={{ padding: 30 }}>
            <div className="col-md-4 row">
              <div className="card-green">Maps</div>
              <div className="card-white">
                We have a map feature in our web app. If someone feels that any
                anti-environmental activity is going around them, they can
                report that activity in our Environ android app by capturing its
                image, specifying what illegal act is happening and send it
                through our app, their location will be plotted on the web app
                map along with a description that has been reported and this
                location can be seen by all people using this app along with
                government officials and authorities so that appropriate action
                can be taken against the convicts doing such activities.
              </div>
            </div>

            <div className="col-md-4 row">
              <div className="card-green">News</div>
              <div className="card-white">
                You can search the current news regarding any topic of your
                interest along with news related to wildlife surroundings and
                recent government policies for the welfare of the environment.
                This will create awareness among people about the environmental
                conditions.
              </div>
            </div>

            <div className="col-md-4 row">
              <div className="card-green">Blockchain</div>
              <div className="card-white">
                Blockchain Technology is used in the web app for secured
                transaction of ethers. As soon as someone scans the barcode of
                the product he/she buys, according to its eco-friendly rating
                and price of the product, a cashback will be generated to the
                person's account in terms of ether. We also try to initiate a
                cleanliness drive into people by providing an reward cum
                incentive in terms of ether according to a mathematical function
                which generates the amount of ether to be transferred into the
                person's account according to the value of waste the person
                dumps.
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          Environ - A better place to live © ENVIRON | All rights reserved
        </div>
      </div>
    );
  }
}

export default Test;
