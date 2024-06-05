import express from "express";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

const port = 8080;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

