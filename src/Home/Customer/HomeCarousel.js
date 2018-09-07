import React, { Component } from "react";
import Carousel from "react-native-snap-carousel";
import { View } from "react-native";
import { getLocalizedCategories, SUPPORTED_LANGS } from "../../Util/Constants";
import I18n from "../../I18n/I18n";
import CarouselEntry from "../../Components/CarouselEntry/CarouselEntry";
import {
  sliderWidth,
  itemWidth,
  itemMargin
} from "../../Components/CarouselEntry/styles";

import styles from "./styles";

class HomeCarousel extends Component {
  CATEGORIES = getLocalizedCategories(I18n.currentLocale());
  onCarouselItemPress = (index, item) => {
    const { navigation, updateHomeFlow } = this.props;
    const { currentIndex } = this._slider1Ref;

    updateHomeFlow({ selectedScenarioIndex: -1 });

    // if (index > currentIndex) { this._slider1Ref.snapToNext(); }
    if (index <= currentIndex) {
      updateHomeFlow({
        lastSelectedTile: currentIndex,
        categoryIndex: currentIndex,
        categorySelected: item
      });

      navigation.dispatch({
        type: item === "qr" ? "ScanScreenView" : "ScenarioSelectionView"
      });
    }
  };

  render() {
    const { categories, lastSelectedTile } = this.props;
    const itemsOrdered = [];
    const theOrder = ["airport", "transit", "hotel", "dining", "retail", "conversations", "qr"];
    for (let i = 0; i < theOrder.length; i++) {
      if (categories.indexOf(theOrder[i]) > -1) {
        itemsOrdered.push(theOrder[i]);
      }
    }

    const carousel = itemsOrdered && (
      <View style={styles.carouselContainer}>
        <Carousel
          slideStyle={styles.carousel}
          ref={c => (this._slider1Ref = c)}
          data={itemsOrdered}
          renderItem={({ item, index }) => {
            if (item !== "general") {
              return (
                <CarouselEntry
                  onPress={() => this.onCarouselItemPress(index, item)}
                  data={item}
                  mapper={title => {
                    return this.CATEGORIES[title];
                  }}
                />
              );
            }
          }}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth + itemMargin * 2}
          firstItem={lastSelectedTile}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loopClonesPerSide={7}
          activeSlideAlignment="start"
          enableMomentum={true}
          enableSnap={false}
        />
      </View>
    );

    return carousel;
  }
}

export default HomeCarousel;
