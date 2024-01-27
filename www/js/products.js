API_URL = "http://localhost:8000"

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