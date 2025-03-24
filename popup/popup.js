console.log("popup.js");
document.addEventListener("DOMContentLoaded", () => {
    const playButton =  document.getElementById("play-button");

    playButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log(tabs);
            chrome.tabs.sendMessage(tabs[0].id, { action: "startGame" });
        }); 
    });
});
