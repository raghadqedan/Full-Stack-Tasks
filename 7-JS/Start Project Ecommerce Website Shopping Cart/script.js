//display cart
const cart = document.querySelector(".cart");
const closeCartIcon = document.querySelector(".cart-close");
const cartIcon = document.querySelector("#cart-icon");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
closeCartIcon.addEventListener("click", () => cart.classList.remove("active"));

//add product to the cart
const addCartButton = document.querySelectorAll(".add-cart");
addCartButton.forEach((button) => {
    button.addEventListener("click", (event) => {
        const selectedProductBox = event.target.closest(".product-box");
        addToCart(selectedProductBox);
       
    });
});
//get the selected product data
const addToCart = (selectedProductBox) => {
    productImage = selectedProductBox.querySelector("img").src;
    productTitle = selectedProductBox.querySelector(".product-title").textContent;
    productPrice = selectedProductBox.querySelector(".product-price").textContent;
    const cartContent = document.querySelector(".cart-content");

    const cartItemTitles = cartContent.querySelectorAll(".cart-product-title");
    //prevent repeted the same product in the cart
    for (let cartItem of cartItemTitles) {
        if (productTitle === cartItem.textContent) {
            alert("This item is already in the cart.");
            return;
        }
    }

    //create new cartBox Element with the new data
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
    <img src="${productImage}"  class="cart-image">
            <div class="cart-details">
                <h2 class="cart-product-title">${productTitle}</h2>
                <span class="cart-product-price">${productPrice}</span>
                <div class="cart-product-quantity">
                    <button id="decrement">-</button>
                    <span class="number">1</span>
                    <button id="increment">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-6-line cart-remove"></i>`;

    cartContent.appendChild(cartBox);
    cartBox.querySelector(".cart-remove")
        .addEventListener("click", () =>{ cartBox.remove();
       updateTotalPrice();

        });

    //control in cart-product-quantity inc dec
    cartBox.querySelector(".cart-product-quantity")
        .addEventListener("click", (event) => {
            const quantityElement = cartBox.querySelector(".number");

            let quantity = quantityElement.textContent;
            if (event.target.id === "decrement" && quantity > 0) {
                //decrement the counter
                quantity--;
                //if the element quantity is 0 remove the element from cart
                if (quantity == 0) {
                    cartBox.remove();
                    updateTotalPrice()
                    return;
                }
            } else if (event.target.id === "increment") {
                quantity++;
            }
            quantityElement.textContent = quantity;
            updateTotalPrice();

        });
       updateTotalPrice();
};

const updateTotalPrice = ()=>{
        const cartContent = document.querySelector(".cart-content");
        const cartElements= cartContent.querySelectorAll(".cart-box");
        const cartTotalPriceElement=document.querySelector('.cart-total-price');
        let totalPrice=0.0;
        cartElements.forEach (cartItem=>{
         const productQuantity=cartItem.querySelector('.number').textContent;
         const productPrice=cartItem.querySelector('.cart-product-price').textContent.replace('$','');
           totalPrice+=productQuantity* productPrice;
        });
        cartTotalPriceElement.textContent=`$${totalPrice}`
}
