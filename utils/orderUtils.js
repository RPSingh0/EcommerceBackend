exports.updatedCartWithOrder = (cart, order) => {
    return cart.filter(cartItem => {
        const purchasedItem = order.find(orderItem => orderItem.identifier === cartItem.identifier);
        if (purchasedItem) {
            if (purchasedItem.quantity < cartItem.quantity) {
                cartItem.quantity = cartItem.quantity - purchasedItem.quantity;
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    })
};