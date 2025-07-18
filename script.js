var btn = document.querySelector("button");
var titleDiv = document.getElementById("title");
var memeDiv = document.getElementById("Meme");

let url = "https://meme-api.com/gimme/";

let subReddites = ["catmemes", "wholesomemes", "dogmemes", "me_irl"];

let getMeme = async () => {
    document.querySelector("#loader-main").style.opacity = "1";
    document.querySelector("#loader-main").style.zIndex = "10";
    let randomSubReddit = subReddites[Math.floor(Math.random() * subReddites.length)];
    // console.log(randomSubReddit);
    await fetch(url + randomSubReddit)
        .then(async (res) => await res.json())
        .then((data) => {
            // console.log(data);
            let memeImg = new Image();
            memeImg.onload = () => {
                memeDiv.src = data.url;
                titleDiv.innerText = data.title;
                setTimeout(() => {
                    document.querySelector("#loader-main").style.opacity = "0";
                    document.querySelector("#loader-main").style.zIndex = "-1";
                    loading_gsap.pause();
                }, 2000)
            }
            memeImg.src = data.url;

        })

}

btn.addEventListener("click", () => {
    loading_gsap.play();
    // alert(h1_Text);
    getMeme();
})

window.addEventListener("load", () => {
    getMeme();
    setTimeout(() => {
        document.querySelector("#loader-main").style.opacity = "0";
        document.querySelector("#loader-main").style.zIndex = "-1";
        loading_gsap.pause();
    }, 5000);
})


// LOADING ANIAMTION WITH GSAP

var pDiv = document.querySelectorAll("#loader-main p");

let loading_gsap = gsap.fromTo(pDiv, {
    scale: 0,
    opacity: 0,
}, {
    scale: 1,
    opacity: 1,
    duration: 3,
    ease: "back.out(1)",
    stagger: 0.3,
    repeat: -1,
})