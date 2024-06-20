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

    async updateProductStock(id, updatedFields) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            //No se encontro el producto
            return;
        }

        try {
            const product = products[productIndex];
            products[productIndex] = { ...product, ...updatedFields };
            fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
            
            return products[productIndex];
        } catch (error) {
            console.log(error);
            return;
        }
    }
    
    deleteProductById(id) {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        if (productIndex === -1) {
            //No se encontro el producto
            return false;
        }

        try {
            this.products.splice(productIndex, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

export default ProductManager;