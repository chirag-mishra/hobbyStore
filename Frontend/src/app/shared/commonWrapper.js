isLoggedIn= () =>{
  let userID ="sanant@gmail.com";
  return userID;
}

scrollToElement = (id) => {
    document.querySelector('#'+id).scrollIntoView({
      behavior: 'smooth'
    });
  }

var apiRoot = "http://f2030b37.ngrok.io"

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  apiRoot
}