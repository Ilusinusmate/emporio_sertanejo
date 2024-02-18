const CssMode = document.getElementById("css-mode");

var path = window.location.pathname.split('/');
var fileName = path[path.length - 1];

if (localStorage.getItem("cssmode") === null) {
    localStorage.setItem("cssmode", "light");
};

CssMode.addEventListener('click', (e) => {
    e.preventDefault();
    var mode = localStorage.getItem("cssmode");
    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");
    let nav = document.getElementById("neubar");
    let planta = document.getElementById("planta");
    let logo1 = document.getElementById("logo1");
    let logo2 = document.getElementById("logo2");

    if (mode == "light") {
        if (fileName === "products.html") {
            css.setAttribute("href", "../css/products/darkproducts.css");
            logo.setAttribute("src", "../img/logoemporio.png");
            logo1.setAttribute("src", "../img/logoemporio.png")
            img.setAttribute("src", "../img/sun.png");    
            nav.classList.remove("navbar-light");
            nav.classList.add("navbar-dark");
        } else if (fileName === "index.html") {
            css.setAttribute("href", "www/css/index/darkindex.css");
            logo.setAttribute("src", "www/img/logoemporio.png");
            logo1.setAttribute("src", "www/img/logoemporio.png")
            img.setAttribute("src", "www/img/sun.png");   
            nav.classList.remove("navbar-light");
            nav.classList.add("navbar-dark");
        } else if (fileName === "login.html") {
            css.setAttribute("href", "../css/login/darklogin.css");
            logo2.setAttribute("src", "../img/logoemporio.png");
            logo1.setAttribute("src", "../img/logoemporio.png");
            img.setAttribute("src", "../img/sun.png");   
            planta.setAttribute("src", "../img/plantadark.svg")

        }

        localStorage.setItem("cssmode", "dark")
    } else if (mode == "dark") {
        if (fileName === "products.html") {
            css.setAttribute("href", "../css/products/lightproducts.css");
            logo.setAttribute("src", "../img/logoemporiolight.png");
            img.setAttribute("src", "../img/moon.png");
            logo1.setAttribute("src", "../img/logoemporiolight.png");
            nav.classList.remove("navbar-dark");
            nav.classList.add("navbar-light");
        } else if (fileName === "index.html") {
            css.setAttribute("href", "www/css/index/lightindex.css");
            logo.setAttribute("src", "www/img/logoemporiolight.png");
            img.setAttribute("src", "www/img/moon.png");
            logo1.setAttribute("src", "www/img/logoemporiolight.png")
            nav.classList.remove("navbar-dark");
            nav.classList.add("navbar-light");
        } else if (fileName === "login.html") {
            css.setAttribute("href", "../css/login/lightlogin.css");
            logo2.setAttribute("src", "../img/logoemporiolight.png");
            logo1.setAttribute("src", "../img/logoemporiolight.png");
            img.setAttribute("src", "../img/moon.png");
            planta.setAttribute("src", "../img/plantalight.svg")
        }

        localStorage.setItem("cssmode", "light")
    };
})
