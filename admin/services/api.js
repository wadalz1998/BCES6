function Api() {
  this.fetchData = function () {
    const promise = axios({
      url: "https://6576fb1c197926adf62ceeb1.mockapi.io/api/products",
      method: "GET",
    });
    return promise;
  };

  this.deleteData = function (id) {
    const promise = axios({
      url: `https://6576fb1c197926adf62ceeb1.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
    return promise;
  };

  this.createData = function (product) {
    const promise = axios({
      url: `https://6576fb1c197926adf62ceeb1.mockapi.io/api/products`,
      method: "POST",
      data: product,
    });
    return promise;
  };

  this.getProductById = function (id) {
    const promise = axios({
      url: `https://6576fb1c197926adf62ceeb1.mockapi.io/api/products/${id}`,
      method: "GET",
    });
    return promise;
  };

  this.updateProductById = function (id, product) {
    const promise = axios({
      url: `https://6576fb1c197926adf62ceeb1.mockapi.io/api/products/${id}`,
      method: "PUT",
      data: product
    });
    return promise;
  };

}
