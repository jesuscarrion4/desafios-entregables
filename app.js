const express = require('express');
const ProductManager = require('./index.js'); // Actualiza la ruta

const app = express();
const port = 3000; 

const productManager = new ProductManager('./data.json'); 

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);

    try {
        const products = await productManager.getProducts();

        if (!isNaN(limit)) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);

    try {
        const product = await productManager.getProductById(productId);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});