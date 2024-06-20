import fs from 'fs';


class CartManager {

    constructor(path) {
        this.path = path;

        if (fs.existsSync(path)) {
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            }
            catch (error) {
                console.log(error);
                this.carts = [];
            }

        } else {
            this.carts = [];
        }
    }

    getCarts(){
        return this.carts;
    }

    getCartById(id) {
        const cart = this.carts.find(cart => cart.id === id);
        return cart;
    }

    addCart(products) {
        const carts = this.getCarts();

        const newCart = {
            //Verificamos cual es el proximo id. Si ya hay carritos sumamos uno al ultimo
            //caso contrario (no carritos) devolver id = 1
            id: carts.length ? carts[carts.length - 1].id + 1 : 1,
            products
        };

        carts.push(newCart);
        this.saveCarts(carts);
        return newCart;
    }

    saveCarts(carts) {

        try {
            fs.writeFileSync(this.path, JSON.stringify(carts, null, "\t"));
            console.log('Carrito agregado');
        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart(cartId, productId) {
        const cart = this.carts.find(cart => cart.id === cartId);

        if (cart) {
            const product = cart.products.find(product => product.id === productId);

            if (product) {
                product.quantity++;
            } else {
                console.log('Producto agregado al carrito');
                cart.products.push({ id: productId, quantity: 1 });
            }
        }

        this.saveCarts(this.carts);
    }
}
export default CartManager;