const serviceStatus = {
  ON: "#02ac53",
  OFF: "#d80601",
};

const turnOn = () => {
  chrome.action.setBadgeText({
    text: "ON",
  });
  chrome.action.setBadgeBackgroundColor({
    color: serviceStatus.ON,
  });
};

const turnOff = () => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
  chrome.action.setBadgeBackgroundColor({
    color: serviceStatus.OFF,
  });
};

// Global Variable
let isOn = true;

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

  // chrome.tabs.sendMessage(tabs[0].id, "your message");
});

turnOn();
