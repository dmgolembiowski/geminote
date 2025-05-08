document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'A' && target.href.startsWith('file:///')) {
    event.preventDefault(); // Prevent the default download behavior
    if (target.href.endsWith('/')) { return; }
    const filePath = target.href;
    chrome.runtime.sendMessage({ action: "readFile", path: filePath });
  }
});
