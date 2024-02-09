API_URL = "https://emporio-sertanejo-api.onrender.com"


// primeira vez que a pessoa acessa a página
if (localStorage.getItem("cssmode") === null) {
    localStorage.setItem("cssmode", "light");
};

//const para acessar o valor de local storage que guarda o tema
const cssmode = localStorage.getItem("cssmode");


//função que carrega o elemento da local storage
function startCssMode(cssmode) {
    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");
    let nav = document.getElementById("neubar");

    if (cssmode === "dark") {
        css.setAttribute("href", "../css/index/darkindex.css");
        logo.setAttribute("src", "../img/logoemporio.png");
        img.setAttribute("src", "../img/sun.png");
        nav.classList.remove("navbar-light");
        nav.classList.add("navbar-dark");
    } else if (cssmode === "light") {
        css.setAttribute("href", "../css/index/lightindex.css");
        logo.setAttribute("src", "../img/logoemporiolight.png");
        img.setAttribute("src", "../img/moon.png");
        nav.classList.remove("navbar-dark");
        nav.classList.add("navbar-light");
    }
}

startCssMode(cssmode);

//const para descobrir qual o tema que a página se encontra (dark mode ou light mode)
const CssMode = document.getElementById("css-mode");

//função que troca o tema da página
CssMode.addEventListener("click",  (e) => {
    const mode = localStorage.getItem("cssmode")
    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let nav = document.getElementById("neubar");
    let img = document.getElementById("sun");

    if (mode === "light") {
        css.setAttribute("href", "../css/index/darkindex.css");
        logo.setAttribute("src", "../img/logoemporio.png");
        img.setAttribute("src", "../img/sun.png");
        nav.classList.remove("navbar-light");
        nav.classList.add("navbar-dark");
        localStorage.setItem("cssmode", "dark");
    } else if (mode === "dark") {
        css.setAttribute("href", "../css/index/lightindex.css");
        logo.setAttribute("src", "../img/logoemporiolight.png");
        img.setAttribute("src", "../img/moon.png");
        nav.classList.remove("navbar-dark");
        nav.classList.add("navbar-light");
        localStorage.setItem("cssmode", "light");
    };

})


cidade = document.getElementById("cidade");
var products = undefined;

cidade.addEventListener("change", (e) => {
    e.preventDefault()
    render()
})


function render(){
    switch (cidade.value){

        case "joaopessoa":
            var unit = 1;
            break;

        case "cabedelo":
            var unit = 2;
            break;

        default:
            var unit = 1;
    }


    fetch(API_URL+"/products/all?unit="+unit,  {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log(data);
    })
    .catch(erro => console.error("Error:", erro))
}

render()