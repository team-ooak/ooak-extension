let isRunning = true;

chrome.action.onClicked.addListener(() => {
  if(isRunning){
    chrome.action.disable();
  } else {
    chrome.action.enable();
  }
});



// chrome.scripting.executeScript({
//   target: {tabId: tab.id},
//   files: ['content.js']
// });