const fs = require('fs');

class ProductManager {
    constructor (path) {
        this.products = []
        this.path = path;
    }

    addProduct (data) {
        if (!data.title || !data.description || data.price || data.thumbnail || data.code || data.stock ) {
            return "campos no validos"
        }

    const productExists = this.products.findIndex((product) =>  product.code === data.code)
    if (productExists !== -1) {
        return "error: codigo ya esta en uso"
    }

    product.id = this.products.length + 1;
    this.products.push(product);

    this.guardarProductos();
    console.log("se ha agregado correctamente");


    }
    getProducts () {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
              if (err) {
                console.error('Error al leer los productos:', err);
                return reject(err);
              }
              if (data === '') {
                return resolve([]);
              }
              const products = JSON.parse(data);
              return resolve(products);
            });
          });
    }

    getProductById(id) {
        return this.getProducts()
      .then((products) => {
        const product = products.find((product) => product.id === id);
        return product;
      })
      .catch((e) => {
        console.log('Error al obtener el producto:', e);
        return e;
      });
    }
    updateProduct(id, updateProduct) {
        this.getProducts()
          .then((products) => {
            const productIndex = products.findIndex((product) => product.id === id);
    
            if (productIndex === -1) {
              return;
            }
    
            products[productIndex].title = updateProduct.title;
            products[productIndex].description = updateProduct.description;
            products[productIndex].price = updateProduct.price;
            products[productIndex].thumbnail = updateProduct.thumbnail;
            products[productIndex].code = updateProduct.code;
            products[productIndex].stock = updateProduct.stock;
    
            this.guardarProductos(products);
            console.log('Producto actualizado');
          })
          .catch((e) => {
            console.log('Error al obtener el producto:', e);
            return e;
          });
      }
    
      deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
          return console.log('Producto no encontrado');
        }
    
        this.products.splice(productIndex, 1);
        this.guardarProductos();
    
        console.log('Producto eliminado');
      }
    
      leerProductos() {
        try {
          const data = fs.readFileSync(this.path, 'utf-8');
          if (data === '') {
            console.log(data);
            return [];
          }
          return JSON.parse(data);
        } catch (err) {
          console.error('Error al leer los productos:', err);
          return [];
        }
      }
    
      guardarProductos(products) {
        try {
          const data = JSON.stringify(products || this.products, null, 2);
          fs.writeFileSync(this.path, data, 'utf-8');
          console.log('Productos guardados correctamente');
        } catch (err) {
          console.log('Error al guardar los productos');
        }
      }
}

const manager = new ProductManager('./data.json');

manager.addProduct({
    title: "Cafe en granos",
    description: "Americano",
    price: 2.99,
    thumbnail: "img/cafe.jpg",
    code: "5678",
    stock: 10,
});

manager.getProducts()
  .then((products) => {
    console.log(products);
  })
  .catch((err) => {
    console.error('Error al obtener los productos:', err);
  });

manager.getProductById(1)
  .then((product) => {
    console.log(product);
  })
  .catch((err) => {
    console.error('Error al obtener el producto:', err);
  });

manager.updateProduct(1, {
  title: "Cafe",
  description: "Granos molidos",
  price: 3.99,
  thumbnail: "img/cafe-img.jpg",
  code: "5678",
  stock: 5,
});

manager.deleteProduct(2);