const api = new Api();

function getEle(id) {
  return document.getElementById(id);
}
let data = [];
function getListProduct() {
  // pending => show loader

  document.getElementById("loader").style.display = "block";
  const promise = api.fetchData();

  promise
    .then(function (result) {
      // console.log("result", result.data);
      data = result.data;
      // renderUI(result.data);
      // lastrenderUI(result.data);
      //hide loader
      onChangeOptionProduct();
      getEle("loader").style.display = "none";
    })
    .catch(function (error) {
      // console.log("error", error);
      getEle("loader").style.display = "none";
    });
}

getListProduct();
function lastrenderUI(data) {
  if (data.length > 0) {
    let newData = onChangeOptionProduct();
    renderUI(newData);
  }
}
function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    const product = data[i];
    content += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card cardPhone">
              <img src="${product.img}" class="card-img-top" alt="..." />
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h3 class="cardPhone__title">${product.name}</h3>
                    <p class="cardPhone__text">${product.description}</p>
                  </div>
                  <div>
                    <h3 class="cardPhone__title">${product.price}</h3>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="cardPhone__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div>
                    <button class="btnPhone-shadow" onclick="handleCart('${product.id}')" >
                      <i class="fa fa-shopping-cart""></i> Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
  }

  document.getElementById("productList").innerHTML = content;
}
let newCart = [];
function handleCart(id) {
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      const dataTemp = data[i];
      if (dataTemp.id === id) {
        newCart.push(dataTemp);
      }
    }

    setLocalStorage(newCart);
    return newCart;
  }
}
function showCart() {}
function setLocalStorage(data) {
  // convert data JSON=>String
  const dataString = JSON.stringify(data);
  // lưu
  localStorage.setItem("items", dataString);
}

function onChangeOptionProduct() {
  const optionSelected = getEle("form-select").value;
  if (data.length > 0) {
    const cloneData = [...data];
    let newArray = [];
    if (optionSelected === "all") {
      return renderUI(cloneData);
    } else {
      for (var i = 0; i < cloneData.length; i++) {
        const newProduct = cloneData[i];
        // console.log(newProduct);
        if (newProduct.type === optionSelected) {
          newArray.push(newProduct);
        }
      }
    }
    return renderUI(newArray);
    // return newArray;
  }
}
