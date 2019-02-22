const after = (ms, cb) => {
  setTimeout(cb, ms);
}

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

const setupReconnectionStateTest = (comp) => {
  // user connects
  comp.handleUserConnecting();
  after(500, () => { comp.handleUserConnected(); });

  // linguist assigned
  after(1000, () => {
    comp.props.setRemoteUser({
      id: "22222222-2222-2222-2222-222222222223",
      firstName: "Evan",
      lastInitial: "V"
    });
  });

  // linguist connects
  after(1500, () => { comp.handleRemoteUserConnecting(); });
  after(2000, () => { comp.handleRemoteUserConnected(); });
};

// both users connect
// then user disconnects
export const testRemoteUserDisconnects = (comp) => {
  setupReconnectionStateTest(comp);
  after(4000, () => { comp.handleRemoteUserDisconnected(); });
  after(6000, () => { comp.handleRemoteUserConnecting(); });
  after(8000, () => { comp.handleRemoteUserConnected(); });
  after(10000, () => { comp.handleRemoteUserDisconnected(); });
};

export const testLocalUserDisconnects = (comp) => {
  setupReconnectionStateTest(comp);
  after(4000, () => { comp.handleUserDisconnected(); });
  after(6000, () => { comp.handleUserConnecting(); });
  after(8000, () => { comp.handleUserConnected(); });
  after(10000, () => { comp.handleUserDisconnected(); });
};

// user loses connection
export const testUserLostNetwork = (comp) => {
  setupReconnectionStateTest(comp);
  after(4000, () => { comp.handleNetworkConnectionTypeChanged("wifi", "none"); });
  after(4500, () => { comp.handleUserDisconnected(); });
  after(6000, () => { comp.handleNetworkConnectionTypeChanged("none", "wifi"); });
  after(6500, () => { comp.handleUserConnecting(); });
  after(8000, () => { comp.handleUserConnected(); });
  after(10000, () => { comp.handleNetworkConnectionTypeChanged("wifi", "none"); });
  // after(10500, () => { comp.handleUserDisconnected(); });
};

