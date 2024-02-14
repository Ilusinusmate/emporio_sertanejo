API_URL = "https://emporio-sertanejo-api.onrenderize.com"

// primeira vez que a pessoa acessa a página
if (localStorage.getItem("cssmode") === null) {
    localStorage.setItem("cssmode", "light");
};

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


    cidade = document.getElementById("cidade");
    var products = undefined;
    
    cidade.addEventListener("change", (e) => {
        e.preventDefault()
        renderize()
    })
        
    function renderize() {
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

    renderize()

})

