// primeira vez que a pessoa acessa a página 
if (localStorage.getItem("cssmode") === null) {
    localStorage.setItem("cssmode", "light");
};

//const para acessar o botão que troca o tema (dark mode ou light mode)
const CssMode = document.getElementById("css-mode");

document.addEventListener("DOMContentLoaded", () => {
    const stylemode = localStorage.getItem("cssmode");

    cidade = document.getElementById("cidade");
    cidade.addEventListener("input", handleSelect);

    var eachdivs = document.querySelectorAll('.eachdiv');

    function checkScroll1() {
        eachdivs.forEach(function(div) {
            var divPosition = div.getBoundingClientRect().top;
            var screenHeight = window.innerHeight;    

            if (divPosition < screenHeight) {
                div.classList.add('triggered');
            }
        }) 
    }

    window.addEventListener('scroll', checkScroll1);
    checkScroll1();

    var maps = document.querySelectorAll('.maps');

    function checkScroll2() {
        maps.forEach(function(div) {
            var divPosition = div.getBoundingClientRect().top;
            var screenHeight = window.innerHeight;    

            if (divPosition < screenHeight) {
                div.classList.add('triggered');
            }
        }) 
    }

    window.addEventListener('scroll', checkScroll2);
    checkScroll2();

    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");
    let nav = document.getElementById("neubar");
    let logo1 = document.getElementById("logo1");

    if (stylemode === "dark") {
        css.setAttribute("href", "www/css/index/darkindex.css");
        logo.setAttribute("src", "www/img/logoemporio.png");
        img.setAttribute("src", "www/img/sun.png");
        logo1.setAttribute("src", "www/img/logoemporio.png")
        nav.classList.remove("navbar-light");
        nav.classList.add("navbar-dark");
    } else if (stylemode === "light") {
        css.setAttribute("href", "www/css/index/lightindex.css");
        logo.setAttribute("src", "www/img/logoemporiolight.png");
        img.setAttribute("src", "www/img/moon.png");
        logo1.setAttribute("src", "www/img/logoemporiolight.png")
        nav.classList.remove("navbar-dark");
        nav.classList.add("navbar-light");
    }
})

//função que de fato carrega o mapa
async function handleSelect(ev) {
    let select = ev.target;
    let map = document.getElementById("map");
    if (select.value == "joaopessoa") {
        map.setAttribute("src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.2269353791316!2d-34.86479402470849!3d-7.099675869608101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7acdd620b25c3a7%3A0x2265a276573909ae!2sEmp%C3%B3rio%20Sertanejo!5e0!3m2!1sen!2sbr!4v1706310493888!5m2!1sen!2sbr")
    } else if (select.value == "cabedelo") {
        map.setAttribute("src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.245079568503!2d-34.83272552471006!3d-6.980381368356022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ad21be755dd797%3A0xe21ccb7c539f75c6!2sEmporio%20Sertanejo%20de%20Cabedelo!5e0!3m2!1sen!2sbr!4v1706310538149!5m2!1sen!2sbr")
    }
}


//função que troca o tema da página
CssMode.addEventListener("click",  (e) => {
    const mode = localStorage.getItem("cssmode");
    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");
    let nav = document.getElementById("neubar");
    let logo1 = document.getElementById("logo1");

    if (mode === "light") {
        css.setAttribute("href", "www/css/index/darkindex.css");
        logo.setAttribute("src", "www/img/logoemporio.png");
        img.setAttribute("src", "www/img/sun.png");
        logo1.setAttribute("src", "www/img/logoemporio.png")
        nav.classList.remove("navbar-light");
        nav.classList.add("navbar-dark");
        localStorage.setItem("cssmode", "dark")
    } else if (mode === "dark") {
        css.setAttribute("href", "www/css/index/lightindex.css");
        logo.setAttribute("src", "www/img/logoemporiolight.png");
        img.setAttribute("src", "www/img/moon.png");
        logo1.setAttribute("src", "www/img/logoemporiolight.png")
        nav.classList.remove("navbar-dark");
        nav.classList.add("navbar-light");
        localStorage.setItem("cssmode", "light")
    };
})

document.addEventListener('DOMContentLoaded', function() {
    var footer = document.querySelector('.footer-dark');
    var testimonials = document.querySelector('.testimonials');
  
    function checkFooterVisibility() {
        var footerPosition = footer.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;
  
        if (footerPosition < screenHeight) {
            footer.classList.add('animated');
        }
    }
    window.addEventListener('scroll', checkFooterVisibility);
    checkFooterVisibility();

    function checkTestimonialsVisibility() {
        var testimonialsPosition = testimonials.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;
  
        if (testimonialsPosition < screenHeight) {
            testimonials.classList.add('animated');
        }
    }
    window.addEventListener('scroll', checkTestimonialsVisibility);
    checkTestimonialsVisibility();

});