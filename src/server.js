import express from "express";
import productRoutes, { productManager } from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewRoutes from "./routes/view.routes.js";
import { Server } from "socket.io";
import __dirname from "./dirname.js"
import handlebars from "express-handlebars";
import path from "path";
    
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
}));

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use("/", viewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);



const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

export const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.emit("products", productManager.getProducts());
});

