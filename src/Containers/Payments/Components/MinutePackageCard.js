import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import InputRegular from "../../../Components/InputRegular/InputRegular";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScaleViewports } from "../../../Util/Scaling";
import metrics from "../../../Themes/Metrics";
import { CheckBox } from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient";



// Styles
import styles from "./Styles/PackagesStyles";

class MinutePackageCard extends Component {
  constructor(props) {
    super(props);
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
      specialColors} = this.props;
    
    return (
      <View 
        style={styles.mainBorderContainer}
        key={minutePackage.id} 
      >        
        <View style={styles.borderContainer}>
        { special ? 
          <View style={styles.specialContainer2}>

            <Text
              style={styles.specialText2}
            >
              {I18n.t("minutePackage.special")}
            </Text>
          </View>
          : null
        }
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
            <Text 
              style={ promoCodeActive ? styles.pricePromoCode : styles.price}
            >
              {minutePackage.coin} {minutePackage.price}
            </Text>
          </View>
          <View>
            <View style={styles.headerContainer}>
              <Text>
                {minutePackage.time} 
              </Text>
              { promoCodeActive ? 
                <Text 
                  style={styles.discountedPrice}
                >
                  {minutePackage.coin} {discountedPrice}
                </Text>
              : 
                null 
              }
            </View>
            { minutePackage.valid ? 
              <Text>
                {minutePackage.valid}
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
              <Text
                style={styles.select}
              >
                {I18n.t("actions.select")}
              </Text>
            </TouchableOpacity>
          </View>
        :
          null
        }
      </View>
    </View>
    );
  }
}

const mS = state => ({
});

const mD = {
};

export default connect(
  mS,
  mD
)(MinutePackageCard);
