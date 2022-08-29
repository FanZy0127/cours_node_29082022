const u = require('./utils');

const { priceTTC } = u;

const products = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 'zob', priceTTC : null },
    { name : "Rasberry", priceHT : 2.5, priceTTC : null },
];

for(const product of products){
    product.priceTTC = priceTTC(product.name, product.priceHT)
}

console.table(products);