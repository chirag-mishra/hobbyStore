isLoggedIn= () =>{
  let userID ="";
  return userID;
}

scrollToElement = (id) => {
    document.querySelector('#'+id).scrollIntoView({
      behavior: 'smooth'
    });
  }

var apiRoot = "http://db31bac8.ngrok.io"

commonWrapper = {
  scrollToElement,
  isLoggedIn,
  apiRoot
}