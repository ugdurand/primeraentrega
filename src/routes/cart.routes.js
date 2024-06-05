import { Router } from "express";
import CartManager from "../manager/CartManager.js";

const router = Router();
const cartManager = new CartManager("./data/carts.json");


//GET carts
//Obtener todos los productos del carrito id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const cart = cartManager.getCartById(parseInt(id));

    if (!cart) {
        return res.status(404).json({
            error: "Carrito no encontrado"
        })
    }

    res.json(cart);
});

//POST carts
//Crear carrito
router.post('/', (req, res) => {

    const { products } = req.body;

    // Validar que el array de productos no esté vacío
    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            error: "El carrito debe contener al menos un producto"
        });
    }

    try {
        const newCart = cartManager.addCart(products);
        res.status(201).json({
            message: "Carrito creado correctamente",
            cart: newCart
        });
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }

});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const cart = cartManager.getCartById(parseInt(cid));

    if (!cart) {
        return res.status(404).json({
            error: "Carrito no encontrado"})
    }
    
    cartManager.addProductToCart(parseInt(cid), parseInt(pid));
    res.json({
        message: "Producto agregado al carrito",
        cart: cart
    })
});

export default router;