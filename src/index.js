import {
    error,
    defaultModules,
} from "/node_modules/@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "/node_modules/@pnotify/mobile/dist/PNotifyMobile.js";
defaultModules.set(PNotifyMobile, {});
import _ from "lodash"

const inputElem = document.querySelector("#input")
const mainElem = document.querySelector("#main")
const containerElem = document.querySelector(".container")
const mainTitleElem = document.querySelector(".main-title")
const countriesElem = document.querySelector("#countries")
const nothingElem = document.querySelector("#nothing")
const countriesListElem = document.querySelector("#countries-list")
const countryElem = document.querySelector("#country")

inputElem.addEventListener("focus", () => {
    mainElem.style.height = 0
    mainTitleElem.style.display = "none"
    containerElem.style.top = "88px"
    containerElem.style.transform = "translate( -50%, 0)"
    countriesElem.style.display = "flex"
    countriesElem.style.display = "block"
    if (countryElem.style.display === "block") {
        countriesElem.style.display = "none"

    }
    if (countriesElem.style.display === "flex" && countriesListElem.style.display === "flex") {
        nothingElem.style.display = "none"
        countriesElem.style.display = "flex"

    }

})

inputElem.addEventListener("input", _.debounce(() => {
    makeFetch()
}, 500))

inputElem.addEventListener("blur", () => {
    if (inputElem.value === "") {
        mainTitleElem.style.display = "block"
        containerElem.style.top = "50%"
        containerElem.style.transform = "translate( -50%, -50%)"
        countriesElem.style.display = "none"
        countryElem.style.display = "none"
        mainElem.style.height = "100dvh"


    }
})

const makeFetch = () => {
    fetch("https://restcountries.com/v3.1/all").
        then((response) => {
            return response.json()
        }).
        then((data) => {
            const dataFiltered = findCountriesByLetters(data)
            if (dataFiltered.length > 10) {
                nothingElem.textContent = "There are so many results..."
                if (inputElem.value === "") {
                    nothingElem.textContent = "Even no results..."
                }
                countryElem.style.display = "none"
                countriesListElem.style.display = "none"
                nothingElem.style.display = "block"
                countriesElem.style.display = "block"
                error({
                    text: 'There are so many results...'
                });
            } else {
                if (dataFiltered.length > 1) {
                    makesCountriesDynamicMarkup(dataFiltered)
                    countriesListElem.style.display = "flex"
                    nothingElem.style.display = "none"
                    countriesElem.style.display = "block"
                    countryElem.style.display = "none"


                } else {
                    if (dataFiltered.length === 1) {
                        makesCountryDynamicMarkup(dataFiltered)
                        countriesElem.style.display = "none"
                        countryElem.style.display = "block"

                    } else {
                        countryElem.style.display = "none"
                        countriesListElem.style.display = "none"
                        nothingElem.textContent = "This country doesn't exist..."
                        nothingElem.style.display = "block"
                        countriesElem.style.display = "block"
                    }
                }
            }
        }).catch((error) => {
            console.log(error);

        })
}


const findCountriesByLetters = (countries) => {
    const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(inputElem.value.toLowerCase()))
    return filtered
};

const makesCountriesDynamicMarkup = (countries) => {
    let coutriesList = ''
    let i = 0
    countries.map(country => {
        if (i === 0) {
            coutriesList +=
                `<li class="counties-item">
                    <p class="countries-name">${country.name.common}</p>
                </li>`
            i += 1
        } else {
            coutriesList +=
                `<li class="counties-item">
                    <div class="countries-line"></div>
                    <p class="countries-name">${country.name.common}</p>
                </li>`;
        }

    })

    countriesListElem.innerHTML = coutriesList
};

const makesCountryDynamicMarkup = ([country]) => {
    const countryText =
        `
            <h2 id="name" class="country-name">${country.name.common}</h2>
            <div class="country-content">
                <div class="country-left">
                <p class="text">
                    Capital: <span id="capital" class="data">${country.capital}</span>
                </p>
                <p class="text">
                    Population: <span id="population" class="data">${country.population}</span>
                </p>
                <p class="text text-mar">Languages:</p>
                <ul id="languages" class="country-langs">
                           ${makeLanguagesDynamicMarkup(country)}      
                </ul>
                </div>
                <img
                    class="country-image"
                    src="${country.flags.png}"
                    alt=""
                />
            </div>`
    countryElem.innerHTML = countryText

}

const makeLanguagesDynamicMarkup = (country) => {
    let languagesText = ""
    const languages = Object.values(country.languages)
    languages.map(language => {
        languagesText +=
            `<li class="country-lang">
                <p class="country-langname">${language}</p>
            </li>`
    })
    return languagesText
}

