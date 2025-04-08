console.log("ATharva")
let i = 0;
let isPlaying = false
let playlist;
let audio = new Audio()
let songData;
let songName;
let Artist;


async function main() {

    //music loader
    let response = await fetch("song.json")
    let songs = await response.json();


    function playMusic(x) {
        let music = songs[0][playlist]
        console.log(music)
        audio.src = music[x].url
        audio.play()
        let name = music[x].title
        let artist = music[x].artist
        return { name, artist }

    }
    let btnEng = document.querySelector(".English")
    btnEng.addEventListener("click", () => {
        playlist = "english"
        console.log("english")
        songData = playMusic(i);
        songName = songData.name
        Artist = songData.artist
        isPlaying = true

    })
    let btnInd = document.querySelector(".indie")
    btnInd.addEventListener("click", () => {
        playlist = "indie"
        console.log("indie")
        songData = playMusic(i);
        songName = songData.name
        Artist = songData.artist
        isPlaying = true



    })
    let btnBolly = document.querySelector(".bollywood")
    btnBolly.addEventListener("click", () => {
        playlist = "bollywood"
        console.log("bollywood")
        songData = playMusic(i);
        songName = songData.name
        Artist = songData.artist
        isPlaying = true

    })

    let play = document.querySelector(".play")
    play.addEventListener("click", () => {
        if (isPlaying == true) {
            audio.pause();
            console.log("Audio Paused")
            isPlaying = false
        } else if (isPlaying == false) {
            audio.play();
            console.log("Audio Playing")
            isPlaying = true
        }
    })
    let prev = document.querySelector(".prev")
    prev.addEventListener("click", () => {
        if (i <= 0) {
            alert("Already at first Song")
        } else {
            i--
            songData = playMusic(i);
            songName = songData.name
            Artist = songData.artist
            console.log(i)

        }
    })
    let next = document.querySelector(".next")
    next.addEventListener("click", () => {
        if (i >= songs[0][playlist].length - 1) {
            alert("Already at last Song")
        } else {
            i++
            songData = playMusic(i);
            songName = songData.name
            Artist = songData.artist
            console.log(i)

        }
    })
    audio.addEventListener("loadedmetadata", () => {
        let duration = audio.duration
        let minutes = Math.floor(duration / 60)
        let seconds = Math.floor(duration % 60)
        console.log("Song Duration :", minutes, " : ", seconds)
        let div = document.querySelector(".info")
        if (!div) {
            console.error("Error: .info div not found!");
            return;
        }
        div.innerHTML = `<h2> Currently playing : <u> ${songName} </u> </h2> <br>
                         <h2> Song By : <u> ${Artist} </u></h2> <br>
                         <h2> Duration :<u> ${minutes} minutes ${seconds} seconds </u> </h2>`
    })




}
main();