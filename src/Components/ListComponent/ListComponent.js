import React, { Component } from "react";
import { FlatList, View, Text, Dimensions, Keyboard } from "react-native";
import { List } from "react-native-elements";
import { Colors } from "../../Themes";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

import styles from "./styles";

const height = Dimensions.get("window").height;

/**
 * @description Generic list component
 *
 * Props:
    data: Data to render on list,
    triangle: Boolean to render triangle on top of list,
    onPress: Function to execute when an item is pressed,
    multiple: Boolean to allow multiple selection on list,
    selected: Index(es) of selected item(s). If there is no selected item(s) value will be -1 or [] in case multiple is true
    titleProperty: if defined, will be the propery used to display each item title,
    other: Object to add to the list with different behaviour (the object must have a boolean property named "other" and be set to true,
    otherOnPress: Function to execute when the other item is selected,
    changeSelected: Function to change on parent the selected value,
    scrollable: Boolean to make list scroll,
    customContainerStyle: Custom styles for list container,
    leftText: Boolean to align text to the left
    noFlex: when provided, the list will not display within a flex container
 *
 * @export
 * @class ListComponent
 * @extends {Component}
 */
class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: !!this.props.multiple
        ? !!this.props.selected ? this.props.selected : []
        : -1,
      keyboard: false
    };
  }

  componentWillMount() {
    !!this.props.other ? this.props.data.push(this.props.other) : null;
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollToIndex(true);
    }, 50);
  }

  componentDidUpdate() {
    const { other, data } = this.props;
    const dataContainsOther = data.filter(item => item.other).length == 0;

    if (other && dataContainsOther) {
      data.push(other);
    }

    this.scrollToIndex(true);
  }

  _keyboardDidShow() {
    this.setState({ keyboard: true });
  }

  _keyboardDidHide() {
    this.setState({ keyboard: false });
  }

  verifyPosition() {
    if (
      this.props.selected < 8 ||
      this.props.selected > this.props.data.length - 9
    ) {
      return false;
    } else {
      return true;
    }
  }

  scrollToIndex(animated) {
    if (
      this.props.selected <= this.props.data.length - 1 &&
      !!this.props.scrollable &&
      !this.state.keyboard &&
      this.verifyPosition()
    ) {
      this.refs.list.scrollToIndex({
        animated: true,
        index: this.props.selected > -1 ? this.props.selected : 0,
        viewOffset: height / 4,
        viewPosition: 0
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps;
    this.setState({ selected: selected });
    setTimeout(() => {
      this.scrollToIndex(true);
    }, 50);
  }

  componentWillReceiveProps() {
    const { selected } = this.props;
    this.setState({ selected: selected });
  }

  getTitle = item => {
    const { titleProperty } = this.props;
    const titleParam = titleProperty ? titleProperty : "id";

    return item[titleParam];
  };

  keyExtractor = item => {
    return this.getTitle(item);
  };

  removeFromList = (list, index) => {
    list.splice(index, 1);
  };

  selectItem = index => {
    if (!this.props.multiple) {
      this.setState({ selected: index });
    } else {
      let exist = this.state.selected.indexOf(index) > -1;
      let sel = this.state.selected;

      !exist
        ? sel.push(index)
        : this.removeFromList(sel, this.state.selected.indexOf(index));

      this.setState({ selected: sel });
    }
  };

  getSelectedStyle = index => {
    if (index >= 0) {
      if (!!this.props.multiple) {
        return this.props.selected.indexOf(index) > -1
          ? styles.selected
          : this.props.selected.indexOf(index + 1) > -1
            ? styles.belowSelected
            : null;
      } else {
        return index == this.props.selected
          ? styles.selected
          : index == this.props.selected - 1 ? styles.belowSelected : null;
      }
    } else {
      return null;
    }
  };

  isSelected = index => {
    if (!!this.props.multiple) {
      return this.props.selected.indexOf(index) > -1 ? true : false;
    } else {
      return index == this.props.selected ? true : false;
    }
  };

  isOther = item => {
    return !!item.other;
  };

  getItemLayout = (data, index) => ({ length: 38, offset: 38 * index, index });

  render() {
    return (
      <View
        style={[
          this.props.noFlex ? null : styles.container,
          this.props.customContainerStyle
        ]}
      >
        <View style={!!this.props.triangle ? styles.triangle : null} />

        <List
          containerStyle={styles.listContainer}
          automaticallyAdjustContentInsets={false}
        >
          <FlatList
            keyboardShouldPersistTaps={"always"}
            scrollEventThrottle={1}
            data={this.props.data}
            extraData={this.state}
            initialScrollIndex={this.props.initial}
            ref="list"
            getItemLayout={this.getItemLayout}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.textView,
                  index > 0 ? styles.textBetweenView : null,
                  this.getSelectedStyle(index)
                ]}
              >
                <Text
                  style={[
                    styles.regText,
                    this.isSelected(index) ? styles.selectedText : null,
                    this.props.leftText ? styles.leftText : null
                  ]}
                  onPress={() => {
                    !!item.onPress
                      ? item.onPress()
                      : !!this.props.changeSelected
                        ? this.props.changeSelected(index)
                        : null;
                    this.selectItem(index);
                    !!this.props.other
                      ? !!this.props.otherOnPress && this.isOther(item)
                        ? this.props.otherOnPress()
                        : !!this.props.onPress
                          ? this.props.onPress(index)
                          : null
                      : !!this.props.onPress ? this.props.onPress(index) : null;
                    this.state.keyboard ? Keyboard.dismiss() : null;
                  }}
                >
                  {this.getTitle(item)}
                </Text>
                {item.other ? (
                  <Icon
                    pointerEvents={"none"}
                    style={
                      this.isSelected(index) ? styles.iconSelected : styles.icon
                    }
                    name="chevron-right"
                    size={moderateScale(40)}
                    color={Colors.gray}
                  />
                ) : null}
              </View>
            )}
            keyExtractor={this.keyExtractor}
          />
        </List>
        {this.props.gradient ? (
          <LinearGradient
            pointerEvents={"none"}
            colors={["rgba(247, 247, 247, 0.2)", Colors.greyBackground]}
            style={styles.linearGradient}
          />
        ) : null}
      </View>
    );
  }
}

export default ListComponent;
