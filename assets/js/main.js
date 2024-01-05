
/* Sidebar Mini */
var toggleBtn = document.querySelector('.sidebarMini__button');
var sidebarMini = document.querySelector('.sidebarMini');
var switchBtn = document.querySelector('#checkbox');

toggleBtn.addEventListener('click',function(){
    sidebarMini.classList.toggle('is-opened');
});

switchBtn.addEventListener('click',function(){
    document.querySelector('body').classList.toggle('darkMode');
});

document.getElementById('adminButton').addEventListener('click', function() {
    window.location.href = 'admin/views'; // Adjust the path as needed
  });
  