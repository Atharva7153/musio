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
        div.innerHTML = `<h2> Currently playing : <span class = "deco"> <u> ${songName} </u> </span> </h2> <br>
                         <h2> Song By : <span class = "deco"> <u> ${Artist} </u> </span></h2> <br>
                         <h2> Duration : <span class = "deco"><u> ${minutes} minutes ${seconds} seconds </u></span> </h2>`
    })
    let isDarkmode = false
    let toggle = document.querySelector(".toggle")
    toggle.addEventListener("click", ()=>{
      if(isDarkmode == false){
        let link = document.querySelector(".tp")
        link.innerHTML = ` <link rel="stylesheet" href="darkmode.css">`
        document.querySelector(".head").prepend(link)
        isDarkmode = true
      }else{
        let link = document.querySelector(".tp")
        link.innerHTML = ` <link rel="stylesheet" href="style.css">`
        document.querySelector(".head").prepend(link)
        isDarkmode = false
      }
      
    })

    let progressBar = document.querySelector(".progress-bar")
    audio.addEventListener("timeupdate", ()=>{
        let progress = (audio.currentTime/audio.duration) * 100
        progressBar.value = progress
        let minute = Math.floor(audio.currentTime/60)
        let seconds = Math.floor(audio.currentTime%60)
        let currTime = document.querySelector(".currTime")
        currTime.innerText = `${minute}:${seconds}`
        
    })
    progressBar.addEventListener("input", ()=>{
        audio.currentTime = (progressBar.value/100) * audio.duration
    })

    audio.addEventListener("ended", ()=>{
        if (i >= songs[0][playlist].length - 1) {
            console.log("ayoo")
        } else {
            next.click()

        }
    })

    let volume = document.querySelector(".volumeBar")
    volume.addEventListener("input", ()=>{
        audio.volume = volume.value/100
    })

    document.addEventListener("keydown", (e)=>{
        if(e.code == "Space"){
            e.preventDefault();
            if(isPlaying == true){
                audio.pause();
                isPlaying = false
            }
            else if(isPlaying == false){
                audio.play();
                isPlaying = true
            }
        }
        else if(e.code == "ArrowRight"){
            next.click();
        }
        else if(e.code == "ArrowLeft"){
            prev.click();
        }
    })




}
main();