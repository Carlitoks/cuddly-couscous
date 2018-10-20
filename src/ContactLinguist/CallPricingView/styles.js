import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";
import { Iphone5 } from "../../Util/Devices";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.white
  },
  COL_title: {
    marginTop: Iphone5 ? moderateScale(31) : 31,
    marginBottom: Iphone5 ? moderateScale(67) : 52,
    marginHorizontal: Iphone5 ? moderateScale(33) : 33,
    color: Colors.gradientColorButton.top,
    fontFamily: Fonts.primaryFont,
    fontWeight: "600",
    fontSize: Iphone5 ? moderateScale(28) : height * 0.03,
    textAlign: "center"
  },
  COL_futurePricingTitleContainer: {
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: Colors.pricingViewPurple,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    padding: moderateScale(20),
    top: moderateScale(20)
  },
  pricing_title: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(20) : 20,
    paddingLeft: moderateScale(15)
  },
  pricing_rate: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(20) : 20
  },
  COL_futurePricingBox: {
    marginHorizontal: 16,
    backgroundColor: Colors.lightBlue2,
    borderRadius: 4,
    minHeight: Iphone5 ? moderateScale(276) : height * 0.4
  },
  COL_futurePricingBoxTitle: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(41) : height * 0.045,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(24) : 24,
    fontWeight: "600"
  },
  COL_futurePricingBoxTitleUnder: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(3) : 3,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(24) : 24,
    fontWeight: "600"
  },
  COL_futurePricingBoxAnd: {
    marginTop: Iphone5 ? moderateScale(16) : 16,
    color: Colors.gradientColor.top,
    fontFamily: Fonts.primaryFont,
    fontStyle: "italic",
    fontSize: Iphone5 ? moderateScale(12) : 12,
    textAlign: "center"
  },
  COL_futurePricingBoxBody: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(18) : 18,
    fontWeight: "600"
  },
  COL_futurePricingBoxEnd: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(15) : 15,
    fontStyle: "italic"
  },
  CPV_bottomButtonView: {
    paddingTop: 10
  },
  buttons: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "100%"
  },
  CPV_scrollContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  dollar_icon: { alignSelf: "flex-start" },
  pricing_title_box: {
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.12,
    backgroundColor: Colors.pricingViewPurple,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    padding: moderateScale(20),
    top: moderateScale(20),
    marginBottom: moderateScale(20)
  },
  pricing_inner_box: {
    flexDirection: "row",
    alignItems: "center"
  },
  pricing_icon_box: {
    width: moderateScale(40),
    height: moderateScale(70)
  },
  account_balance_box: {
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordersLightGrey,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    padding: moderateScale(20),
    top: moderateScale(20)
  },
  account_balance_inner_box: { flexDirection: "row", alignItems: "center" },
  account_balance_minutes: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(35) : 35
  },
  account_balance_minutes_label: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(15) : 15
  },
  account_balance_title: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(16) : 16,
    paddingLeft: moderateScale(15)
  },
  available_credit_card_box: {
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordersLightGrey,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    padding: moderateScale(20),
    top: moderateScale(20)
  },
  available_credit_card_inner_box: {
    flexDirection: "row",
    alignItems: "center"
  },
  available_credit_card_title: {
    color: Colors.pricingViewBlack,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(16) : 16,
    paddingLeft: moderateScale(15)
  },
  available_credit_card_change: {
    color: Colors.pricingViewPurple,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(15) : 15,
    padding: 7
  },
  available_credit_card_numbers: {
    color: Colors.pricingViewBlack,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(13) : 13,
    padding: 5
  },
  available_credit_card_icon_row: {
    flexDirection: "row",
    alignItems: "center"
  },
  available_credit_card_icon_column: {
    flexDirection: "column",
    alignItems: "center"
  },
  content_align_center: {
    alignItems: "center",
    justifyContent: "center"
  },
  pricing_screen_description_box: {
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: Colors.transparent,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: moderateScale(15),
    margin: moderateScale(15),
    bottom: 0
  },
  pricing_screen_description: {
    color: Colors.pricingViewBlack,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(15) : 15,
    padding: 7,
    textAlign: "center"
  },
  add_credit_card_box: {
    alignSelf: "center",
    width: width * 0.9,
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordersLightGrey,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    padding: moderateScale(20),
    top: moderateScale(20)
  },
  add_credit_card_inner_box: {
    flexDirection: "row",
    alignItems: "center"
  },
  add_credit_card_title: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(16) : 16,
    paddingLeft: moderateScale(15)
  },
  add_credit_card_description: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "bold",
    fontSize: Iphone5 ? moderateScale(13) : 13,
    padding: moderateScale(15),
    width: width * 0.5
  },
  add_credit_card_icon_align: {
    alignSelf: "flex-start",
    marginLeft: -7
  },
  add_credit_card_content_column_box: { flexDirection: "column" },
  add_credit_card_link: {
    flexDirection: "column",
    alignSelf: "flex-start"
  }
});
