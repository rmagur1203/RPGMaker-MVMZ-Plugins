chrome.devtools.panels.create("RPGMaker Cheat", "icon.png", "panel.html", panel => {
  console.log(chrome.devtools.inspectedWindow);
});