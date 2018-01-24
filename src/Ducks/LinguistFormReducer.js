import { Sessions, Linguist } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { Images } from "../Themes/Images";
import EN from "../I18n/en";

// Constants
export const LANGUAGE_INTERPRETATION_LIST = [
  { name: "Frequently", code: "frequent" },
  { name: "Occasionally", code: "some" },
  { name: "None", code: "none" }
];

export const PROFICIENCY_LIST = [
  {
    name: "Basic",
    avatar_url: "expertise_A1",
    subtitle: EN["expertise_A1"],
    code: "basic"
  },
  {
    name: "Intermediate",
    avatar_url: "expertise_B1",
    subtitle: EN["expertise_B1"],
    code: "intermediate"
  },
  {
    name: "Fluent",
    avatar_url: "expertise_C1",
    subtitle: EN["expertise_C1"],
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
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Other" },
    { gender: "Decline to spicify" }
  ];
};
export const GetAreasOfExpertise = () => {
  return [
    { name: "Sport" },
    { name: "Travel" },
    { name: "Legal" },
    { name: "Retail" },
    { name: "Technology" },
    { name: "Tourism" }
  ];
};
const initialState = {
  // Linguist First Name and Last Name
  firstname: "",
  lastname: "",
  preferredName: "",
  formHasErrors: false,
  mainTitle: "Enter Your Name",
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
  linguistInfo: null,
  goTo: "SelectLanguageView",
  currentView: null
};

export const getItems = type => dispatch => {
  const types = {
    languages: Sessions.GetLanguages,
    citizenships: Sessions.GetCitizenships,
    nativeLanguage: Sessions.GetLanguages,
    areasOfExpertise: Sessions.GetAreasOfExpertise,
    countryFamiliarities: Sessions.GetCountryFamiliarities,
    cityFamiliarities: Sessions.GetCityFamiliarities
  };

  dispatch(updateSettings({ [type]: types[type]() }));
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