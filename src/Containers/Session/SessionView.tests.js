const after = (ms, cb) => {
  setTimeout(cb, ms);
}

// customer starts call
// linguist accepts
// linguist connects
// customer connects afterwards (delayed connection)
export const testRemoteUserConnects = (comp) => {
    comp.handleUserConnecting();
    comp.handleRemoteUserConnecting();

    after(500, () => {
      comp.handleUserConnected();
      comp.handleRemoteUserConnected();
      comp.handleUserSendingAV({audio: true, video: true});
      comp.handleRemoteUserSendingAV({audio: true, video: true});
    });

    after(1000, () => {
      comp.handleUserReceivingAV({audio: true, video: true});
      comp.handleRemoteUserReceivingAV({audio: true, video: true});
    });
};

// both users connect
// then user disconnects
export const testRemoteUserDisconnects = (comp) => {
  testRemoteUserConnects(comp);
  after(4000, () => { comp.handleRemoteUserDisconnected(); });
  after(6000, () => { comp.handleRemoteUserConnecting(); });
  after(8000, () => { comp.handleRemoteUserConnected(); });
  after(10000, () => { comp.handleRemoteUserDisconnected(); });
};

export const testLocalUserDisconnects = (comp) => {
  testRemoteUserConnects(comp);
  after(4000, () => { comp.handleUserDisconnected(); });
  after(6000, () => { comp.handleUserConnecting(); });
  after(8000, () => { comp.handleUserConnected(); });
  after(10000, () => { comp.handleUserDisconnected(); });
};

// user loses connection
export const testUserLostNetwork = (comp) => {
  testRemoteUserConnects(comp);
  after(4000, () => { comp.handleNetworkConnectionTypeChanged("wifi", "none"); });
  after(4500, () => { comp.handleUserDisconnected(); });
  after(6000, () => { comp.handleNetworkConnectionTypeChanged("none", "wifi"); });
  after(6500, () => { comp.handleUserConnecting(); });
  after(8000, () => { comp.handleUserConnected(); });
  after(10000, () => { comp.handleNetworkConnectionTypeChanged("wifi", "none"); });
  // after(10500, () => { comp.handleUserDisconnected(); });
};

