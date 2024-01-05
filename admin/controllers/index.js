const api = new Api();

function getEle(id) {
  return document.getElementById(id);
}

function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    const product = data[i];
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
                <img src="${product.img}" width="50" />
            </td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${product.id
      })">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id
      })">Delete</button>
            </td>
        </tr>
    `;
  }
  getEle("tblDanhSachSP").innerHTML = content;
}

function getListProduct() {
  const promise = api.fetchData();

  promise
    .then(function (result) {
      const sortedData = result.data.sort((a, b) => b.price - a.price); // Sorting in descending order
      renderUI(sortedData); // Call renderUI with sorted data
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

/**
 * Delete Product
 */
function deleteProduct(id) {
  const promise = api.deleteData(id);
  promise
    .then(function () {
      //show info
      alert("Delete Success!");
      //re-fetch data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  // Update title => header model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";
  // Create button "Add Product" => footer modal
  const btnAdd = `<button class="btn btn-primary" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

/**
 * Add Product
 */
function addProduct() {
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const des = getEle("MoTa").value;
  const screen = getEle("ManHinhSP").value;
  const backCam = getEle("CameraSauSP").value;
  const frontCam = getEle("CameraTruocSP").value;
  const type = getEle("PhanLoaiSP").value;

  var imageName = "";
  const image = getEle("HinhSP");
  if (image && image.files.length > 0) {
    imageName = image.files[0].name;
  }

  // tạo đối tượng từ lớp đối tượng Product
  const product = new Product("", name, price, screen, backCam,   frontCam, imageName, des, type);

  const promise = api.createData(product);

  promise
    .then(function () {
      alert("Add Success!");
      //re-fetch data
      getListProduct();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Edit Product
 */
function editProduct(id) {
  // Update title => header model
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Update Product";
  // Create button "Update Product" => footer modal
  const btnUpdate = `<button class="btn btn-primary" onclick="updateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  //lấy thông tin chi tiết product => hiển thị ra các thẻ input
  const promise = api.getProductById(id);
  promise
    .then(function (result) {
      const product = result.data;
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("MoTa").value = product.description;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateProduct(id) {
  // Get updated product details from the input fields
  const updatedName = getEle("TenSP").value;
  const updatedPrice = getEle("GiaSP").value;
  const updatedDescription = getEle("MoTa").value;
  let updatedImageName = "";
  const image = getEle("HinhSP");

  // Check if a new image was selected for the product
  if (image && image.files.length > 0) {
    updatedImageName = image.files[0].name;
  }

  const updatedProduct = {
    id: id,
    name: updatedName,
    price: updatedPrice,
    image: updatedImageName, // Ensure this matches the key expected by your backend
    description: updatedDescription
  };

  // Call the API to update the product
  api.updateProductById(id, updatedProduct)
    .then(function () {
      alert("Product updated successfully.");

      getListProduct();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/** 
 * Search Product by Item
 */
getEle("searchInput").addEventListener('keyup', searchProduct);

function searchProduct() {
  const searchValue = getEle("searchInput").value.toLowerCase(); // lowecase to prevent case sensitive

  const promise = api.fetchData(); // Fetch all products

  promise
    .then(function (result) {
      // Filter products based on the searchValue
      const filteredData = result.data.filter(product =>
        product.name.toLowerCase().includes(searchValue)
      );
      renderUI(filteredData); // Render the UI with filtered data
    })
    .catch(function (error) {
      console.log(error);
    });
}
