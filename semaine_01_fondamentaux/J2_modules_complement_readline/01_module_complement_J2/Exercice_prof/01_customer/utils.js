exports.priceTTC = function (product, price, tva = 0.055) {
  let parsed_price = parseFloat(price);

  if (isNaN(parsed_price)) {
    console.error(`Le prix ${price} du produit ${product} n'est pas un nombre`);
  }

  return Math.floor((1 + tva) * parsed_price * 100) / 100;
};
