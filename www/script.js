API_URL = "http://localhost:8000";

const LoginBtn = document.getElementById("login-btn")
const RegistBtn = document.getElementById("regist-btn")


LoginBtn.addEventListener("click", (e)=>{
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



RegistBtn.addEventListener("click", (e)=>{
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
         

    fetch(API_URL+ "/employee/register", {
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

