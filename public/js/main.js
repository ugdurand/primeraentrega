const socket = io();

socket.on('products', (data) => {
    console.log("Products recibido: ", data);
    if (data.length > 0) {
        mostrarProductos(data);
    }

})


function mostrarProductos(productos) {
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    productos.forEach(producto => {
        const tr = document.createElement("tr");
        const tdTitle = document.createElement("td");
        tdTitle.innerText = producto.title;
        const tdDescription = document.createElement("td");
        tdDescription.innerText = producto.description;
        const tdCode = document.createElement("td");
        tdCode.innerText = producto.code;
        const tdPrice = document.createElement("td");
        tdPrice.innerText = producto.price;


        tr.appendChild(tdTitle);
        tr.appendChild(tdDescription);
        tr.appendChild(tdCode);
        tr.appendChild(tdPrice);
        tbody.appendChild(tr);
    })


}