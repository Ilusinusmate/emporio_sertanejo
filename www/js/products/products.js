API_URL = "https://emporio-sertanejo-api.onrender.com"

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
