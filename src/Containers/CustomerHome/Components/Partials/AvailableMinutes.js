import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import I18n, {
  translateProperty,
  translateLanguage
} from "../../../../I18n/I18n";
import { updateSettings as updateHomeFlow } from "../../../../Ducks/HomeFlowReducer";
import PaymentModal from "../../../../Home/Customer/PaymentModal/PaymentModal";

// Styles
import styles from "./Styles/AvailableMinutesStyles";

class AvailableMinutes extends Component {
  constructor(props) {
    super(props);
  }

  setCircleColor() {
    if (this.props.availableMinutes >= 10) {
      return styles.availableMinutesContainer;
    }

    if (this.props.availableMinutes > 5 && this.props.availableMinutes < 10) {
      return { ...styles.availableMinutesContainer, backgroundColor: "orange" };
    }

    if (this.props.availableMinutes > 0 && this.props.availableMinutes <= 5) {
      return { ...styles.availableMinutesContainer, backgroundColor: "red" };
    }

    if (this.props.stripePaymentToken) {
      return {
        ...styles.availableMinutesContainer,
        backgroundColor: "#ffffff"
      };
    } else {
      return { ...styles.availableMinutesContainer, backgroundColor: "red" };
    }
  }

  setTextStyle(type) {
    if (type === "top") {
      if (this.props.availableMinutes == 0) {
        if (this.props.stripePaymentToken) {
          return styles.pricingTopText;
        } else {
          return {};
        }
      } else {
        return styles.availableMinutesNumber;
      }
    }

    if (this.props.availableMinutes == 0) {
      if (this.props.stripePaymentToken) {
        return styles.pricingBottomText;
      } else {
        return styles.addPaymentText;
      }
    } else {
      return styles.availableMinutesText;
    }
  }

  setContent = type => {
    if (type === "top") {
      if (this.props.availableMinutes == 0) {
        if (this.props.stripePaymentToken) {
          return I18n.t("pricing");
        } else {
          return "";
        }
      } else {
        return this.props.availableMinutes;
      }
    }

    if (this.props.availableMinutes == 0) {
      if (this.props.stripePaymentToken) {
        return I18n.t("costPerMinute");
      } else {
        return I18n.t("customerHome.account.add");
      }
    } else {
      return I18n.t("customerHome.account.unit");
    }
  };
  render() {
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() =>
            this.props.updateHomeFlow({ displayPaymentModal: true })
          }
          style={this.setCircleColor()}
        >
          <Text style={this.setTextStyle("top")}>{this.setContent("top")}</Text>
          <Text style={this.setTextStyle("bottom")}>
            {this.setContent("bottom")}
          </Text>
        </TouchableOpacity>
        <PaymentModal
          visible={this.props.displayPaymentModal}
          closeModal={() => {
            this.props.updateHomeFlow({ displayPaymentModal: false });
          }}
          navigation={this.props.navigation}
        />
      </React.Fragment>
    );
  }
}

const mS = state => ({
  availableMinutes: state.userProfile.availableMinutes,
  displayPaymentModal: state.homeFlow.displayPaymentModal,
  stripePaymentToken: state.userProfile.stripePaymentToken
});

const mD = {
  updateHomeFlow
};

export default connect(
  mS,
  mD
)(AvailableMinutes);
