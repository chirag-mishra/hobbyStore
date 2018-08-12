//product {"_id" : "id", "quantity" : "qty"}
 addToCart = (product) => {

    if (!localStorage.getItem("cart")) {
        let cart = [];
        cart.push(product);
        localStorage.setItem("cart", [JSON.stringify(cart)]);
    }
    else if (!cartContains(product._id)) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        for (singleProduct of cart) {
            if (singleProduct._id == product._id)
                singleProduct.quantity += product.quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return "added to cart";
}

increaseQuantity = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (singleProduct of cart) {
        if (singleProduct._id == product._id)
            singleProduct.quantity++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

decreaseQuantity = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let toRemove = null;
    for (singleProduct of cart) {
        if (singleProduct._id == productId)
            {
                singleProduct.quantity--;
                if(singleProduct.quantity == 0)
                    toRemove = singleProduct;
                break;
            }
    }
    if(toRemove)
        cart.splice(cart.indexOf(toRemove),1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

removeItemFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let toRemove = null;
    for (singleProduct of cart) {
        if (singleProduct._id == productId)
            {
                toRemove = singleProduct;
                break;
            }
    }
    if(toRemove)
        cart.splice(cart.indexOf(toRemove),1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

cartContains = (_id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (product of cart) {
        if (product._id == _id)
            return true;
    }
    return false;
}

addToCart({ "_id": 2, quantity: 5 });