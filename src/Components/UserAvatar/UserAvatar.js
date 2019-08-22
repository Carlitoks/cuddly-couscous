import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import PhotoUpload from "react-native-photo-upload";
import { moderateScale } from "../../Util/Scaling";
import { Colors } from "../../Themes";
import StarRating from "react-native-star-rating";
import styles from "./styles";
import I18n from "../../I18n/I18n";
import { Icon } from "react-native-elements";

const UserAvatar = ({
  avatarSource,
  avatarHeight,
  avatarTitle,
  switchOnChange,
  title,
  titleComponent,
  rate,
  bigAvatar,
  photoSelect,
  stars,
  addratings,
}) => {
  return  (
    <React.Fragment>
      {/* Header */}
      <View
        style={{
          height:
            !!avatarSource || !!switchOnChange
              ? null
              : !!title || !!titleComponent
              ? 125
              : 85
        }}
      >

        {/* Avatar */}
        {!!avatarSource && !!avatarHeight ? (
          <View
            style={[
              styles.containerAvatar,
              !!rate ? styles.containerAvatarRate : null,
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
                  !!avatarTitle ? { borderRadius: 75 } : null,
                  !!rate ? styles.avatarRate : null
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
                    : rate
                    ? styles.avatarRateTitleContainer
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
                {stars != null && stars != "" ? (
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
                    starColor={Colors.gradientColorButton.top}
                  />
                ) : <TouchableOpacity
                      onPress={ () => {addratings()} }
                      style={styles.addrating}
                    >
                      <Icon name="edit" type="font-awesome" color="white" size={20} />
                      <Text style={styles.addRatingText}>{I18n.t("history.addRating")}</Text>
                    </TouchableOpacity>
                }
              </View>
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
      </View>
    </React.Fragment>
  );
};

export default UserAvatar;
