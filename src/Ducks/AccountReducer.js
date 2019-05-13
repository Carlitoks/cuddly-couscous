// The purpose of this is to manage all state about the user who
// is logged in and using the app

const initState = () => {
  return {
    isActiveLinguist: false,
    isPropspectiveLinguist: false,
    isTravelling: false,
    currentDeviceID: null,
    currentDevice: {},
    userID: null,
    user: {},
    linguistProfile: {},
    customerCallHistoryLoadedAt: null,
    customerCallHistory: [],
    linguistCallHistoryLoadedAt: null,
    linguistCallHistory: [],
    availableMinutePackagesLoadedAt: null,
    availableMinutePackages: []
  }
};
