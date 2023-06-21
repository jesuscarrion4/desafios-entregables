class productManager {
    constructor () {
        this.products = []
    }

    addproduct (data) {
        if (!data.title || !data.description || data.price || data.thumbnail || data.code || data.stock ) {
            return "campos no validos"
        }

    const productExists = this.products.findIndex((product) =>  product.code === data.code)

    if (productExists !== -1) {
        return "error: codigo ya esta en uso"
    }

    const product ={
        id: this.products.length +1,
        title: data.title,
        description: data.description, 
        price: data.price,
        thumbnail: data.thumbnail, 
        code: data.code, 
        stock: data.stock, 
    }

    this.products.push(product)

    return product


    }
    getProducts () {
        return this.products
    }

    getProductById(id) {
        const productExists = this.products.find((product) =>  product.id === id)
        if(!productExists){
            const error = "not found"
            console.log(error)
            return error
        }

        return productExists

    }
}