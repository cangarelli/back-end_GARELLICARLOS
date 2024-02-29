const { Faker, fakerES, es } = require ('@faker-js/faker')

const spanishFaker = new Faker({
    locale: [es]
});

const generateProduct = () => {
    return {
        title: spanishFaker.commerce.productName(),
        price: spanishFaker.commerce.price(),
        description: spanishFaker.commerce.description(),
        stock: spanishFaker.random.numeric(1),
        _id: spanishFaker.database.mongodbObjectId(),
        image: spanishFaker.image.image(),
    }
}

module.exports = {
    generateProduct
}