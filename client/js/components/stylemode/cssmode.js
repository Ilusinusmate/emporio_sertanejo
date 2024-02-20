// const que acessa o botão de trocar o tema
const CssMode = document.getElementById("css-mode");

// criação da variável que captura o arquivo que está sendo usado atualmente
var path = window.location.pathname.split('/');
var fileName = path[path.length - 1];

// verificação da existência de um modo de tema no localStorage
if (localStorage.getItem("cssmode") === null) {
    localStorage.setItem("cssmode", "light");
};

// iniciação do evento com o botão de trocar de tema
CssMode.addEventListener('click', (e) => {
    e.preventDefault();
    // criação das variáveis que vão ser modificadas dentro do css
    var mode = localStorage.getItem("cssmode");
    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");
    let nav = document.getElementById("neubar");
    let planta = document.getElementById("planta");
    let logo1 = document.getElementById("logo1");
    let logo2 = document.getElementById("logo2");

    // verificação de qual modo está no momento
    if (mode == "light") {
        if (fileName === "products.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "../css/products/darkproducts.css");
            logo.setAttribute("src", "../img/logoemporio.png");
            logo1.setAttribute("src", "../img/logoemporio.png")
            img.setAttribute("src", "../img/sun.png");    
            nav.classList.remove("navbar-light");
            nav.classList.add("navbar-dark");
        } else if (fileName === "index.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "client/css/index/darkindex.css");
            logo.setAttribute("src", "client/img/logoemporio.png");
            logo1.setAttribute("src", "client/img/logoemporio.png")
            img.setAttribute("src", "client/img/sun.png");   
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
        localStorage.setItem("cssmode", "dark")
    } else if (mode == "dark") {
        if (fileName === "products.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "../css/products/lightproducts.css");
            logo.setAttribute("src", "../img/logoemporiolight.png");
            img.setAttribute("src", "../img/moon.png");
            logo1.setAttribute("src", "../img/logoemporiolight.png");
            nav.classList.remove("navbar-dark");
            nav.classList.add("navbar-light");
        } else if (fileName === "index.html") {
            // setagem dos atributos novos e etc.
            css.setAttribute("href", "client/css/index/lightindex.css");
            logo.setAttribute("src", "client/img/logoemporiolight.png");
            img.setAttribute("src", "client/img/moon.png");
            logo1.setAttribute("src", "client/img/logoemporiolight.png")
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
        localStorage.setItem("cssmode", "light")
    };
})
