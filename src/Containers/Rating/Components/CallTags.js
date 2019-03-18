import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { TagSelect } from 'react-native-tag-select';
import { Divider } from 'react-native-elements';


// Styles
import styles from "./Styles/CallTagsStyles";

export default class CallTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whatWasGood: [
        { id: 1, label: 'Time To Connect' },
        { id: 2, label: 'Language Ability' },
        { id: 3, label: 'Professionalism' },
      ],
      couldBeBetter: [
        { id: 1, label: 'Connection' },
        { id: 2, label: 'Voice Clarity' },
        { id: 3, label: 'Appearance' },
        { id: 4, label: 'Friendliness' },
        { id: 5, label: 'Hard to Understand' },
        { id: 6, label: 'Background Noise' },
      ]
    };
  }

  render() {
    return <ScrollView contenContinerStyle={styles.flexEndCenter}>
      <Text style={styles.baseText}>What was good?</Text>
      <TagSelect
        data={this.state.whatWasGood}
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

      <Text style={styles.baseText}>What could be better?</Text>
      <TagSelect
        data={this.state.couldBeBetter}
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

      <View style={styles.bottomDividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.addComments}>+ Add Comments</Text>
        <Divider style={styles.divider} />
      </View>
    </ScrollView>;
  }
}
