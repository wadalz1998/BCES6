let arrayCart = [];
function getLocalStorage() {
  const dataString = localStorage.getItem("items");
  if (!dataString) return;
  //   convert dataJSON

  const dataJSON = JSON.parse(dataString);
  //   phục hồi array
  arrayCart = dataJSON;
  //   renderCart(arrayCart);
  showCart(arrayCart);
}
function showCart(arrayCart) {
  var content = "";
  if (arrayCart) {
    for (var i = 0; i <= arrayCart.length; i++) {
      var data = [];
      data = arrayCart[i];
      if (data !== undefined) {
        content += `<tr>
          <td>${data.name}</td>
          <td>${data.price}</td>
          <td class="cart__img">
          <img src="${data.img}" class="card-img-top" alt="..." />
          </td>
          <td>
          <div class="product-quantity">
          <input id="priceCart" type="number" value="1" min="1">
        </div>
        </td>
          <td>
            <button class="btn btn-danger" onclick="handleDeleteCart('${
              data.id
            }')">Xóa</button>
                 <button class="btn btn-primary" onclick="handleCheckout('${
                   data.id
                 }')">Thanh Toán</button>
        </td>
      </tr>`;
      }
    }
    document.getElementById("tableDanhSach").innerHTML = content;
  }
}
function priceProduct(price) {
 
}
function handleDeleteCart(id) {
  if (arrayCart) {
    for (var i = 0; i < arrayCart.length; i++) {
      const dataTemp = arrayCart[i];
      if (dataTemp.id === id) {
        arrayCart.splice(i, 1);
      }
      setLocalStorage(arrayCart);
      showCart(arrayCart);
      return arrayCart;
    }
  }
}
getLocalStorage();
