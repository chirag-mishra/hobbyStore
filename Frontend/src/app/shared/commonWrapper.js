isLoggedIn = () => {
  let userID = "sanat@hobbyfare.com";
  return userID;
}

scrollToElement = (id) => {
  document.querySelector('#' + id).scrollIntoView({
    behavior: 'smooth'
  });
}

var apiRoot = "http://4787759c.ngrok.io";

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
      console.log("user details \n",user);
      next(user);
    });
}

updateCart = (user, next) => {
  let jsonParams = { "emailId": user.emailId, "product": { "productId": user.productId, "quantity": user.quantity } };
  let user;
  fetch(commonWrapper.apiRoot + '/updateCart', {
    method: 'post',
    body: JSON.stringify(jsonParams),
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
  if (cart != null && cart != undefined) {
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