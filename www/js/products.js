API_URL = "https://emporio-sertanejo-api.onrender.com"

const CssMode = document.getElementById("css-mode");

CssMode.addEventListener("click",  (e) => {
    let css = document.getElementById("css");
    let logo = document.getElementById("logo");
    let img = document.getElementById("sun");

    if (css.getAttribute("href") === "../css/index/lightindex.css") {
        css.setAttribute("href", "../css/index/darkindex.css");
        logo.setAttribute("src", "../img/logoemporio.png");
        img.setAttribute("src", "../img/sun.png");
    } else if (css.getAttribute("href") === "../css/index/darkindex.css") {
        css.setAttribute("href", "../css/index/lightindex.css");
        logo.setAttribute("src", "../img/logoemporiolight.png");
        img.setAttribute("src", "../img/moon.png");
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