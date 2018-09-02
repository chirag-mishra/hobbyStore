

scrollToElement = (id) => {
    document.querySelector('#'+id).scrollIntoView({
      behavior: 'smooth'
    });
  }

commonWrapper = {
  scrollToElement,
  test : function () {
    console.log("tested");
  }
}