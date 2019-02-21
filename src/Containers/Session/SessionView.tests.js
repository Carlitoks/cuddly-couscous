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
  // user connects
  comp.handleUserConnecting();
  setTimeout(() => { comp.handleUserConnected(); }, 500);

  // linguist assigned
  setTimeout(() => {
    comp.props.setRemoteUser({
      id: "22222222-2222-2222-2222-222222222223",
      firstName: "Evan",
      lastInitial: "V"
    });
  }, 1000);

  // linguist connects
  setTimeout(() => {
    comp.handleRemoteUserConnecting();
  }, 1500);
  setTimeout(() => {
    comp.handleRemoteUserConnected();
  }, 2000);

  // remote user disconnects
  setTimeout(() => { comp.handleRemoteUserDisconnected(); }, 4000);
  // setTimeout(() => { comp.handleRemoteUserConnecting(); }, 6000);
  // setTimeout(() => { comp.handleRemoteUserConnected(); }, 8000);

};

// user loses connection
export const testUserLostNetwork = (comp) => {

};

export const testRemoteUserDisconnects = (comp) => {

};
