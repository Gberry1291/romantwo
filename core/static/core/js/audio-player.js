const audio = document.querySelector("#romans-audio");
const playButton = document.querySelector(".audio-play-button");
const audioIcon = document.querySelector(".audio-icon");
const audioLabel = document.querySelector(".audio-label");

if (audio && playButton && audioIcon && audioLabel) {
    playButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            audioIcon.textContent = "Ⅱ";
            audioLabel.textContent = "Pausieren";
        } else {
            audio.pause();
            audioIcon.textContent = "▶";
            audioLabel.textContent = "Abspielen";
        }
    });

    audio.addEventListener("ended", () => {
        audioIcon.textContent = "▶";
        audioLabel.textContent = "Abspielen";
    });
}