const currentPath = window.location.href.split('?')[1];
const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD'
});

obtener_productos().then(data => {
   switch (currentPath) {
      case 'shoes':
         data = data.filter(p => p.categoria == 1);
         break;
      case 'clothing':
         data = data.filter(p => p.categoria == 2);
         break;
      case 'sport':
         data = data.filter(p => p.categoria == 3);
         break;
      case 'home':
         data = data.filter(p => p.categoria == 4);
         break;
   }
   cargar_Cards_Productos(data);
});

// Funcion para obtener lista de productos
async function obtener_productos() {
   try {
      const respuesta = await fetch('../assets/data-products.json');
      const data = await respuesta.json();
      return data;
   } catch (error) {
      console.error('Error al obtener lista de productos', error);
   }
}

function cargar_Cards_Productos(listaProductos) {
   const productsList = document.getElementById('products-list');
   const productTemplate = document.getElementById('product_template');

   listaProductos.forEach(producto => {
      const tarjetaOriginal = productTemplate.cloneNode(true);
      tarjetaOriginal.classList.remove('d-none');
      tarjetaOriginal.classList.add('product__card');
      tarjetaOriginal.id = `product-card-${producto.id}`;

      tarjetaOriginal.querySelector('img').src = producto.rutaFoto == '' ? '../assets/images/no-image.jpg' : producto.rutaFoto;
      tarjetaOriginal.querySelector('.product__brand').textContent = producto.marca;
      tarjetaOriginal.querySelector('h2').textContent = producto.nombreProducto;
      tarjetaOriginal.querySelector('.card__price').textContent = formatter.format(producto.precioConTarjeta);
      tarjetaOriginal.querySelector('.discount__price').textContent = formatter.format(producto.precioConDescuento);
      tarjetaOriginal.querySelector('.regular__price').textContent = formatter.format(producto.precioRegular);
      tarjetaOriginal.querySelector('.add__car__btn').data_id = producto.id;

      productsList.appendChild(tarjetaOriginal);
   });
}
let cart = [];
let totalPrice = 0;

// Alternar favoritos
function toggleFavorite(button) {
   const icon = button.querySelector('.material-icons');
   icon.textContent = icon.textContent === 'favorite_border' ? 'favorite' : 'favorite_border';
   icon.title = icon.textContent === 'favorite' ? 'Quitar de favoritos' : 'Agregar a favoritos';
   if (icon.textContent === 'favorite') {
      icon.style.color = 'red'
   }
   else {
      icon.style.color = 'black'
   }
}

function buscarProductos(event, formElement) {
   event.preventDefault();
   const valorBusqueda = formElement.querySelector('.search__input').value;
   obtener_productos().then(data => {
      const containerProducts = document.getElementById('products-list');
      const productCards = containerProducts.querySelectorAll('.product__card');
      productCards.forEach(p => p.remove());
      data = data.filter(p => p.nombreProducto.toLowerCase().includes(valorBusqueda.toLowerCase()) || p.marca.toLowerCase().includes(valorBusqueda.toLowerCase()));
      cargar_Cards_Productos(data);
      const search = document.getElementById('search').classList.remove('show-search');
   });
}
function deleteItem(id) {
   obtener_productos().then(data => {
      const cartContainer = document.getElementById('items-shopping-cart-container');
      const emptyCart = cartContainer.querySelector('.empty__cart');
      document.getElementById(`product-item-${id}`).remove();
      document.getElementById(`product-card-${id}`).classList.remove('product__in__shopping__car');
      cart = cart.filter(p => p.id !== id);
      const totalPDescuento = cart.reduce((suma, producto) => {
         return suma + producto.precioConDescuento;
      }, 0);
      const totalPRegular = cart.reduce((suma, producto) => {
         return suma + producto.precioRegular;
      }, 0);
      document.getElementById('subtotal-shopping-cart').textContent = formatter.format(totalPRegular);
      document.getElementById('descuentos-shopping-cart').textContent = formatter.format(totalPRegular - totalPDescuento);
      document.getElementById('total-shopping-cart').textContent = formatter.format(totalPDescuento);
      document.getElementById('cart-counter').textContent = cart.length;
      if (cart.length == 0) {
         emptyCart.classList.remove('d-none');
      }
   });
}

function removeItem(id) {
   obtener_productos().then(data => {
      let productInCart = cart.find(p => p.id == id);
      productInCart.count = productInCart.count - 1;
      const product = data.find(p => p.id == id);
      productInCart.precioConTarjeta = product.precioConTarjeta * productInCart.count;
      productInCart.precioConDescuento = product.precioConDescuento * productInCart.count;
      productInCart.precioRegular = product.precioRegular * productInCart.count;
      const totalPDescuento = cart.reduce((suma, producto) => {
         return suma + producto.precioConDescuento;
      }, 0);
      const totalPRegular = cart.reduce((suma, producto) => {
         return suma + producto.precioRegular;
      }, 0);
      document.getElementById('subtotal-shopping-cart').textContent = formatter.format(totalPRegular);
      document.getElementById('descuentos-shopping-cart').textContent = formatter.format(totalPRegular - totalPDescuento);
      document.getElementById('total-shopping-cart').textContent = formatter.format(totalPDescuento);
      if (productInCart.count > 0) {
         const card = document.getElementById(`product-item-${id}`);

         card.querySelector('.discount__price').textContent = formatter.format(productInCart.precioConDescuento);
         card.querySelector('.regular__price').textContent = formatter.format(productInCart.precioRegular);
         card.querySelector('.count__items').textContent = `Cantidad: ${productInCart.count}`;
      }
      else {
         const cartContainer = document.getElementById('items-shopping-cart-container');
         const emptyCart = cartContainer.querySelector('.empty__cart');
         document.getElementById(`product-item-${productInCart.id}`).remove();
         document.getElementById(`product-card-${productInCart.id}`).classList.remove('product__in__shopping__car');
         cart = cart.filter(p => p.id !== id);
         document.getElementById('cart-counter').textContent = cart.length;
         if (cart.length == 0) {
            emptyCart.classList.remove('d-none');
         }
      }
   });
}

// Agregar al carrito
function addToCart(id) {
   const container = document.getElementById('shopping-cart-container');
   const itemTemplate = document.getElementById('item-shopping-cart-template');
   const cartContainer = document.getElementById('items-shopping-cart-container');
   const emptyCart = cartContainer.querySelector('.empty__cart');

   obtener_productos().then(data => {
      let productInCart = cart.find(p => p.id == id);

      if (container.classList.contains('d-none')) {
         if (productInCart === undefined) {
            const product = data.find(p => p.id == id);
            product.count = product.count + 1;
            cart.push(product);
         }
         else {
            const product = data.find(p => p.id == id);
            productInCart.count = productInCart.count + 1;
            productInCart.precioConTarjeta = product.precioConTarjeta * productInCart.count;
            productInCart.precioConDescuento = product.precioConDescuento * productInCart.count;
            productInCart.precioRegular = product.precioRegular * productInCart.count;
            const card = cartContainer.querySelector(`product-item-${id}`);
            card.querySelector('.discount__price').textContent = formatter.format(productInCart.precioConDescuento);
            card.querySelector('.regular__price').textContent = formatter.format(productInCart.precioRegular);
         }
      }
      else {
         if (productInCart === undefined) {
            const product = data.find(p => p.id == id);
            product.count = product.count + 1;

            product.precioConTarjeta = product.precioConTarjeta * product.count;
            product.precioConDescuento = product.precioConDescuento * product.count;
            product.precioRegular = product.precioRegular * product.count;
            cart.push(product);

            const itemOriginal = itemTemplate.cloneNode(true);
            itemOriginal.classList.remove('d-none');
            itemOriginal.classList.add('item__shopping__cart');
            itemOriginal.id = `product-item-${product.id}`;

            itemOriginal.querySelector('img').src = product.rutaFoto == '' ? '../assets/images/no-image.jpg' : product.rutaFoto;
            itemOriginal.querySelector('.product__brand').textContent = product.marca;
            itemOriginal.querySelector('h2').textContent = product.nombreProducto;
            itemOriginal.querySelector('.discount__price').textContent = formatter.format(product.precioConDescuento);
            itemOriginal.querySelector('.regular__price').textContent = formatter.format(product.precioRegular);
            itemOriginal.querySelector('.count__items').textContent = `Cantidad: ${product.count}`;

            itemOriginal.querySelector('.remove__item').data_id = product.id;
            itemOriginal.querySelector('.add__item').data_id = product.id;
            itemOriginal.querySelector('.delete__item').data_id = product.id;

            cartContainer.appendChild(itemOriginal);
         }
         else {
            const product = data.find(p => p.id == id);
            productInCart.count = productInCart.count + 1;
            productInCart.precioConTarjeta = product.precioConTarjeta * productInCart.count;
            productInCart.precioConDescuento = product.precioConDescuento * productInCart.count;
            productInCart.precioRegular = product.precioRegular * productInCart.count;

            const card = document.getElementById(`product-item-${id}`);

            card.querySelector('.discount__price').textContent = formatter.format(productInCart.precioConDescuento);
            card.querySelector('.regular__price').textContent = formatter.format(productInCart.precioRegular);
            card.querySelector('.count__items').textContent = `Cantidad: ${productInCart.count}`;
         }
      }

      const totalPDescuento = cart.reduce((suma, producto) => {
         return suma + producto.precioConDescuento;
      }, 0);
      const totalPRegular = cart.reduce((suma, producto) => {
         return suma + producto.precioRegular;
      }, 0);
      document.getElementById('subtotal-shopping-cart').textContent = formatter.format(totalPRegular);
      document.getElementById('descuentos-shopping-cart').textContent = formatter.format(totalPRegular - totalPDescuento);
      document.getElementById('total-shopping-cart').textContent = formatter.format(totalPDescuento);
      document.getElementById(`product-card-${id}`).classList.add('product__in__shopping__car')
      document.getElementById('cart-counter').textContent = cart.length;
      if (cart.length == 0) {
         emptyCart.classList.remove('d-none');
      }
      else if (cart.length > 0) {
         emptyCart.classList.add('d-none');
      }
   });
}

// Mostrar/ocultar carrito
function toggleCart(eliminarItems) {
   const container = document.getElementById('shopping-cart-container');
   const itemTemplate = document.getElementById('item-shopping-cart-template');
   const cartContainer = document.getElementById('items-shopping-cart-container');
   const emptyCart = cartContainer.querySelector('.empty__cart');

   if (eliminarItems === true) {
      const itemsProducts = document.querySelectorAll('.item__shopping__cart');
      if (itemsProducts.length > 0) {
         itemsProducts.forEach(p => p.remove());
         container.classList.toggle('d-none');
      }
      else {
         container.classList.toggle('d-none');
      }
   }
   else {
      cart.forEach(item => {
         const itemOriginal = itemTemplate.cloneNode(true);
         itemOriginal.classList.remove('d-none');
         itemOriginal.classList.add('item__shopping__cart');
         itemOriginal.id = `product-item-${item.id}`;
         // Asignar valores dinámicos
         itemOriginal.querySelector('img').src = item.rutaFoto == '' ? '../assets/images/no-image.jpg' : item.rutaFoto;
         itemOriginal.querySelector('.product__brand').textContent = item.marca;
         itemOriginal.querySelector('h2').textContent = item.nombreProducto;
         itemOriginal.querySelector('.discount__price').textContent = formatter.format(item.precioConDescuento);
         itemOriginal.querySelector('.regular__price').textContent = formatter.format(item.precioRegular);
         itemOriginal.querySelector('.count__items').textContent = `Cantidad: ${item.count}`;

         itemOriginal.querySelector('.remove__item').data_id = item.id;
         itemOriginal.querySelector('.add__item').data_id = item.id;
         itemOriginal.querySelector('.delete__item').data_id = item.id;

         cartContainer.appendChild(itemOriginal);
      });
      container.classList.toggle('d-none');
   }

   if (cart.length == 0) {
      emptyCart.classList.remove('d-none');
   }
   else if (cart.length > 0) {
      emptyCart.classList.add('d-none');
   }
}

// Filtrar productos
function filterProducts() {
   const searchInput = document.getElementById('search').value.toLowerCase();
   const priceFilter = document.getElementById('priceFilter').value;
   const productCards = document.querySelectorAll('.product-card');

   productCards.forEach(card => {
      const productName = card.querySelector('h2').textContent.toLowerCase();
      const productPrice = parseFloat(card.getAttribute('data-price'));

      let matchesSearch = productName.includes(searchInput);
      let matchesPrice = priceFilter === 'all' ||
         (priceFilter === 'under50' && productPrice < 50) ||
         (priceFilter === 'above50' && productPrice >= 50);

      card.style.display = matchesSearch && matchesPrice ? 'block' : 'none';
   });
}

// Finalizar compra
function checkout() {
   alert(`Gracias por tu compra. Total: $${totalPrice.toFixed(2)}`);
   cart = [];
   updateCart();
   document.querySelectorAll('.cart-btn').forEach(button => {
      button.querySelector('.material-icons').textContent = 'add_shopping_cart';
   });
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () => {
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () => {
   navMenu.classList.remove('show-menu');
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
   searchBtn = document.getElementById('search-btn'),
   searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () => {
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () => {
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
   loginBtn = document.getElementById('login-btn'),
   loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () => {
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () => {
   login.classList.remove('show-login')
})

/*=============== SUSCRIBE ===============*/
const suscribe = document.getElementById('suscribe'),
   sucribeBtn = document.getElementById('suscribe-btn'),
   sucribeClose = document.getElementById('suscribe-close'),
   rememberLaterBtn = document.getElementById('remember-later')
/* Suscribe show */
sucribeBtn.addEventListener('click', () => {
   suscribe.classList.add('show-suscribe')
});

/* Suscribe hidden */
sucribeClose.addEventListener('click', () => {
   suscribe.classList.remove('show-suscribe')
});

rememberLaterBtn.addEventListener('click', () => {
   suscribe.classList.remove('show-suscribe')
});

function showProductActions(sectionActions) {
   const section__Actions = sectionActions.querySelector('.product__actions');
   section__Actions.classList.remove('d-none');
}
function hideProductActions(sectionActions) {
   const section__Actions = sectionActions.querySelector('.product__actions');
   section__Actions.classList.add('d-none');
}
