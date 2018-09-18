isLoggedIn= () =>{
  let userID ="";
  return userID;
}

scrollToElement = (id) => {
    document.querySelector('#'+id).scrollIntoView({
      behavior: 'smooth'
    });
  }

var apiRoot = "http://50fc6186.ngrok.io"

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  apiRoot
}