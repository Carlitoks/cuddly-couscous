import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Header, SearchBar, Badge, Card } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import { moderateScale } from "../../Util/Scaling";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from "../../Themes";
import StarRating from "react-native-star-rating";
import SegmentedControlTab from "react-native-segmented-control-tab";

import Waves from "../../SVG/waves";

import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";

/**
 * @description Standarized View with Header Component
 *
 * Props:
    isScrollable: Boolean to set the view to ScrollView,
    headerLeftComponent: Content of the header's left side,
    headerRightComponent: Content of the header's right side,
    headerCenterComponent: Content of the header's center,
    title: Text of the header's title,
    titleComponent: Component of the header's title. Will replace title if provided
    subtitle: Text of the header's subtitle,
    search: Function to execute when search text changes,
    clearSearch: Function to execute when search text is empty,
    photoSelect: Function to send to PhotoUpload's prop "onPhotoSelect" if null avatar won't have photoUpload,
    avatarSource: Function to send to Image's prop "source",
    avatarHeight: Height of the avatar view size,
    avatarTitle: Text to display next to the avatar,
    bigAvatar: Boolean to display the avatar bigger,
    badge: Boolean to display the badge with customer/linguist rating,
    stars: Number that represents rating,
    status: Boolean of linguist status (Online/Offline),
    switchOnChange: Function to execute when status switch is touched,
    switchValue: Boolean of value of the switch,
    tabValues: Values of the Tabs,
    onTabPress: Function to execute when a Tab is pressed,
    tabSelectedIndex: Index of the selected Tab,
    connectMe: Boolean to display the Connect Me Now View for Customer Home,
    calls: Amount of calls answered by linguist,
    amount: Amount of money earned by linguist,
    navigation: In case ConnectMe is true send the navigation component
 *
*/

const HeaderView = ({
  isScrollable,
  headerLeftComponent,
  headerRightComponent,
  headerCenterComponent,
  title,
  titleComponent,
  subtitle,
  search,
  clearSearch,
  photoSelect,
  avatarSource,
  avatarHeight,
  avatarTitle,
  bigAvatar,
  badge,
  stars,
  status,
  switchOnChange,
  switchValue,
  tabValues,
  onTabPress,
  tabSelectedIndex,
  connectMe,
  calls,
  amount,
  navigation,
  children,
  loading
}) => {
  const { width, height } = Dimensions.get("window");
  function getHeader() {
    return (
      <View>
        {/* Header */}
        <View
          style={{ height: !!avatarSource || !!switchOnChange ? null : 145 }}
        >
          {/* Linear Gradient */}
          <LinearGradient
            colors={[
              Colors.gradientColor.top,
              //Colors.gradientColor.middle,
              Colors.gradientColor.bottom
            ]}
            style={styles.linearGradient}
          />

          {/* SVG White Waves */}
          <View
            style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
          >
            <Waves
              width={width}
              height={width * 80 / 750}
              viewBox={"0 0 750 80"}
            />
          </View>

          {/* Header - Navigation */}
          <TopViewIOS />
          <Header
            outerContainerStyles={styles.headerOuter}
            backgroundColor="transparent"
            leftComponent={headerLeftComponent}
            centerComponent={headerCenterComponent}
            rightComponent={headerRightComponent}
            innerContainerStyles={styles.headerInner}
          />

          {/* Title */}
          {!!titleComponent ? (
            titleComponent
          ) : !!title ? (
            <Text
              style={
                !!subtitle || !!search || !!tabValues
                  ? styles.mainTitle
                  : styles.onlyTitle
              }
            >
              {title}
            </Text>
          ) : null}

          {/* Subtitle */}
          {!!subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

          {/* Searchbar */}
          {!!search ? (
            <SearchBar
              containerStyle={styles.containerSearch}
              placeholder={I18n.t("search")}
              placeholderTextColor={"white"}
              inputStyle={styles.inputSearch}
              icon={{ name: "search", color: "#FFF" }}
              onChangeText={search}
              onClearText={!!clearSearch ? clearSearch : null}
            />
          ) : null}

          {/* Avatar */}
          {!!avatarSource && !!avatarHeight ? (
            <View
              style={[
                styles.containerAvatar,
                {
                  height: !!bigAvatar ? moderateScale(150) : avatarHeight
                },
                !!avatarTitle ? styles.avatarTitle : null
              ]}
            >
              {!!photoSelect ? (
                <PhotoUpload onPhotoSelect={photoSelect}>
                  <Image
                    style={[
                      styles.avatar,
                      !!bigAvatar ? styles.bigAvatar : null,
                      !!avatarTitle ? { flex: 1 } : null
                    ]}
                    resizeMode="cover"
                    source={avatarSource}
                  />
                </PhotoUpload>
              ) : (
                <Image
                  style={[
                    styles.avatar,
                    !!bigAvatar ? styles.bigAvatar : null,
                    !!avatarTitle ? { borderRadius: 75 } : null
                  ]}
                  resizeMode="cover"
                  source={avatarSource}
                />
              )}

              {!!avatarTitle ? (
                <View
                  style={
                    !!photoSelect
                      ? styles.avatarTitleContainer
                      : styles.avatarBoldTitleContainer
                  }
                >
                  <Text
                    style={
                      !!photoSelect ? styles.userName : styles.avatarTitleBold
                    }
                  >
                    {avatarTitle}
                  </Text>
                  {stars != null ? (
                    <StarRating
                      emptyStar={"ios-star-outline"}
                      fullStar={"ios-star"}
                      halfStar={"ios-star-half"}
                      iconSet={"Ionicons"}
                      disabled={true}
                      maxStars={5}
                      starSize={25}
                      rating={stars}
                      emptyStarColor={Colors.emptyStarColor}
                      fullStarColor={Colors.gradientColorButton.top}
                    />
                  ) : null}
                </View>
              ) : null}

              {!!badge && stars != null ? (
                <Badge
                  value={stars}
                  textStyle={styles.badgeText}
                  containerStyle={styles.badgeContainer}
                />
              ) : null}
            </View>
          ) : null}

          {/* Star Rating */}
          {stars != null && !!!avatarTitle ? (
            <View style={styles.starsContainer}>
              <View style={[styles.stars, styles.center]}>
                <StarRating
                  emptyStarratingColor="gray"
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  disabled={true}
                  maxStars={5}
                  starSize={18}
                  rating={stars}
                  fullStarColor={Colors.primaryColor}
                />
              </View>
            </View>
          ) : null}

          {/* Linguist online/offline switch */}
          {switchValue != null && !!switchOnChange && switchValue != null ? (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                {`${I18n.t("status")} ${status ? I18n.t("online").toUpperCase() : I18n.t("offline").toUpperCase()}`}
              </Text>
              {loading ? (
                <View style={styles.switchContainer}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              ) : (
                <Switch
                  onValueChange={switchOnChange}
                  style={styles.switchContainer}
                  value={switchValue}
                  onTintColor={Colors.onTintColor}
                  thumbTintColor={Colors.thumbTintColor}
                  tintColor={Colors.tintColor}
                />
              )}
            </View>
          ) : null}

          {/* tabs */}
          {!!tabValues && tabSelectedIndex != null && onTabPress ? (
            <SegmentedControlTab
              tabsContainerStyle={styles.tabsContainerStyle}
              values={tabValues}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              selectedIndex={tabSelectedIndex}
              onTabPress={onTabPress}
              activeTabStyle={{
                backgroundColor: Colors.primarySelectedTabColor
              }}
            />
          ) : null}
        </View>

        {/* Customer Home Connect Me Now Section */}
        {!!connectMe ? (
          <View style={{ height: 180 }}>
            <View style={styles.mainButtons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.button, styles.buttonQR, styles.center]}
                onPress={() => navigation.dispatch({ type: "ScanScreenView" })}
              >
                <View style={styles.buttonGrid}>
                  <Image
                    style={styles.scanQRImage}
                    source={Images.scan_qr_code}
                  />

                  <Text>{I18n.t("scanQRCode")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Linguist Home Calls/Amount Section */}
        {calls != null && !!amount != null ? (
          <View style={{ height: 100 }}>
            <Card
              style={{ alignContent: "space-betwen", height: 50 }}
              wrapperStyle={{ flex: 1, alignContent: "space-around" }}
              containerStyle={styles.card}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.TitleText, styles.center]}>
                    {I18n.t("calls")}
                  </Text>
                  <Text style={[styles.callNumber, styles.center]}>
                    {calls}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.TitleText, styles.center]}>
                    {`${I18n.t("minutes")[0].toUpperCase()}${I18n.t("minutes").slice(1)}`}
                  </Text>
                  <Text style={[styles.callNumber, styles.center]}>
                    {amount}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        ) : null}
      </View>
    );
  }

  function getConnectMeBtn() {
    return (
      <TouchableOpacity
        style={styles.connectMeNow}
        activeOpacity={0.8}
        onPress={() => navigation.dispatch({ type: "CallConfirmationView" })}
      >
        <LinearGradient
          colors={["#521bb7", "#1f69b4"]}
          style={[styles.linearGradient, styles.gradientConnectMeNow]}
        />
        <Text style={styles.textConnectMeNow}>
          {I18n.t("connectMeNow").toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }

  return !isScrollable ? (
    <View style={styles.container}>
      {/* Header */}
      {getHeader()}
      {/* View Content */}
      {children}
      {/* Connect Me Btn */}
      {!!connectMe ? getConnectMeBtn() : null}
    </View>
  ) : (
    <ScrollView
      automaticallyAdjustContentInsets={true}
      style={styles.container}
      alwaysBounceVertical={false}
    >
      {/* Header */}
      <View
        style={{
          height: !!switchOnChange
            ? 350
            : !!bigAvatar
              ? 250
              : !!avatarSource ? moderateScale(200) : moderateScale(180)
        }}
      >
        {getHeader()}
      </View>
      {/* View Content */}
      {children}
      {/* Connect Me Btn */}
      {!!connectMe ? getConnectMeBtn() : null}
    </ScrollView>
  );
};

export default HeaderView;
