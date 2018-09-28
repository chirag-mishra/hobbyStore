isLoggedIn= () =>{
  let userID ="sanant@gmail.com";
  return userID;
}

scrollToElement = (id) => {
    document.querySelector('#'+id).scrollIntoView({
      behavior: 'smooth'
    });
  }

var apiRoot = "http://da8f64a4.ngrok.io";

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  apiRoot
}