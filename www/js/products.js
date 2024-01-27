API_URL = "http://localhost:800"

fetch(API_URL+"/products/all",  {
    method: "GET"
})
.then(response => response.json)
.then(data => {
    const products = data
    console.log(data)
})
.catch(erro => console.error("Error:", erro))