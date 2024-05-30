import fs from 'fs';

class Product {
    constructor(title, description, price, thumbnail, code, stock, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = true;
        this.category = category;
    }
}



class ProductManager {
    constructor(path) {
        this.path = path;

        if (fs.existsSync(path)) {
            try {
                this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            }
            catch (error) {
                console.log(error);
                this.products = [];
            }

        } else {
            this.products = [];
        }
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnails || !product.code || !product.stock || !product.category) {
            console.log('Faltan datos obligatorios');
            return;
        }
        if (this.products.some(prod => prod.code === product.code)) {
            console.log('El codigo ya existe');
            return;
        }

        if (this.products.length > 0) {
            const newId = this.products[this.products.length - 1].id + 1;
            product.id = newId;
        } else {
            product.id = 1;
        }

        this.products.push(product);

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
            console.log('Producto agregado');
        } catch (error) {
            console.log(error);
        }
    }

    getProducts() {
        return this.products;

    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);
        if (!product) {
            console.log('No se encontro el producto');
            return;
        }
        return product;
    }

    deleteProductById(id) {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        if (productIndex === -1) {
            console.log('No se encontro el producto');
            return;
        }
        this.products.splice(productIndex, 1);
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
            console.log('Producto eliminado');
        } catch (error) {
            console.log(error);
        }
    }

    updateProductById(id, newProduct) {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        if (productIndex === -1) {
            console.log('No se encontro el producto');
            return;
        }

        const oldProduct = this.products[productIndex];

        this.products[productIndex] = {
            ...oldProduct,
            ...newProduct
        }

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
            console.log('Producto actualizado');
        } catch (error) {
            console.log(error);
        }
    }

}

export default ProductManager;