class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    generateUniqueId() {
      
      return Math.random().toString(36).substr(2, 9);
    }
  
    addProduct(productData) {
      const { title, description, price, thumbnail, code, stock } = productData;
  
      
      if (this.products.some(product => product.code === code)) {
        throw new Error('El código del producto ya está en uso.');
      }
  
      
      const id = this.generateUniqueId();
  
      
      const newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      
      this.products.push(newProduct);
  
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        throw new Error('Producto no encontrado.');
      }
      return product;
    }
  }
  
  const productManager = new ProductManager();
  
  const products = productManager.getProducts();
  console.log(products); // []
  
  const newProduct = productManager.addProduct({
    title: 'cafe americano',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  });
  console.log(newProduct);
  

  const updatedProducts = productManager.getProducts();
  console.log(updatedProducts);
  
 