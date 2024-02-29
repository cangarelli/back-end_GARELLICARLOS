const { Faker, fakerES, es } = require ('@faker-js/faker')

const spanishFaker = new Faker({
    locale: [es]
});

const generateProduct = () => {
    return {
        title: spanishFaker.commerce.productName(),
        price: spanishFaker.commerce.price(),
        description: spanishFaker.commerce.productAdjective(),
        stock: Number(spanishFaker.string.numeric(1)), 
        _id: spanishFaker.database.mongodbObjectId(),
        image: spanishFaker.image.url(),

    }
}

module.exports = {
    generateProduct
}