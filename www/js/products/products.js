API_URL = "https://emporio-sertanejo-api.onrender.com"

// primeira vez que a pessoa acessa a página
if (localStorage.getItem("cssmode") === null) {
    localStorage.setItem("cssmode", "light");
};

if (localStorage.getItem("cidade") === null) {
    localStorage.setItem("cidade", "cabedelo");
};

cidade = document.getElementById("cidade");
    
cidade.addEventListener("change", (e) => {
    e.preventDefault()
    renderize()
})

async function renderize() {

    var products = [];

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

    await fetch(API_URL+"/products/all?unit="+unit,  {
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

    const myList = document.getElementById('autoWidth');

    var cont = 0;

    for (const li of myList.getElementsByTagName('li')) {
        const img = li.querySelector('img');
    
        const buyBtn = li.querySelector('.buy-btn');
        const price = li.querySelector('.price');
        const otherA = li.querySelector('#slide-title');
    
        const span = li.querySelector('span');
    
        if (products[cont].image_link === undefined || products[cont].image_link === null) {
            var image = "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
        } else {
            var image = products[cont].image_link
        }


        img.src = image;
        buyBtn.textContent = 'Buy Now';
        price.textContent = `R$${products[cont].price}`;
        span.textContent = products[cont].description;
        otherA.textContent = products[cont].name;
        if (cont == 0) {
            cont = 1
        } else if (cont == 1) {
            cont = 0
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const cssmode = localStorage.getItem("cssmode");
    let logo1 = document.getElementById("logo1");
    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");
    let nav = document.getElementById("neubar");

    if (cssmode === "dark") {
        css.setAttribute("href", "../css/products/darkproducts.css");
        logo.setAttribute("src", "../img/logoemporio.png");
        logo1.setAttribute("src", "../img/logoemporio.png");
        img.setAttribute("src", "../img/sun.png");
        nav.classList.remove("navbar-light");
        nav.classList.add("navbar-dark");
    } else if (cssmode === "light") {
        css.setAttribute("href", "../css/products/lightproducts.css");
        logo.setAttribute("src", "../img/logoemporiolight.png");
        logo1.setAttribute("src", "../img/logoemporiolight.png");
        img.setAttribute("src", "../img/moon.png");
        nav.classList.remove("navbar-dark");
        nav.classList.add("navbar-light");
    }

    const teste = document.getElementById("css-mode");
    teste.addEventListener('click', () => {
        const mode = localStorage.getItem("cssmode");
        let css = document.getElementById("css");
        let logo = document.getElementById("logo");
        let img = document.getElementById("sun");
        let nav = document.getElementById("neubar");
        let logo1 = document.getElementById("logo1");

        if (mode === "light") {
            css.setAttribute("href", "../css/products/darkproducts.css");
            logo.setAttribute("src", "../img/logoemporio.png");
            img.setAttribute("src", "../img/sun.png");
            logo1.setAttribute("src", "../img/logoemporio.png")
            nav.classList.remove("navbar-light");
            nav.classList.add("navbar-dark");
            localStorage.setItem("cssmode", "dark")
        } else if (mode === "dark") {
            css.setAttribute("href", "../css/products/lightproducts.css");
            logo.setAttribute("src", "../img/logoemporiolight.png");
            img.setAttribute("src", "../img/moon.png");
            logo1.setAttribute("src", "../img/logoemporiolight.png")
            nav.classList.remove("navbar-dark");
            nav.classList.add("navbar-light");
            localStorage.setItem("cssmode", "light")
        };
    })

    renderize()

})

// JavaScript Document
$(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        } 
    });  
});
