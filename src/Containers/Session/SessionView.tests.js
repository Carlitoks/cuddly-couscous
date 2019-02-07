// customer starts call
// linguist accepts
// linguist connects
// customer connects afterwards (delayed connection)
export const testLinguistConnects = (comp) => {
    comp.handleUserConnecting();
    setTimeout(() => {comp.handleUserConnected()}, 10000);

    // trigger remote user connecting
    setTimeout(() => {
      comp.props.setRemoteUser({
        id: "22222222-2222-2222-2222-222222222223",
        firstName: "Evan",
        lastInitial: "V"
      });
      comp.handleRemoteUserConnecting();
    }, 3000);

    // trigger connected
    setTimeout(() => {
      comp.handleRemoteUserConnected();
    }, 7000);

};

// both users connect
// then user disconnects
export const testUserDisconnects = (comp) => {
  comp.props.setRemoteUser({
    id: "22222222-2222-2222-2222-222222222223",
    firstName: "Evan",
    lastInitial: "V"
  });
  comp.handleUserConnecting();
  comp.handleUserConnected();

  setTimeout(() => {
    comp.handleRemoteUserConnecting();
  }, 1000);
  setTimeout(() => {
    comp.handleRemoteUserConnected();
  }, 3000);

  setTimeout(() => {
    // comp.handleUserDisconnected();
    comp.handleRemoteUserDisconnected();
  }, 6000);
};

// user loses connection
export const testUserLostNetwork = (comp) => {

};

export const testRemoteUserDisconnects = (comp) => {

};

