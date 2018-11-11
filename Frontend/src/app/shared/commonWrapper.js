isLoggedIn = () => {
  let userID = "sanat@hobbyfare.com";
  return userID;
}

scrollToElement = (id) => {
  document.querySelector('#' + id).scrollIntoView({
    behavior: 'smooth'
  });
}

var apiRoot = "http://8aa46596.ngrok.io";

getUserDetails = (userId, next) => {
  let user;
  fetch(commonWrapper.apiRoot + '/getUserById', {
    method: 'post',
    body: JSON.stringify({ "emailId": userId }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      user = data;
      next(user);
    }).catch(function (error) {
      user = undefined;
      next(user);
    });
}

updateCart = (userParams, next) => {
  //let jsonParams = { "emailId": user.emailId, "product": { "productId": user.productId, "quantity": user.quantity } };
  let user;
  fetch(commonWrapper.apiRoot + '/updateCart', {
    method: 'post',
    body: JSON.stringify(userParams),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      user = data;
      next(user);
    }).catch(function (error) {
      user = undefined;
      next(user);
    });
}

calculateTotalQuantity = (cart) => {
  let totalQuantity = 0;
  if (cart.length != 0) {
    for (let item of cart) {
      totalQuantity += item.quantity;
    }
  }
  return totalQuantity;
}

addItemToCart = (productId, parent, byNowStatus) => {
  let loggedUserId = commonWrapper.isLoggedIn();
  parent.showUpdateSpinner = true;
  let userObject;
  if (loggedUserId != "" && loggedUserId != undefined) {
    userObject = { "emailId": loggedUserId, "product": { "productId": productId, "quantity": 1 } };
    commonWrapper.updateCart(userObject, function (success) {
      commonWrapper.getUserDetails(loggedUserId, function (userdetails) {
        parent.userdetails = userdetails;
        parent.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(parent.userdetails.cart));
        parent.showUpdateSpinner = false;
        if(byNowStatus){
          parent.router.navigate(['cart']);
        }
      });
    });
  }
  else {
    localStorageWrapper.addToCart({ "productId": productId, "quantity": 1 });
    let cartdetails = localStorageWrapper.getCart();
    parent.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(cartdetails));
    parent.showUpdateSpinner = false;
    if(byNowStatus){
      parent.router.navigate(['cart']);
    }
  }
}

updateProductinCart = (loggedInUserID, productId, quantity, parent) => {
  userObject = { "emailId": parent.loggedInUserID, "product": { "productId": parentthis.userdetails.cart[index].productId, "quantity": -1 * this.userdetails.cart[index].quantity } };
  commonWrapper.updateCart(userObject, function (success) {
    commonWrapper.getUserDetails(parent.userID, function (userdetails) {
      parent.userdetails = userdetails;
      parent.userdata.changecartvalue(commonWrapper.calculateTotalQuantity(parent.userdetails.cart));

      if (parent.userdetails.cart.length != 0) {
        parent.calculateTotal();
      }
      else { parent.noItem = true; }

      parent.showUpdateSpinner = false;
      parent.removeCartItem = false;
    });
  });
}

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  getUserDetails,
  updateCart,
  calculateTotalQuantity,
  apiRoot,
  addItemToCart,
  updateProductinCart
}