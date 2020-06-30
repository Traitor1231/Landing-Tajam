const burger = document.getElementById("burger")
const navigationContent = document.getElementById("navigation-content")
burger.addEventListener("click", () => {
    navigationContent.classList.toggle('active')
})
