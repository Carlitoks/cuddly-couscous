import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import Promocode from "./Components/PromoCode"
// Styles
import styles from "./Styles/PaymentScreenStyles";

import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";
import MinutePackageCard from "./Components/MinutePackageCard";

class AvailablePackagesView extends Component {
  constructor(props) {
    super(props);
    console.log(styles.wrapperContainer)
  }

  render() {
    const { navigation } = this.props;

    const dummyList = [{
      id: 1, 
      name: 'Jeenie Value Package',
      price: 50,
      coin: '$',
      time: '75 Mins',
      description: 'At vero eos et accus et iusto odio dignissis praes At vero eos et accus et iusto odio dignissis praes '
      },
      { 
        id: 2,
        name: 'Conference unlimited Package',
        price: 50,
        coin: '$',
        time: 'Unlimited Usage',
        valid: 'July 1, 2019 - July 31, 2019' ,
        description: 'At vero eos et accus et iusto odio dignissis praes At vero eos et accus et iusto odio dignissis praes '
      }
    ];

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
        <ScrollView
        automaticallyAdjustContentInsets
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
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
          
        />
        
        
      </ScrollView>
        
      </View>
    );
  }
}

const mS = state => ({
});

const mD = {};

export default connect(
  mS,
  mD
)(AvailablePackagesView);

/*



<ScrollView
        automaticallyAdjustContentInsets
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
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
          
        />
        
        
      </ScrollView>

      */