import { Sessions, Linguist, Scenarios } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { Images } from "../Themes/Images";
import I18n from "../I18n/I18n";

import store from "../Config/CreateStore";
import { getAssistanceList } from "./ContactLinguistReducer";

// Constants
export const LANGUAGE_INTERPRETATION_LIST = [
  { name: I18n.t("frequently"), code: "frequent" },
  { name: I18n.t("occasionally"), code: "some" },
  { name: I18n.t("none"), code: "none" }
];

export const PROFICIENCY_LIST = [
  {
    name: I18n.t("basic"),
    avatar_url: "expertise_A1",
    subtitle: I18n.t("expertise_A1"),
    code: "basic"
  },
  {
    name: I18n.t("intermediate"),
    avatar_url: "expertise_B1",
    subtitle: I18n.t("expertise_B1"),
    code: "intermediate"
  },
  {
    name: I18n.t("fluent"),
    avatar_url: "expertise_C1",
    subtitle: I18n.t("expertise_C1"),
    code: "fluent"
  }
];

const ACTIONS = {
  CLEAR: "linguistForm/clear",
  UPDATE: "linguistForm/update"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});
export const linguistUpdate = (id, token, payload) => dispatch => {
  return Linguist.update(id, token, payload)
    .then(response => {
      dispatch(updateSettings({ linguistInfo: response.data }));
    })
    .catch(err => dispatch(networkError(err)));
};
export const updateLanguages = (id, langCode, token, payload) => dispatch => {
  return Linguist.langUpdate(id, langCode, token, payload)
    .then(response => {
      dispatch(updateSettings({ linguistInfo: response.data }));
    })
    .catch(err => dispatch(networkError(err)));
};
export const deleteLanguages = (id, langCode, token, payload) => dispatch => {
  return Linguist.langRemove(id, langCode, token)
    .then(response => {
      dispatch(updateSettings({ linguistInfo: response.data }));
    })
    .catch(err => dispatch(networkError(err)));
};
export const createLinguist = (id, token, payload) => dispatch => {
  return Linguist.create(id, token, payload)
    .then(response => {
      dispatch(updateSettings({ linguistInfo: response.data }));
    })
    .catch(err => dispatch(networkError(err)));
};

export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const GetOptions = () => dispatch => {
  return [
    { gender: I18n.t("male") },
    { gender: I18n.t("female") },
    { gender: I18n.t("other") },
    { gender: I18n.t("specifyGender") }
  ];
};
export const GetAreasOfExpertise = () => {
  return [
    { name: I18n.t("sport") },
    { name: I18n.t("travel") },
    { name: I18n.t("legal") },
    { name: I18n.t("retail") },
    { name: I18n.t("technology") },
    { name: I18n.t("tourism") }
  ];
};
const initialState = {
  // Linguist First Name and Last Name
  firstname: "",
  lastname: "",
  preferredName: "",
  formHasErrors: false,
  mainTitle: I18n.t("mainTitle"),
  // Linguist Email
  email: "",
  // Gender
  selectedGender: "",
  // Phone number
  phoneNumber: "",
  // Verify Phone
  VerifyPhoneNumber: "",
  // Password
  password: "",
  scenarios: [],
  // Language selection
  languages: [],
  citizenships: [],
  countryFamiliarities: [],
  cityFamiliarities: [],
  areasOfExpertise: [],
  searchQuery: "",
  selectionItemType: "",
  selectedLanguage: null,
  selectedNativeLanguage: [],
  selectedAreasOfExpertise: [],
  selectedSecondaryLanguages: [],
  selectedCitizenship: [],
  selectedCountryFamiliarity: [],
  selectedCityFamiliarity: [],
  selectedProficiency: null,
  selectedLanguageInterpretation: null,
  selectedScenarios: [],
  linguistInfo: null,
  goTo: "SelectLanguageView",
  currentView: null
};

export const getItems = (type, params) => (dispatch, getState) => {
  const types = {
    languages: Sessions.GetLanguages,
    citizenships: Sessions.GetCitizenships,
    nativeLanguage: Sessions.GetLanguages,
    areasOfExpertise: Sessions.GetAreasOfExpertise,
    countryFamiliarities: Sessions.GetCountryFamiliarities,
    cityFamiliarities: Sessions.GetCityFamiliarities
  };

  switch (type) {
    case "scenarios":
      Scenarios.get(getState().auth.token)
        .then(response => {
          let resp = [];
          if (params) {
            resp = response.data.filter(value => {
              return value.category === params.category || value.category === "general";
            });
          } else {
            resp = response.data;
          }

          dispatch(updateSettings({ [type]: resp }));
        })
        .catch(error => {
          console.log(error);
          return dispatch(networkError(error));
        });
      break;
    default:
      dispatch(updateSettings({ [type]: types[type]() }));
      break;
  }
};

const linguistFormReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    default: {
      return state;
    }
  }
};

export default linguistFormReducer;