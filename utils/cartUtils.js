exports.getTotalPrice = (cart, products) => {
    return cart.reduce((acc, cur) => {
        const product = products.findIndex(p => p.id === cur.identifier);
        return acc + parseInt(products[product].price) * cur.quantity;
    }, 0);
}