switch (window.location.href) {
    case "http://127.0.0.1:5500/":
        window.location.href = "http://127.0.0.1:5500/index.html";
        break;
    case "http://localhost:5500/":
        window.location.href = "http://localhost:5500/index.html";
        break;
    case "https://ilusinusmate.github.io/emporio_sertanejo/":
        window.location.href = "https://ilusinusmate.github.io/emporio_sertanejo/index.html";
        break;
}

if (localStorage.getItem("cidade") === null) {
    localStorage.setItem("cidade", "cabedelo");
};

document.addEventListener("DOMContentLoaded", () => {
    cidade = document.getElementById("cidade");
    cidade.addEventListener("input", handleSelect);

    // função que verifica se o elemento já foi alcançado pelo scroll
    function checkScroll(elements) {
        window.addEventListener('scroll', function () {
            elements.forEach(function (element) {
                var elementPosition = element.getBoundingClientRect().top;
                var screenHeight = window.innerHeight;
            
                if (elementPosition < screenHeight) {
                    element.classList.add('triggered');
                }
            });
        });
    }

    // função que verifica se o elemento já foi alcançado pelo scroll
    function checkVisibility(element) {
        window.addEventListener('scroll', function () {
            var elementPosition = element.getBoundingClientRect().top;
            var screenHeight = window.innerHeight;
        
            if (elementPosition < screenHeight) {
                element.classList.add('animated');
            }
        });
    }

    // geração das variáveis que serão verificadas pelas funções acima
    var eachdivs = document.querySelectorAll('.eachdiv');
    checkScroll(eachdivs);
    
    var maps = document.querySelectorAll('.maps');
    checkScroll(maps);

    var footer = document.querySelector('.footer-dark');
    checkVisibility(footer);

})

//função que carrega o mapa
async function handleSelect(ev) {
    let select = ev.target;
    let map = document.getElementById("map");
    if (select.value == "joaopessoa") {
        localStorage.setItem("cidade", "joaopessoa");
        map.setAttribute("src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.2269353791316!2d-34.86479402470849!3d-7.099675869608101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7acdd620b25c3a7%3A0x2265a276573909ae!2sEmp%C3%B3rio%20Sertanejo!5e0!3m2!1sen!2sbr!4v1706310493888!5m2!1sen!2sbr")
    } else if (select.value == "cabedelo") {
        localStorage.setItem("cidade", "cabedelo");
        map.setAttribute("src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.245079568503!2d-34.83272552471006!3d-6.980381368356022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ad21be755dd797%3A0xe21ccb7c539f75c6!2sEmporio%20Sertanejo%20de%20Cabedelo!5e0!3m2!1sen!2sbr!4v1706310538149!5m2!1sen!2sbr")
    }
}

//FUNÇÃO QUE FAZ O SLIDER FUNCIONAR
const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

function autoClickNextButton() {
    let next = document.querySelector('.carousel-button.prev');
    setInterval(function() {next.click();}, 7000); 
}

autoClickNextButton();

const depoimentos = document.querySelectorAll(".eachdiv");

depoimentos.forEach(depoimento => {
    depoimento.addEventListener('mouseover', () => {
        depoimento.classList.remove('triggered');
        depoimento.classList.add('zoom');
    });

    depoimento.addEventListener('mouseout', () => {
        depoimento.classList.remove('zoom');
        depoimento.classList.add('zoomout');
    });
});