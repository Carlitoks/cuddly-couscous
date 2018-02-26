import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { Divider } from "react-native-elements";
import { Colors } from "../../Themes";

import styles from "./styles";

/**
 * @description Generic list component
 *
 * Props:
    data: Data to render on list,
    triangle: Boolean to render triangle on top of list,
    onPress: Function to execute when an item is pressed,
    multiple: Boolean to allow multiple selection on list,
    selected: Index(es) of selected item(s). If there is no selected item(s) value will be -1 or [] in case multiple is true
 *
 * @export
 * @class ListComponent
 * @extends {Component}
 */
class ListComponent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      selected: !!this.props.multiple ? !!this.props.selected ? this.props.selected : [] : -1
    }
  }

  keyExtractor = (item) => {
    return item.id;
  }

  removeFromList = (list, index) =>{
    list.splice(index, 1);
  }

  selectItem = (index) =>{
    if(!this.props.multiple){
      console.log("INDEX SELECTED", index)
      this.props.selected = index;
      this.setState({selected: index});
    }else{
      let exist = this.state.selected.indexOf(index) > -1;
      console.log("exist", exist);
      let sel = this.state.selected;

      !exist ? sel.push(index) :
      this.removeFromList(sel, this.state.selected.indexOf(index));

      this.props.selected = sel;
      this.setState({selected: sel});
      console.log(sel);
    }
    
  }

  getSelectedStyle = (index) => {
    if(index >= 0){
      if(!!this.props.multiple){
        return (this.state.selected.indexOf(index) > -1) ? styles.selected : (this.state.selected.indexOf(index+1) > -1) ? styles.belowSelected : null;
      }else{
        return index == this.state.selected ? styles.selected : index == this.state.selected + 1 ? styles.belowSelected : null;
      }
    }else{
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={!!this.props.triangle ? styles.triangle : null}/>
        <FlatList
          data={this.props.data}
          extraData={this.state}
          renderItem={({item, index}) => 
            <Text 
              onPress={() => {
                this.selectItem(index);
                !!this.props.onPress ? this.props.onPress() : null;
              }}
              style={[styles.text, index > 0 ? styles.textBetween: null, this.getSelectedStyle(index)]}
            >
              {item.id}
            </Text>
          }
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

export default ListComponent;