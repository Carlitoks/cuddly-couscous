import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import Promocode from "./Components/PromoCode"
// Styles
import styles from "./Styles/AvailablePackagesStyles";
import metrics from "../../Themes/Metrics";
import { Icon } from "react-native-elements";
import I18n, { translateApiErrorString } from "../../I18n/I18n";
import MinutePackageCard from "./Components/MinutePackageCard";
import Close from "../../Components/Close/Close";

import { loadMinutePackages } from "../../Ducks/AccountReducer";

class AvailablePackagesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      promoCodeError: false,
    }
  }
  
  componentDidMount(){
    this.props.loadMinutePackages(false)
    .then(()  => this.setState({loading: false})); 
  }

  packageRender(){
    const { navigation } = this.props;

    const styleMinutePackageCard = {
      topContainer: {
        marginTop: 0, 
        marginBottom: 10, 
        alignItems: 'center',
        width: metrics.width * 0.9,
      }
    }

    return this.props.minutePackages.map( minutePackage => 
      <MinutePackageCard
        key={minutePackage.id}  
        minutePackage = {minutePackage}
        style={styleMinutePackageCard}
        selectable={true} // show the select button
        onSelect={ () => navigation.dispatch({type: "PackageCheckoutView", params: {minutePackage}}) } // func to call if select button pressed
        displayReloadNotice={false} // display the reload notice or not
        reloadNoticeValue={false} // whether or not the checkbox is selected
        onReloadNoticeSelect={(val) => {}} // func called when reload notice is selected, or unselected, `val` is a boolean
        promoCodeActive={!!this.props.minutePackagePromoCode}
        discountedPrice={minutePackage.adjustedCost != minutePackage.cost ? minutePackage.adjustedCost : false}
        special={minutePackage.public ? false : I18n.t("minutePackage.special")}
        specialColors={["#F39100", "#FCB753"]}
      />);
  }

  applyPromocode(promocode = null){
    this.setState({loading: true, promoCodeError: false});
    this.props.loadMinutePackages(false, promocode)
    .then(()  => {
      console.log(this.props)
    })
    .catch(err => {
      console.log(err);
      this.setState({promoCodeError: translateApiErrorString(err, "api.errTemporary")});
    })
    .finally(() => {
      this.setState({loading: false});
    })
    
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.wrapperContainer}>
        <NavBar
          leftComponent={
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({ type: "back" })}>
              <View>
                <Icon name="chevron-left" type="evilicon" color="white" size={50} />
              </View>
            </TouchableOpacity>
          }
          rightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={I18n.t("packages.browse.title")}
        />
        
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
            >
            <Promocode 
              navigation={navigation} 
              loading={this.state.loading}
              promoCode={this.props.minutePackagePromoCode ? this.props.minutePackagePromoCode : ''}
              error={this.state.promoCodeError}
              applaied={!!this.props.minutePackagePromoCode}
              apply={(promoCode) => this.applyPromocode(promoCode)}
              remove={() => {this.applyPromocode(null)}}
            />
            {this.state.loading ? 
              <ActivityIndicator size="large" color="purple" style={{ zIndex: 100000, top: 150 }} />  
            :
              this.props.minutePackages ? this.packageRender() : null
            }
          </ScrollView>
        
      </View>
    );
  }
}

const mS = state => ({
  minutePackages: state.account.minutePackages,
  minutePackagePromoCode: state.account.minutePackagePromoCode
});

const mD = {
  loadMinutePackages,
};

export default connect(
  mS,
  mD
)(AvailablePackagesView);

/*
<MinutePackageCard 
minutePackage = {dummyList[0]}
selectable={true} // show the select button
onSelect={ () => navigation.dispatch({type: "back"}) } // func to call if select button pressed
displayReloadNotice={false} // display the reload notice or not
reloadNoticeValue={false} // whether or not the checkbox is selected
onReloadNoticeSelect={(val) => { alert (val)}} // func called when reload notice is selected, or unselected, `val` is a boolean
promoCodeActive={true}
discountedPrice={40}
special={I18n.t("minutePackage.special")}
specialColors={["#F39100", "#FCB753"]}
/>
<MinutePackageCard 
minutePackage = {dummyList[0]}
selectable={false} // show the select button
onSelect={ () => navigation.dispatch({type: "back"}) } // func to call if select button pressed
displayReloadNotice={true} // display the reload notice or not
reloadNoticeValue={false} // whether or not the checkbox is selected
onReloadNoticeSelect={(val) => {}} // func called when reload notice is selected, or unselected, `val` is a boolean
/>
<MinutePackageCard 
minutePackage = {dummyList[0]}
selectable={true} // show the select button
onSelect={ () => navigation.dispatch({type: "back"}) } // func to call if select button pressed
displayReloadNotice={false} // display the reload notice or not
reloadNoticeValue={false} // whether or not the checkbox is selected
onReloadNoticeSelect={(val) => {}} // func called when reload notice is selected, or unselected, `val` is a boolean
/>
<MinutePackageCard 
minutePackage = {dummyList[0]}
selectable={false} // show the select button
onSelect={ () => navigation.dispatch({type: "back"}) } // func to call if select button pressed
displayReloadNotice={true} // display the reload notice or not
reloadNoticeValue={false} // whether or not the checkbox is selected
onReloadNoticeSelect={(val) => {}} // func called when reload notice is selected, or unselected, `val` is a boolean

/> */