

isLoggedIn = () => {
  let userID = "sanat@hobbyfare.com";
  return userID;
}

scrollToElement = (id) => {
  document.querySelector('#' + id).scrollIntoView({
    behavior: 'smooth'
  });
}

var apiRoot = "http://7340d640.ngrok.io";

getUserDetails = (userId, next) => {
  let user;
  fetch(commonWrapper.apiRoot + '/getUserById', {
    method: 'post',
    body: JSON.stringify({ "emailId": userId }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .catch(function (error) {
      console.log("error");
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      user = data;
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

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  getUserDetails,
  updateCart,
  calculateTotalQuantity,
  apiRoot
}