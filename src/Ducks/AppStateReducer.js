// The purpose of this is to manage app UI & config state that is either 
// determined or modifiable by the user.

const initState = () => {
  return {
    uiLanguage: '',
    isCustomerMode: true,
    isLinguistMode: false,
  }
};