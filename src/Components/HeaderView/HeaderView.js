import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Switch
} from "react-native";
import { Header, SearchBar, Badge, Card } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import { moderateScale } from "../../Util/Scaling";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from "../../Themes";
import StarRating from "react-native-star-rating";
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
    subtitle: Text of the header's subtitle,
    search: Function to execute when search text changes,
    photoSelect: Function to send to PhotoUpload's prop "onPhotoSelect",
    avatarSource: Function to send to Image's prop "source",
    avatarHeight: Height of the avatar view size,
    avatarTitle: Text to display next to the avatar,
    bigAvatar: Boolean to display the avatar bigger,
    stars: Number that represents rating,
    status: Boolean of linguist status (Online/Offline),
    switchOnChange: Function to execute when status switch is touched,
    switchValue: Boolean of value of the switch,
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
  subtitle,
  search,
  photoSelect,
  avatarSource,
  avatarHeight,
  avatarTitle,
  bigAvatar,
  stars,
  status,
  switchOnChange,
  switchValue,
  connectMe,
  calls,
  amount,
  navigation,
  children
}) => {
  function getHeader() {
    return (
      <View>
        {/* Header */}
        <View>
          {/* Linear Gradient */}
          <LinearGradient
            colors={[
              Colors.gradientColor.top,
              Colors.gradientColor.middle,
              Colors.gradientColor.bottom
            ]}
            style={styles.linearGradient}
          />
          {/* Header - Navigation */}
          <TopViewIOS />
          <Header
            outerContainerStyles={{ borderBottomWidth: 0, height: 50 }}
            backgroundColor="transparent"
            leftComponent={headerLeftComponent}
            centerComponent={headerCenterComponent}
            rightComponent={headerRightComponent}
          />

          {/* Title */}
          {!!title ? (
            <Text
              style={
                !!subtitle || !!search ? styles.mainTitle : styles.onlyTitle
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
            />
          ) : null}

          {/* Avatar */}
          {!!photoSelect && !!avatarSource && !!avatarHeight ? (
            <View
              style={[
                styles.containerAvatar,
                { height: !!bigAvatar ? 150 : moderateScale(avatarHeight) },
                !!avatarTitle ? styles.avatarTitle : null
              ]}
            >
              <PhotoUpload onPhotoSelect={photoSelect}>
                <Image
                  style={[
                    styles.avatar,
                    !!bigAvatar ? styles.bigAvatar : null,
                    !!avatarTitle ? { flex: 1 } : null
                  ]}
                  resizeMode="cover"
                  source={avatarSource()}
                />
              </PhotoUpload>
              {!!avatarTitle ? (
                <View style={styles.avatarTitleContainer}>
                  <Text style={styles.userName}>
                    {I18n.t("hi")}, {avatarTitle}!
                  </Text>
                </View>
              ) : null}
              {stars != null ? (
                <Badge
                  value={stars}
                  textStyle={styles.badgeText}
                  containerStyle={styles.badgeContainer}
                />
              ) : null}
            </View>
          ) : null}

          {/* Star Rating */}
          {stars != null ? (
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
                  starColor={Colors.primaryColor}
                />
              </View>
            </View>
          ) : null}

          {/* Linguist online/offline switch */}
          {switchValue != null && !!switchOnChange && switchValue != null ? (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                {I18n.t("status")}{" "}
                {status ? I18n.t("online") : I18n.t("offline")}
              </Text>
              <Switch
                onValueChange={switchOnChange}
                style={styles.switch}
                value={switchValue}
                onTintColor={Colors.onTintColor}
                thumbTintColor={Colors.thumbTintColor}
                tintColor={Colors.tintColor}
              />
            </View>
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
            <TouchableOpacity
              style={styles.connectMeNow}
              activeOpacity={0.8}
              onPress={() =>
                navigation.dispatch({ type: "CallConfirmationView" })
              }
            >
              <LinearGradient
                colors={["#521bb7", "#1f69b4"]}
                style={[styles.linearGradient, styles.gradientConnectMeNow]}
              />
              <Text style={styles.textConnectMeNow}>
                {I18n.t("connectMeNow").toUpperCase()}
              </Text>
            </TouchableOpacity>
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
                    {I18n.t("amount")}
                  </Text>
                  <Text style={[styles.callNumber, styles.center]}>
                    ${amount}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        ) : null}
      </View>
    );
  }

  return !isScrollable ? (
    <View style={styles.container}>
      {/* Header */}
      {getHeader()}
      {/* View Content */}
      {children}
    </View>
  ) : (
    <ScrollView
      automaticallyAdjustContentInsets={true}
      style={styles.container}
    >
      {/* Header */}
      {getHeader()}
      {/* View Content */}
      {children}
    </ScrollView>
  );
};

export default HeaderView;