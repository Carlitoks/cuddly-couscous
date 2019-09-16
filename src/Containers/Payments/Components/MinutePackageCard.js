import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import I18n, { localizePrice } from "../../../I18n/I18n";
import { CheckBox } from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient";
import moment from 'moment';

// Styles
import defaultStyles from "./Styles/PackagesStyles";

export default class MinutePackageCard extends Component {
  constructor(props) {
    super(props);
    const { minutePackage } = props;
    const subscriptionPeriodDuration = minutePackage && minutePackage.subscriptionPeriodDuration && minutePackage.subscriptionPeriodDuration.split(":");
    if(subscriptionPeriodDuration) {
      this.state = {
        subscriptionPeriodDuration,
        subscriptionPeriodDurationType: subscriptionPeriodDuration[1] === "m" ? subscriptionPeriodDuration[1].toUpperCase() : subscriptionPeriodDuration[1],
        checked: props.reloadNoticeValue,
      };

    } else {
      this.state = {
        checked: props.reloadNoticeValue,
      };
    }
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

    const styles = {...defaultStyles, ...style};

    const { subscriptionPeriodDuration, subscriptionPeriodDurationType } = this.state;

    return (
      <View style={styles.topContainer}>
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
            <View style={styles.nameContainer}>
              <Text style={styles.title}>
                {minutePackage.name}
              </Text>
              <Text style={discountedPrice ? styles.pricePromoCode : styles.currencyPrice}>
                {this.renderPrice(minutePackage.cost, minutePackage.currency)}
              </Text>
              { discountedPrice ?
                <Text style={styles.discountedPrice}>
                  {this.renderPrice(minutePackage.adjustedCost, minutePackage.currency)}
                </Text>
                :
                null
              }
            </View>
            <View style={styles.minutesContainer}>
              { minutePackage.unlimitedUse && <Text style={ discountedPrice ? styles.pricePromoCode : styles.price}>
                {I18n.t("account.balanceUnlimited")}
              </Text> }

              { !minutePackage.unlimitedUse && <React.Fragment>
                <Text style={ styles.price }>
                  {minutePackage.minutes}
                </Text>
                <Text style={styles.minutes}>
                  {I18n.t("minutes")}
                </Text>
              </React.Fragment>}
            </View>
          </View>
          <View>
            { minutePackage.subscriptionPeriodDuration
              ? <Text style={styles.subscriptionDuration}>
                {I18n.t("minutePackage.validThrough", {date: moment().add(subscriptionPeriodDuration, subscriptionPeriodDurationType).format("MMM DD") })}
              </Text>
              : minutePackage.subscriptionPeriod ?
              <Text style={styles.subscriptionDuration}>
                {I18n.t("minutePackage.validBetween", {date1: moment(minutePackage.subscriptionPeriodBeginAt).format("ll"), date2: moment(minutePackage.subscriptionPeriodEndAt).format("ll")})}
              </Text> :
              null
            }
            <Text style={styles.packageDescription}>
              {minutePackage.description}
            </Text>
          </View>
        {displayReloadNotice ?
          <View>
            <CheckBox
              title={I18n.t("packages.checkout.reload", { num: minutePackage.reloadAtAmount || 0 })}
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
              <Text allowFontScaling={false} style={styles.select}>
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
    );
  }
}

