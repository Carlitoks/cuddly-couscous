/* BORRAR, VISTAS DE EJEMPLO */

import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

import { getDataAsync } from "./Ducks/DataReducer"; //

import { getGeolocationCoords } from "./Util/Helpers";

class Profile extends Component {
  componentWillMount() {
    // LLAMADA DE EJEMPLO
    this.props.getDataAsync();

    // Example Geolocation Call
    getGeolocationCoords()
      .then(pos => console.log(pos))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View>
        <Text>Profile View</Text>
      </View>
    );
  }
}

// Map State to Props
const mS = state => ({
  loading: state.dataReducer.loading,
  data: state.dataReducer.data
});

// Map Dispatch to Props
const mD = {
  getDataAsync
};

//Connect everything
export default connect(mS, mD)(Profile);
