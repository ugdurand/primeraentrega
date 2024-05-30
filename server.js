import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();

const productManager = new ProductManager("./data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = 8080;

app.get('/products', (req, res) => {
    res.json(productManager.getProducts());
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = productManager.getProductById(id);
    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }
    res.json(product);
})

app.post('/products', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({
            error: "Faltan datos"
        })
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }

    productManager.addProduct(newProduct);
    
    res.status(201).json({
        message: "Producto agregado correctamente"
    })

});


//PUT products
//ACTUALIZAR PRODUCTO

app.put('/products/:id', (req, res) => {

    const { id } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    const productIndex = products.findIndex(product => product.id == id);

    if (productIndex === -1) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    const product = products[productIndex];

    //Buscamos que no falten datos
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({
            error: "Faltan datos"
        })
    }



});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

