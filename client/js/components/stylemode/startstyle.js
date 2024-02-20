// criação da variável que captura o arquivo que está sendo usado atualmente
var path = window.location.pathname.split('/');
var fileName = path[path.length - 1];

// função que faz a iniciação do tema da página
document.addEventListener("DOMContentLoaded", () => {
    // criação das variáveis que vão ser modificadas dentro do css
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");
    let nav = document.getElementById("neubar");
    let logo1 = document.getElementById("logo1");
    let logo2 = document.getElementById("logo2");
    let planta = document.getElementById("planta");

    // verificação de qual modo está no momento
    if (localStorage.getItem("cssmode") === "dark") {
        if (fileName === "index.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "client/css/index/darkindex.css");
            logo.setAttribute("src", "client/img/logoemporio.png");
            img.setAttribute("src", "client/img/sun.png");
            logo1.setAttribute("src", "client/img/logoemporio.png")
            nav.classList.remove("navbar-light");
            nav.classList.add("navbar-dark");
        } else if (fileName === "products.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "../css/products/darkproducts.css");
            logo.setAttribute("src", "../img/logoemporio.png");
            img.setAttribute("src", "../img/sun.png");
            logo1.setAttribute("src", "../img/logoemporio.png")
            nav.classList.remove("navbar-light");
            nav.classList.add("navbar-dark");
        } else if (fileName === "login.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "../css/login/darklogin.css");
            logo2.setAttribute("src", "../img/logoemporio.png");
            logo1.setAttribute("src", "../img/logoemporio.png");
            img.setAttribute("src", "../img/sun.png");   
            planta.setAttribute("src", "../img/plantadark.svg")
        }
    } else if (localStorage.getItem("cssmode") === "light") {
        if (fileName === "index.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "client/css/index/lightindex.css");
            logo.setAttribute("src", "client/img/logoemporiolight.png");
            img.setAttribute("src", "client/img/moon.png");
            logo1.setAttribute("src", "client/img/logoemporiolight.png")
            nav.classList.remove("navbar-dark");
            nav.classList.add("navbar-light");
        } else if (fileName === "products.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "../css/products/lightproducts.css");
            logo.setAttribute("src", "../img/logoemporiolight.png");
            img.setAttribute("src", "../img/moon.png");
            logo1.setAttribute("src", "../img/logoemporiolight.png")
            nav.classList.remove("navbar-dark");
            nav.classList.add("navbar-light");
        } else if (fileName === "login.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "../css/login/lightlogin.css");
            logo2.setAttribute("src", "../img/logoemporiolight.png");
            logo1.setAttribute("src", "../img/logoemporiolight.png");
            img.setAttribute("src", "../img/moon.png");
            planta.setAttribute("src", "../img/plantalight.svg")
        }
    }
})