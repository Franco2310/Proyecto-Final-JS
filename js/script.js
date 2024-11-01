let cart = [];
let cartCount = 0;

// Función para mostrar/ocultar el menú
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open-sidebar");
}

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartMenu = document.getElementById('cart-menu');
    cartMenu.style.display = cartMenu.style.display === 'none' || cartMenu.style.display === '' ? 'flex' : 'none';
    updateCart();
}

// Filtrar productos según la categoría
function filterProducts(category) {
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        if (category === 'todos' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Función para cargar productos desde un archivo JSON
async function loadProducts() {
    try {
        const response = await fetch('products.json'); // Ruta al archivo JSON
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para mostrar productos en el DOM
function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Añadir al carrito</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Función para añadir productos al carrito
function addToCart(productName, productPrice, productImage) {
    cart.push({ name: productName, price: productPrice, image: productImage });
    cartCount++;
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en localStorage
    
    // Notificación usando Toastify
    Toastify({
        text: `${productName} ha sido añadido al carrito.`,
        duration: 3000,
        gravity: "top",
        position: 'center', // Centrar en la parte superior
        backgroundColor: "#1e90ff",
    }).showToast();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}

// Función para actualizar la visualización del carrito
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsElement.innerHTML = ''; // Limpiar la lista existente
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-item-details">
                <p>${item.name}</p>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItemsElement.appendChild(li);
        total += item.price;
    });

    cartTotalElement.textContent = `Total: $${total}`;
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    cartCount--;
    updateCartCount();
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar localStorage
    
    // Notificación usando Toastify
    Toastify({
        text: `${item.name} ha sido eliminado del carrito.`,
        duration: 3000,
        gravity: "top",
        position: 'center', // Centrar en la parte superior
        backgroundColor: "#ff4757",
    }).showToast();
}

// Función de pago (simulación)
function checkout() {
    if (cart.length === 0) {
        Toastify({
            text: 'Tu carrito está vacío.',
            duration: 3000,
            gravity: "top",
            position: 'center', // Centrar en la parte superior
            backgroundColor: "#ffbb33",
        }).showToast();
    } else {
        Toastify({
            text: 'Gracias por tu compra. ¡Volveremos pronto!',
            duration: 3000,
            gravity: "top",
            position: 'center', // Centrar en la parte superior
            backgroundColor: "#1e90ff",
        }).showToast();
        cart = []; // Vaciar el carrito
        cartCount = 0; // Restablecer el contador
        updateCartCount();
        updateCart(); // Actualizar la visualización del carrito
        toggleCart(); // Cerrar el carrito después de la compra
        localStorage.removeItem('cart'); // Limpiar localStorage
    }
}

// Inicialización de eventos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const closeCart = document.getElementById('close-cart');
    
    // Cargar productos desde el JSON al inicio
    loadProducts();
    
    // Cargar el carrito desde localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart;
        cartCount = cart.length;
        updateCartCount();
        updateCart();
    }
    
    // Configuración de eventos para el menú y el carrito
    menuToggle.addEventListener('click', toggleMenu);
    closeCart.addEventListener('click', toggleCart);
});
