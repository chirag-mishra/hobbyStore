//product {"productId" : "id", "quantity" : "qty"}
ls_addToCart = (product) => {
    fetch(commonWrapper.apiRoot + '/getProductById/' + product.productId)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            product.price = response.price;
            product.title = response.title;
            product.img = response.imgUrl;
            product.discount = response.discount;
            product.rating = response.rating;
            product.category = response.category;
            product.genre = response.genre;
            product.imgUrls = response.imgUrls;

            if (!localStorage.getItem("cart")) {
                let cart = [];
                cart.push(product);
                localStorage.setItem("cart", [JSON.stringify(cart)]);
            }
            else if (!cartContains(product.productId)) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            else {
                let cart = JSON.parse(localStorage.getItem("cart"));
                for (singleProduct of cart) {
                    if (singleProduct.productId == product.productId)
                        singleProduct.quantity += product.quantity;
                }
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        });
}

ls_increaseQuantity = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (singleProduct of cart) {
        if (singleProduct.productId == productId)
            singleProduct.quantity++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

ls_decreaseQuantity = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let toRemove = null;
    for (singleProduct of cart) {
        if (singleProduct.productId == productId) {
            singleProduct.quantity--;
            if (singleProduct.quantity == 0)
                toRemove = singleProduct;
            break;
        }
    }
    if (toRemove)
        cart.splice(cart.indexOf(toRemove), 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

ls_removeItemFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let toRemove = null;
    for (singleProduct of cart) {
        if (singleProduct.productId == productId) {
            toRemove = singleProduct;
            break;
        }
    }
    if (toRemove)
        cart.splice(cart.indexOf(toRemove), 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

ls_cartContains = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (product of cart) {
        if (product.productId == productId)
            return true;
    }
    return false;
}

ls_getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart;
}

getRequest = (url, next) => {
    
}

localStorageWrapper = {
    //product {"productId" = "id", "quantity" = "qty"}
    addToCart: ls_addToCart,
    increaseQuantity: ls_increaseQuantity,
    decreaseQuantity: ls_decreaseQuantity,
    removeItemFromCart: ls_removeItemFromCart,
    getCart : ls_getCart
}