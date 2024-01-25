API_URL = "http://localhost:8000";

const RegistBtn = document.getElementById("regist-btn");
const LoginBtn = document.getElementById("login-btn");
const CssMode = document.getElementById("css-mode");
const LoginCpfMask = document.getElementById("logcpf");
const RegistCpfMask = document.getElementById("registcpf");



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



CssMode.addEventListener("click",  (e) => {
    let css = document.getElementById("css");
    let logo1 = document.getElementById("logo1");
    let logo2 = document.getElementById("logo2");
    if (css.getAttribute("href") === "css/darklogin.css") {
        css.setAttribute("href", "css/lightlogin.css");
        logo1.setAttribute("src", "img/logoemporiolight.png");
        logo2.setAttribute("src", "img/logoemporiolight.png");
    } else if (css.getAttribute("href") === "css/lightlogin.css") {
        css.setAttribute("href", "css/darklogin.css");
        logo1.setAttribute("src", "img/logoemporio.png");
        logo2.setAttribute("src", "img/logoemporio.png");
    }
})



function CpfMask(input) {
    let cpfmasklength = input.value.length;

    if (cpfmasklength === 3 || cpfmasklength === 7) {
        input.value += ".";
    } else if (cpfmasklength === 11) {
        input.value += "-";
    }
}