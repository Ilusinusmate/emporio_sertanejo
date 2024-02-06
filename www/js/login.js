API_URL = "https://emporio-sertanejo-api.onrender.com";

// primeira vez que a pessoa acessa a página
if (localStorage.getItem("cssmode") === null) {
    localStorage.setItem("cssmode", "light");
};


//const para acessar o valor de local storage que guarda o tema
const cssmode = localStorage.getItem("cssmode");


function startStyleMode(startstyle) {
    let css = document.getElementById("css");
    let logo1 = document.getElementById("logo1");
    let logo2 = document.getElementById("logo2");
    let img = document.getElementById("sun");
    let planta = document.getElementById("planta");

    if (startstyle === "dark") {
        css.setAttribute("href", "../css/login/darklogin.css");
        logo1.setAttribute("src", "../img/logoemporio.png");
        logo2.setAttribute("src", "../img/logoemporio.png");
        img.setAttribute("src", "../img/sun.png");
        planta.setAttribute("src", "../img/plantadark.svg")
    } else if (startstyle === "light") {
        css.setAttribute("href", "../css/login/lightlogin.css");
        logo1.setAttribute("src", "../img/logoemporiolight.png");
        logo2.setAttribute("src", "../img/logoemporiolight.png");
        img.setAttribute("src", "../img/moon.png");
        planta.setAttribute("src", "../img/plantalight.svg")
    }
}

startStyleMode(cssmode);

const RegistBtn = document.getElementById("regist-btn");
const LoginBtn = document.getElementById("login-btn");
//const para descobrir qual o tema que a página se encontra (dark mode ou light mode)
const CssMode = document.getElementById("css-mode");


LoginBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const password = document.getElementById("logpass").value;
    const cpf = document.getElementById("logcpf").value;

    console.log(password, cpf, typeof(password), typeof(cpf))

    const requestBody = new URLSearchParams();
    requestBody.append('username', cpf);
    requestBody.append('password', password);
         

    fetch(API_URL+ "/employee/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: requestBody
    })

    .then(response => response.json())

    .then(data => {
        console.log('Token de acesso:', data);
    })

    .catch(error => console.error('Erro:', error));
})



RegistBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("registname").value;
    const password = document.getElementById("registpass").value;
    const cpf = document.getElementById("registcpf").value;

    console.log(password, cpf, fullName, typeof(password), typeof(cpf), typeof(fullName))

    const requestBody = JSON.stringify({
        name: fullName,
        cpf: cpf,
        password: password
    });
         

    fetch(API_URL + "/employee/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: requestBody
    })

    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

    .catch(error => console.error('Erro:', error));
})


//função que troca o tema da página
CssMode.addEventListener("click",  (e) => {
    let css = document.getElementById("css");
    let logo1 = document.getElementById("logo1");
    let logo2 = document.getElementById("logo2");
    let img = document.getElementById("sun");
    let planta = document.getElementById("planta");

    if (css.getAttribute("href") === "../css/login/lightlogin.css") {
        css.setAttribute("href", "../css/login/darklogin.css");
        logo1.setAttribute("src", "../img/logoemporio.png");
        logo2.setAttribute("src", "../img/logoemporio.png");
        img.setAttribute("src", "../img/sun.png");
        planta.setAttribute("src", "../img/plantadark.svg")
        localStorage.setItem("cssmode", "dark");
    } else if (css.getAttribute("href") === "../css/login/darklogin.css") {
        css.setAttribute("href", "../css/login/lightlogin.css");
        logo1.setAttribute("src", "../img/logoemporiolight.png");
        logo2.setAttribute("src", "../img/logoemporiolight.png");
        img.setAttribute("src", "../img/moon.png");
        planta.setAttribute("src", "../img/plantalight.svg")
        localStorage.setItem("cssmode", "light");
    };
})


//função para fazer o mascaramento de cpf no navegador dentro do input de cpf
function CpfMask(input) {
    let cpfmasklength = input.value.length;

    if (cpfmasklength === 3 || cpfmasklength === 7) {
        input.value += ".";
    } else if (cpfmasklength === 11) {
        input.value += "-";
    };
}