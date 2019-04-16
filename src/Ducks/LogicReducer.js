const ACTIONS = {
  CLEAR: "logic/clear",
  UPDATE: "logic/update",
  OPEN_SLIDE_MENU: "logic/openSlideMenu",
  CLOSE_SLIDE_MENU: "logic/closeSlideMenu",
};

export const clear = payload => ({
  type: ACTIONS.CLEAR,
  payload
});

export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const openSlideMenu = payload => {
  return {
    type: ACTIONS.OPEN_SLIDE_MENU,
    payload
  };
};

export const closeSlideMenu = payload => ({
  type: ACTIONS.CLOSE_SLIDE_MENU,
  payload
});

const initialState = {
  isSlideUpMenuVisible: false,
  loading: false,
  selection: null,
};


const LogicReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR:
      return {
        ...initialState
      };
    case ACTIONS.UPDATE:
      return {
        ...state,
        ...payload
      };
    case ACTIONS.OPEN_SLIDE_MENU: {
      return {
        ...state,
        isSlideUpMenuVisible: true,
        loading: true,
        selection: payload.type
      };
    }
    case ACTIONS.CLOSE_SLIDE_MENU: {
      return {
        ...state,
        isSlideUpMenuVisible: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default LogicReducer;
