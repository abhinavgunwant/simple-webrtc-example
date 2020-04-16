const wcButton = document.querySelector('button#web-cam');
const ssButton = document.querySelector('button#screen-share');
const stButton = document.querySelector('button#stop');
const videoEl = document.querySelector('video');

const WEBCAM_CONSTRAINTS = { video: true, audio: true };
const SCREENSHARE_CONSTRAINTS = { video: true };

const deviceType = {
    CAMERA: 'CAMERA',
    SCREEN: 'SCREEN'
};

const openMediaDevice = async (device) => {
    switch (device) {
        case deviceType.SCREEN:
            return await navigator.mediaDevices.getDisplayMedia(SCREENSHARE_CONSTRAINTS);

        default:
        case deviceType.CAMERA:
            return await navigator.mediaDevices.getUserMedia(WEBCAM_CONSTRAINTS);
    }
}

async function start(device){
    const stream = await openMediaDevice(device);
    
    videoEl.srcObject = stream;
    console.log('stream:', stream);
}

function stop () {
    videoEl.srcObject = null;
}

wcButton.addEventListener('click', () => start(deviceType.CAMERA));
ssButton.addEventListener('click', () => start(deviceType.SCREEN));
stButton.addEventListener('click', () => stop());