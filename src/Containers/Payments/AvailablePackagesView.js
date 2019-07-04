import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import Promocode from "./Components/PromoCode"
// Styles
import styles from "./Styles/AvailablePackagesStyles";

import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";
import MinutePackageCard from "./Components/MinutePackageCard";

import { loadMinutePackages, minutePackages } from "../../Ducks/AccountReducer";

class AvailablePackagesView extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      minutePackages: [],
      loading: true
    }
  }
  
  componentDidMount(){
    //this.setState({loading: true});
    this.props.loadMinutePackages(false)
    .then(minutePackages  => this.setState({loading: false, minutePackages})); 
  }

  packageRender(){

    const { navigation } = this.props;

    return this.state.minutePackages.map( minutePackage => 
      <MinutePackageCard
        key={minutePackage.id}  
        minutePackage = {minutePackage}
        selectable={true} // show the select button
        onSelect={ () => navigation.dispatch({type: "PackageCheckoutView", params: {minutePackage}}) } // func to call if select button pressed
        displayReloadNotice={false} // display the reload notice or not
        reloadNoticeValue={false} // whether or not the checkbox is selected
        onReloadNoticeSelect={(val) => {}} // func called when reload notice is selected, or unselected, `val` is a boolean
        promoCodeActive={true}
        discountedPrice={4000}
        special={I18n.t("minutePackage.special")}
        specialColors={["#F39100", "#FCB753"]}
      />);
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
          navbarTitle={I18n.t("packages.browse.title")}
        />
        <Promocode navigation={navigation} />
        {this.state.loading ? 
          <ActivityIndicator size="large" color="purple" style={{ zIndex: 100000, top: 150 }} />  
        :
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            {this.packageRender()}
          </ScrollView>
       }
        
      </View>
    );
  }
}

const mS = state => ({
  publicMinutePackages: state.account.publicMinutePackages,
  restrictedMinutePackages: state.account.restrictedMinutePackages
});

const mD = {
  loadMinutePackages,
  minutePackages
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