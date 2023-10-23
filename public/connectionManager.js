import { CommonVideoStream } from "./commonViedoSteam";

class ConnectionManager {

  constructor() {
    this.#init();
  };

  #init() {

    this.initPeer();
    this.setupEventsListeners();
  };

  initPeer() {
    this.myPeer = new Peer(undefined, {
      host: '/',
      port: '3001'
    });
  };

  setupEventsListeners() {

    myPeer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id);
    });

    socket.on('user-connected', userId => {
      console.log('User connected: ' + userId);
    });
  };

  connectedNewUser(userId, stream) {

    const call = myPeer.call(userId, stream);

    const videoUser = document.createElement('video');

    call.on('stream', userVideoStream => {
      CommonVideoStream.addVideoStream(videoUser, userVideoStream);
    });

    call.on('close', () => {
      videoUser.remove();
    })
  }
};

export const connectionManager = new ConnectionManager();