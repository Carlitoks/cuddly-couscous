// EXAMPLE DUCK

// Actions
export const ACTIONS = {
  GET_DATA: "data/get_data"
};

// Fake Data
const DATA = {
  instructions: [
    {
      title: "Create React Native Project",
      description: "react-native init ReactReduxBoilerPlate"
    },
    {
      title: "Install Dependencies",
      description:
        "In your project root, run npm install --save react-redux \nnpm install —save redux \nnpm install —save redux-thunk"
    },
    {
      title: "Create Folder Structure",
      description:
        "In your project root create an 'app' folder. In the app folder create an 'actions' folder , a 'reducers' folder and a 'components' folder."
    },
    {
      title: "Create your first action",
      description:
        "The action is a basic function called from the component whenever we want the whole state of the app to be changed. Our action creator is a simple function returning an object (the action itself)with a type attribute expressing what happened with the app.\nIn your actions folder create a js file 'index.js'"
    },
    {
      title: "Create your first reducer",
      description:
        "Reducers are the ones in charge of updating the state of the app. Redux will automatically pass the current state of the app and the action occurred. It’s up to the reducer to realize if it needs to modify the state or not based on the action.type.\nIn your reducers folder create a js file 'index.js'"
    },
    {
      title: "Create your component",
      description: "In your components folder create a js file 'home.js'"
    },
    {
      title: "Create Store",
      description: "In the app folder, create a js file 'store.js'"
    },
    {
      title: "Link it all together",
      description:
        "Redux needs to inject a store holding the app state into the app. To do so, it requires a ‘Provider’ wrapping the whole app.In the app folder, create a js file 'setup.js'"
    },
    {
      title: "Update your main files",
      description: "Update index.ios.js and index.android.js"
    }
  ]
};

// Action Creator
export const getData = payload => ({
  type: ACTIONS.GET_DATA,
  payload
});

// Using Thunks to dispatch Actions
export function getDataAsync() {
  return dispatch => {
    setTimeout(() => {
      var data = DATA.instructions;
      dispatch(getData(data));
    }, 2000);
  };
}

// Initial State
let initialState = {
  data: [],
  loading: true
};

// Reducer
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_DATA:
      state = Object.assign({}, state, {
        data: action.payload,
        loading: false
      });
      return state;

    default:
      return state;
  }
};

export default dataReducer;
