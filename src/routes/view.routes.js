import {Router} from 'express';
import { productManager } from './product.routes.js';


const router = Router();

router.get("/", (req, res) => {

    const products = productManager.getProducts();
    res.render("index", {products});
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});

export default router;