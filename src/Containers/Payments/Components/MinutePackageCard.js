import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import I18n, { localizePrice } from "../../../I18n/I18n";
import { CheckBox } from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient";

// Styles
import defaultStyles from "./Styles/PackagesStyles";

export default class MinutePackageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.reloadNoticeValue,
    };
  }

  renderPrice(amount, currency) {
    return localizePrice({amount, currency});
  }

  render() {
    const { 
      minutePackage, 
      selectable,
      onSelect,
      displayReloadNotice,
      reloadNoticeValue,
      onReloadNoticeSelect,
      promoCodeActive,
      discountedPrice,
      special,
      specialColors,
      style
    } = this.props;

    const styles = {...defaultStyles, ...style}

    
    return (
      <View style={styles.topContainer}>
      <View style={styles.shadowContainer}>
        { special ?
          <View style={styles.rowContainer}>
            <View style={styles.specialContainer}>
              <Text style={styles.specialText}>
                {I18n.t("minutePackage.special")}
              </Text>
            </View>
          </View>
          : null
        }
        <View style={styles.borderContainer}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={special ? specialColors : ["#81B831", "#93C848"]}
            style={styles.grandient}
            locations={[0, 1]}
          />
        </View> 
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              {minutePackage.name}
            </Text> 
            <Text style={ discountedPrice ? styles.pricePromoCode : styles.price}>
              {this.renderPrice(minutePackage.cost, minutePackage.currency)}
            </Text>
          </View>
          <View>
            <View style={styles.headerContainer}>
              <Text>
                {I18n.t("minutesAbbreviation",{minutes: minutePackage.minutes})}
              </Text>
              { discountedPrice ? 
                <Text style={styles.discountedPrice}>
                {this.renderPrice(minutePackage.adjustedCost, minutePackage.currency)}
                </Text>
              : 
                null 
              }
            </View>
            { minutePackage.subscriptionPeriod ? 
              <Text>
                {minutePackage.subscriptionPeriodBeginAt} {minutePackage.subscriptionPeriodEndAt}
              </Text> : 
              null
            }
            <Text>
              {minutePackage.description}
            </Text>
          </View>
        {displayReloadNotice ?
          <View>
            <CheckBox
              title={I18n.t("packages.checkout.reload", { num: 10 })}
              textStyle={styles.checkBox}
              checked={reloadNoticeValue}
              containerStyle={styles.checkboxContainer}
              onPress={() => onReloadNoticeSelect()}
            />
          </View>
          :
          null 
        }
        {selectable ?             
          <View style={styles.scenarioInputContainer}>
            <TouchableOpacity
              style={styles.button }
              activeOpacity={0.8} 
              onPress={onSelect}
            >
              <Text style={styles.select}>
                {I18n.t("actions.select")}
              </Text>
            </TouchableOpacity>
          </View>
        :
          null
        }
        {!selectable && !displayReloadNotice ?
          <View style={styles.space}></View>
          : null
        }
      </View>
    </View>
    </View>
    );
  }
}

