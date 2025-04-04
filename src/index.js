const inputElem = document.querySelector("#input")
const containerElem = document.querySelector(".container")
const mainTitleElem = document.querySelector(".main-title")
const countriesElem = document.querySelector("#countries")
const countriesListElem = document.querySelector("#countries-list")
const countryElem = document.querySelector("#country")

inputElem.addEventListener("focus", () => {
    mainTitleElem.style.display = "none"
    containerElem.style.top = "88px"
    containerElem.style.transform = "translate( -50%, 0)"
    countriesElem.style.display = "flex"
    countryElem.style.display = "block"
})


inputElem.addEventListener("blur", () => {
    if (inputElem.value === "") {
        mainTitleElem.style.display = "block"
        containerElem.style.top = "50%"
        containerElem.style.transform = "translate( -50%, -50%)"
        countriesElem.style.display = "none"
        countryElem.style.display = "none"
    }
})