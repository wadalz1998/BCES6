function Api() {
  this.fetchData = function () {
    const promise = axios({
      url: "https://6576fb1c197926adf62ceeb1.mockapi.io/api/products",
      method: "GET",
    });

    return promise;
  };
}
