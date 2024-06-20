import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";
import {io} from "../server.js";

const router = Router();

const productManager = new ProductManager("./data/products.json");


//GET products
//Obtener todos los productos
router.get('/', (req, res) => {
   res.json(productManager.getProducts());

});


//GET products/:id
//Obtener producto por id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = productManager.getProductById(parseInt(id));
    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }
   
    res.json(product);
})

//POST products
//Crear producto
router.post('/', (req, res) => {

    console.log(req.body);
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

    io.emit('products', productManager.getProducts());
    
    res.status(201).json({
        message: "Producto agregado correctamente"
    })

});


//PUT products
//ACTUALIZAR  PRODUCTO
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedProduct = await productManager.updateProductStock(parseInt(id), updatedFields);
    if(updatedProduct){
        io.emit('products', productManager.getProducts());
        res.json(updatedProduct);
    } else {
        res.status(404).json({
            error: "No se pudo actualizar el producto"
        })
    }
});


/// DELETE products
router.delete('/:id', (req, res) => {
                    
    const { id } = req.params;

    if(isNaN(id)){
        return res.status(400).json({
            error: "El id debe ser un numero"
        })
    }
    
    const productoBorrado = productManager.deleteProductById(parseInt(id));

    if(productoBorrado) {
        io.emit('products', productManager.getProducts());
        res.json({
            message: "Producto eliminado correctamente"
        })
    } else {
        res.status(404).json({
            error: "No se pudo eliminar el producto"
        })
    }
});

export default router;

export { productManager };