import React, { Component } from "react";
import Leaflet from "leaflet";
import L from "leaflet-routing-machine";
import "../App.css";
import _ from "lodash";
import fire from "./fire";

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      messages: []
    };
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
      messages: messages
    });
    console.log(messages);

    // 19.0729578, 72.8999708
    // messages[0]["lat"], messages[0]["lon"]

    var mymap = Leaflet.map("mapid", {
      center: [messages[0]["lat"], messages[0]["lon"]],
      zoom: 15
    });
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    Leaflet.marker([messages[0]["lat"], messages[0]["lon"]], {
      riseOnHover: true
    })
      .addTo(mymap)
      .bindPopup("Tress are cutting enormously")
      .openPopup();
    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(messages[0]["lat"], messages[0]["lon"]),
        Leaflet.latLng(19.0669151, 72.8975533)
      ],
      routeWhileDragging: true
    })
      .on("routesfound", function(e) {
        var routes = e.routes;
        alert("Found " + routes.length + " route(s).");
      })
      .on("routeselected", function(e) {
        var route = e.route;
        alert(
          "Showing route between waypoints:\n" +
            JSON.stringify(route.inputWaypoints, null, 2)
        );
      })
      .addTo(mymap);
    var circle = Leaflet.circle([19.072955, 72.899979], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 80
    }).addTo(mymap);
  }

  componentDidMount() {
    this.db = fire;
    let app = this.db.database().ref("data");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });

    console.log(this.state.messages);
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Get the real time notification of help and unsafe area</h1>
        <br />
        <div id="mapid" style={{ height: 400, marginBottom: 14 }} />
        <div className="footer">
          Environ - A better place to live © ENVIRON | All rights reserved
        </div>
      </div>
    );
  }
}
