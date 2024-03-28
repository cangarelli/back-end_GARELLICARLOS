const { Faker, fakerES, es } = require('@faker-js/faker');

const spanishFaker = new Faker({
    locale: [es],
});

const generateProduct = () => {
    return {
        title: spanishFaker.commerce.productName(),
        price: spanishFaker.commerce.price(),
        description: spanishFaker.commerce.productAdjective(),
        stock: Number(spanishFaker.string.numeric(1)),
        _id: spanishFaker.database.mongodbObjectId(),
        image: spanishFaker.image.url(),
    };
};

const generateUser = () =>{
    return{
        first_name: spanishFaker.person.firstName(),
        last_name: spanishFaker.person.lastName(),
        email: `${spanishFaker.person.lastName()}@gmail.com`,
        age: 33,
        password: spanishFaker.internet.password({ length: 10 })
    }
}

module.exports = {
    generateProduct,
    generateUser,
};
