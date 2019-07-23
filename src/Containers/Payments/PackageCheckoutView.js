import React, { Component } from "react";
import {ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import OrderSummary from "./Components/OrderSummary";
import MinutePackageCard from "./Components/MinutePackageCard";
import {purchaseMinutePackage} from "../../Ducks/AccountReducer";

// Styles
import styles from "./Styles/PackageDetailsStyles";
import { Icon } from "react-native-elements";
import I18n, { translateApiError } from "../../I18n/I18n";


class PackageCheckoutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      reloadable: props.navigation.state.params.minutePackage.reloadable
    };
    this.loading = false;
  }

  purchase() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    this.setState({loading:true}, () => {
      const { navigation, purchaseMinutePackage, minutePackagePromoCode } = this.props;

      const payload = {
        minutePackageID: navigation.state.params.minutePackage.id,
        minutePackagePromoCodeID: minutePackagePromoCode,
        autoreload: this.state.reloadable
      }

      purchaseMinutePackage(payload)
      .then(asd => navigation.dispatch({
        type: 'PackagePurchaseSuccessView',
        params: {
          minutePackage: navigation.state.params.minutePackage,
          reloadable: this.state.reloadable},
        }))
      .catch((e) => {
        console.log(e);
        Alert.alert(I18n.t('error'), translateApiError(e, 'api.errUnexpected'));
        this.loading = false;
        this.setState({loading: false});
      });
    });
  }

  checkboxChange(){
    this.setState({reloadable: !this.state.reloadable})
  }

  render() {
    const { user, navigation } = this.props;
    console.log(user);
    return (
      <View style={styles.wrapperContainer}>
          <NavBar
            leftComponent={
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({type: "back"})}>
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50} />
                </View>
              </TouchableOpacity>
            }
            rightComponent={
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({type: "back"})}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelStyle}>{I18n.t("cancel")}</Text>
                </View>
              </TouchableOpacity>
            }
            navbarTitle={I18n.t("packages.checkout.title")}
          />

          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
        <MinutePackageCard
          minutePackage = {navigation.state.params.minutePackage}
          selectable={false} // show the select button
          onSelect={ () => {} } // func to call if select button pressed
          displayReloadNotice={navigation.state.params.minutePackage.reloadable} // display the reload notice or not
          reloadNoticeValue={this.state.reloadable} // whether or not the checkbox is selected
          onReloadNoticeSelect={() => this.checkboxChange()} // func called when reload notice is selected, or unselected, `val` is a boolean
          promoCodeActive={!!this.props.minutePackagePromoCode}
          discountedPrice={navigation.state.params.minutePackage.adjustedCost != navigation.state.params.minutePackage.cost ? navigation.state.params.minutePackage.adjustedCost : false}
          special={navigation.state.params.minutePackage.public ? false : I18n.t("minutePackage.special")}
          specialColors={["#F39100", "#FCB753"]}
        />
            <OrderSummary
              navigation={navigation}
              haveCard={!!user.stripePaymentToken} //
              styles = {styles} // main container style
              textStyle = {styles.textBill} // optional text styles, component should provide defaults
              minutePackage={navigation.state.params.minutePackage}
              promoCode={this.props.minutePackagePromoCode}
              loading={this.state.loading}
              purchase={() => this.purchase()}
              />
            <View style={this.state.loading?  styles.whiteView : styles.transparentView}>
              </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta,
  user: state.account.user,
  minutePackagePromoCode: state.account.minutePackagePromoCode
});

const mD = {
  purchaseMinutePackage,
 };

export default connect(
  mS,
  mD
)(PackageCheckoutView);
