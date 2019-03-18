import React, { Component } from "react";
import { View, Text } from "react-native";
import { TagSelect } from 'react-native-tag-select';


// Styles
import styles from "./Styles/CallClassificationStyles";

export default class CallClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        { id: 1, label: 'Linguist Trial Call' },
        { id: 2, label: 'Product Demo Call' },
        { id: 3, label: 'Language Practice' },
        { id: 4, label: 'Customer Support' },
      ]
    };
  }

  render() {
    return <View style={styles.flexEndCenter}>
      <Text style={styles.baseText}>Call Classification</Text>
      <TagSelect
        data={this.state.tags}
        max={1}
        ref={(tag) => {
          this.tag = tag;
        }}
        itemStyle={[ styles.baseTagsStyle, styles.tagUnselected]}
        itemLabelStyle={[styles.baseTagText, styles.baseTagTextUnselected]}
        itemStyleSelected={[ styles.baseTagsStyle, styles.tagSelected]}
        itemLabelStyleSelected={[styles.baseTagText, styles.baseTagTextSelected]}
        containerStyle={styles.tagsContainer}
      />

    </View>;
  }
}
