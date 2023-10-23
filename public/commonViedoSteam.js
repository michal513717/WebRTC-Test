


export class CommonVideoStream {

  static createVideoElement() {

    const videoElement = document.createElement('video');

    videoElement.muted = true;

    return videoElement;
  }

  static getPermissions() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then(stream => {

      const video = this.createVideoElement();

      this.addVideoStream(video, stream);

      socket.on('user-connected', userId => {
        connectedNewUser(userId, stream);
      })
    }).catch(err => {
      console.log('Error during getting user media devices', err);
    })
  };

  static addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });

    this.videoContainer.append(video);
  };
};