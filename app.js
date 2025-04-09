console.log("ATharva")

// Initial variables
let i = 0;
let isPlaying = true;
let playlist;
let audio = new Audio();
let songData;
let songName;
let Artist;
let SongMood;

async function main() {
    // Load songs from JSON
    let response = await fetch("song.json");
    let songs = await response.json();

    // Function to play music based on index
    function playMusic(x) {
        let music = songs[0][playlist];  // Get current playlist
        console.log(music);
        audio.src = music[x].url;
        audio.play();
        songName = music[x].title;
        Artist = music[x].artist;
        SongMood = music[x].mood;
        console.log(mood);  // This line may throw error if mood is not defined globally
        return { name, artist, mood };  // Variables `name`, `artist`, `mood` are undefined!
    }

    // English playlist button
    let btnEng = document.querySelector(".English");
    btnEng.addEventListener("click", () => {
        playlist = "english";
        console.log("english");
        songData = playMusic(i);
        songName = songData.name;
        SongMood = songData.mood;
        console.log(SongMood);
        Artist = songData.artist;
        isPlaying = true;
    });

    // Indie playlist button
    let btnInd = document.querySelector(".indie");
    btnInd.addEventListener("click", () => {
        playlist = "indie";
        console.log("indie");
        songData = playMusic(i);
        songName = songData.name;
        Artist = songData.artist;
        SongMood = songData.mood;
        console.log(SongMood);
        isPlaying = true;
    });

    // Bollywood playlist button
    let btnBolly = document.querySelector(".bollywood");
    btnBolly.addEventListener("click", () => {
        playlist = "bollywood";
        console.log("bollywood");
        songData = playMusic(i);
        songName = songData.name;
        Artist = songData.artist;
        SongMood = songData.mood;
        console.log(SongMood);
        isPlaying = true;
    });

    // Toggle Play/Pause button
    let play = document.querySelector(".play");
    play.addEventListener("click", () => {
        if (isPlaying == true) {
            audio.pause();
            console.log("Audio Paused");
            isPlaying = false;
        } else if (isPlaying == false) {
            audio.play();
            console.log("Audio Playing");
            isPlaying = true;
        }
    });

    // Previous button
    let prev = document.querySelector(".prev");
    prev.addEventListener("click", () => {
        if (i <= 0) {
            alert("Already at first Song");
        } else {
            i--;
            songData = playMusic(i);
            songName = songData.name;
            Artist = songData.artist;
            console.log(i);
        }
    });

    // Next button
    let next = document.querySelector(".next");
    next.addEventListener("click", () => {
        if (i >= songs[0][playlist].length - 1) {
            alert("Already at last Song");
        } else {
            i++;
            songData = playMusic(i);
            songName = songData.name;
            Artist = songData.artist;
            console.log(i);
        }
    });

    // When metadata is loaded (to update duration and UI)
    audio.addEventListener("loadedmetadata", () => {
        let duration = audio.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        console.log("Song Duration :", minutes, " : ", seconds);

        let div = document.querySelector(".info");
        if (!div) {
            console.error("Error: .info div not found!");
            return;
        }

        // Update mood color class
        console.log("Before resetting class: ", div.className);
        div.className = `info`;
        div.classList.add(SongMood);
        console.log("Final class on div: ", div.className);

        // Update song info UI
        div.innerHTML = `<h2> Currently playing : <span class = "deco"> <u> ${songName} </u> </span> </h2> <br>
                         <h2> Song By : <span class = "deco"> <u> ${Artist} </u> </span></h2> <br>
                         <h2> Duration : <span class = "deco"><u> ${minutes} minutes ${seconds} seconds </u></span> </h2>
                         <h2>Song mood : <span class = "deco">${SongMood}</span></h2>`;
    });

    // Dark mode toggle
    let isDarkmode = false;
    let toggle = document.querySelector(".toggle");
    toggle.addEventListener("click", () => {
        let link = document.querySelector(".tp");
        if (isDarkmode == false) {
            link.innerHTML = `<link rel="stylesheet" href="darkmode.css">`;
            document.querySelector(".head").prepend(link);
            isDarkmode = true;
        } else {
            link.innerHTML = `<link rel="stylesheet" href="style.css">`;
            document.querySelector(".head").prepend(link);
            isDarkmode = false;
        }
    });

    // Update progress bar in real time
    let progressBar = document.querySelector(".progress-bar");
    audio.addEventListener("timeupdate", () => {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        // Update current time display
        let minute = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        let currTime = document.querySelector(".currTime");
        currTime.innerText = `${minute}:${seconds}`;
    });

    // Seek bar interaction
    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    // Auto-play next song when current ends
    audio.addEventListener("ended", () => {
        if (i >= songs[0][playlist].length - 1) {
            console.log("ayoo");
        } else {
            next.click();
        }
    });

    // Volume control
    let volume = document.querySelector(".volumeBar");
    volume.addEventListener("input", () => {
        audio.volume = volume.value / 100;
    });

    // Keyboard shortcuts: Space = play/pause, Arrows = next/prev
    document.addEventListener("keydown", (e) => {
        if (e.code == "Space") {
            e.preventDefault();
            if (isPlaying == true) {
                audio.pause();
                isPlaying = false;
            } else if (isPlaying == false) {
                audio.play();
                isPlaying = true;
            }
        } else if (e.code == "ArrowRight") {
            next.click();
        } else if (e.code == "ArrowLeft") {
            prev.click();
        }
    });
}

// Start the app
main();
