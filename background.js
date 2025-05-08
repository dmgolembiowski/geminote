chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "readFile") {
    fetch(request.path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        chrome.tabs.create({ url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(text) });
      })
      .catch(error => {
        console.error("Error reading file:", error);
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon48.png',
          title: 'File Reading Error',
          message: `Somehow Geminote could not read the local file: ${request.path}.`
        });
      });
  }
});
