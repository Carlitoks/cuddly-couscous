import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem } from "react-native-elements";

export class CallHistoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
  componentDidMount() {
    if (this.props.data) {
      this.setState((prevState, props) => {
        return { data: props.data };
      });
    }
  }
  callDetail(data) {
    const navigate = this.props.navigation.navigate;
    navigate("CallDetail");
  }
  render() {
    const navigation = this.props.navigation; 
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.title}
              subtitle={item.subtitle}
              avatar={{ uri: item.avatar }}
              rightTitle={"11-12-12"}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => navigation.dispatch({ type: "SessionInfoView" })} 
            />
          )}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </List>
    );
  }
}
