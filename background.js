const serviceStatus = {
  ON: "#02ac53",
  OFF: "#d80601",
};

// Global Variable
let isOn = true;
let port;

const init = async () => {
  const turnOn = () => {
    // port.postMessage({ action: "BACK_TO_CONTENT_turnOn" });

    chrome.action.setBadgeText({
      text: "ON",
    });
    chrome.action.setBadgeBackgroundColor({
      color: serviceStatus.ON,
    });
  };

  const turnOff = () => {
    // port.postMessage({ action: "BACK_TO_CONTENT_turnOff" });

    chrome.action.setBadgeText({
      text: "OFF",
    });
    chrome.action.setBadgeBackgroundColor({
      color: serviceStatus.OFF,
    });
  };

  const setPort = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      port = chrome.tabs.connect(tabs[0].id, { name: "BACK_TO_CONTENT_PORT" });
    });
  };

  const setExtensionIconClickListener = () => {
    chrome.action.onClicked.addListener((tabs) => {
      const toggleOnOff = () => {
        if (isOn) {
          // Turn Off
          turnOff();
          isOn = false;
        } else {
          // Turn On
          turnOn();
          isOn = true;
        }
      };

      toggleOnOff();
    });
  };

  // const setEventListenerFromContent = () => {};

  await setPort();
  setExtensionIconClickListener();
  // setEventListenerFromContent();
};

init();
