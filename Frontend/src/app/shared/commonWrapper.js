isLoggedIn= () =>{
  let userID ="sanant@gmail.com";
  return userID;
}

scrollToElement = (id) => {
    document.querySelector('#'+id).scrollIntoView({
      behavior: 'smooth'
    });
  }

var apiRoot = "http://47de2d45.ngrok.io";

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  apiRoot
}