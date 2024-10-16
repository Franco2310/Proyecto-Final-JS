let cart = [];
const cartItemsElement = document.getElementById("cart-items");
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");
const cartMenuElement = document.getElementById("cart-menu");

// Cargar el carrito desde localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

// Guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, image) {
    const item = { name, price, image };
    cart.push(item);
    saveCart();
    updateCart();
}

function updateCart() {
    cartItemsElement.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p>${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart('${item.name}')">X</button>
        `;
        cartItemsElement.appendChild(li);
    });

    cartCountElement.textContent = cart.length;
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`; // Añadido backticks para que funcione correctamente
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name); // Usamos filter para crear un nuevo array sin el item eliminado
    saveCart();
    updateCart();
}

function toggleCart() {
    cartMenuElement.style.display = cartMenuElement.style.display === "none" ? "flex" : "none"; // Alternar la visibilidad del carrito
}

function filterProducts(category) {
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        if (category === 'todos' || product.dataset.category === category) {
            product.style.display = 'block'; // Mostrar el producto si coincide con la categoría
        } else {
            product.style.display = 'none'; // Ocultar el producto si no coincide
        }
    });
}

function searchProducts(query) {
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        const name = product.querySelector("p").textContent.toLowerCase();
        if (name.includes(query.toLowerCase())) {
            product.style.display = 'block'; // Mostrar si la búsqueda coincide
        } else {
            product.style.display = 'none'; // Ocultar si no coincide
        }
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Error: Debes añadir artículos al carrito para poder comprar."); // Mensaje de error si el carrito está vacío
        return; // Detener la función si el carrito está vacío
    }
    
    alert("Gracias por tu compra!"); // Mensaje de agradecimiento
    cart = []; // Limpiar el carrito
    saveCart();
    updateCart();
}

// Eventos de carga
window.onload = function() {
    loadCart(); // Cargar el carrito al iniciar la página
};


