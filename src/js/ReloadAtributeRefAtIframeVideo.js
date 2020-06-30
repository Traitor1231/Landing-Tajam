const iframepopup = document.getElementById("iframe-popup")
const areapopup = document.getElementById("area-popup")
areapopup.addEventListener("click", () => {
   iframepopup.removeAttribute("src")
   iframepopup.setAttribute("src","https://www.youtube.com/embed/KvUgaHTNit4")
})
