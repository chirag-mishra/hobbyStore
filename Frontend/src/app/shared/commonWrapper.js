isLoggedIn= () =>{
  let userID ="sanant@gmail.com";
  return userID;
}

scrollToElement = (id) => {
    document.querySelector('#'+id).scrollIntoView({
      behavior: 'smooth'
    });
  }

var apiRoot = "http://d5f19f74.ngrok.io";

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  apiRoot
}