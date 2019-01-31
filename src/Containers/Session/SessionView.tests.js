export const testLinguistConnects = (comp) => {
    comp.handleUserConnecting();
    setTimeout(() => {comp.handleUserConnected()}, 1000);

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

export const testUserDisconnects = (comp) => {

};

export const testRemoteUserDisconnects = (comp) => {

};