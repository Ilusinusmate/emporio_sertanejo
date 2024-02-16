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

    const sliderContainer = document.querySelector(".slider #autoWidth")

    products.forEach(element => {
        console.log("aaaa", element)

        if (element.image_link == null){
            element.image_link = "";
        };

        let li = document.createElement("li")
        let div = document.createElement("div")
        let div2 = document.createElement("div")
        let img = document.createElement("img")
        let div3 = document.createElement("div")
        let a = document.createElement("a")
        let div4 = document.createElement("div")
        let div5 = document.createElement("div")
        let a2 = document.createElement("a")
        let span = document.createElement("span")
        let a3 = document.createElement("a")

        div.setAttribute("class", "box")
        div2.setAttribute("class", "slide-img")
        img.setAttribute("alt", "1")
        img.setAttribute("src", element.image_link)
        div3.setAttribute("class", "overlay")
        a.setAttribute("href", "#")
        a.setAttribute("class", "buy-btn")
        div4.setAttribute("class", "detail-box")
        div5.setAttribute("class", "type")
        a2.setAttribute("href", "#")
        a2.textContent = element.name
        span.textContent = element.description
        a3.textContent = `$${element.price}`

        div3.appendChild(a)
        div2.appendChild(img)
        div2.appendChild(div3)
        div.appendChild(div2)

        div5.appendChild(a2)
        div5.appendChild(span)
        div4.appendChild(div5)
        div4.appendChild(a3)
        div.appendChild(div4)

        li.appendChild(div)



        sliderContainer.appendChild(li)
    });
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
