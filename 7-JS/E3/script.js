let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContent = document.querySelector(".cart-content");

//   Generat Shop Item dynamically code

const shop = document.querySelector(".shop");
const shopItem = [
    {
        id: "1",
        title: "Iphone 13 pro",
        imgSrc: "images/iphone-13-pro.jpg",
        price: "1000",
    },
    {
        id: "2",
        title: "HeadPhone",
        imgSrc: "images/headphone.jpg",
        price: "90",
    },
    {
        id: "3",
        title: "KeyBoard",
        imgSrc: "images/keyboard.jpg",
        price: "80",
    },
];
let generateShopBox = () => {
    return (shop.innerHTML = shopItem.map((productItem) => {
        let { id, title, imgSrc, price } = productItem;

        return `
    <div class="shop-box">
            <input hidden class="product-id" data-product-id="${id}"/>
            <div class="product-img-box">
                <img src="${imgSrc}" class="product-image">
            </div>
            <div class="product-details">
                    <h2 class="product-title">${title}</h2>
                    <span class="product-price">$${price}</span>
                </div>
                <button class="add-to-cart">Add To Cart</button>
            </div>
            </div>
    `;
    }));
};
generateShopBox();

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const selectedShopBox = event.target.closest(".shop-box");
        addToCart(selectedShopBox);
    });
});

addToCart = (selectedShopBox) => {
    const product = {
        Id: selectedShopBox.querySelector(".product-id").dataset.productId,
        Image: selectedShopBox.querySelector(".product-image").src,
        Price: selectedShopBox
            .querySelector(".product-price")
            .textContent.replace("$", ""),
        Title: selectedShopBox.querySelector(".product-title").textContent,
        Quantity: 1,
    };
    // prevent duplicated item in cart
    const isDuplicated =
        cart.filter((cartItem) => cartItem.Id == product.Id).length > 0;
    if (isDuplicated) {
        //repeted so dont add it
        alert("This item is already in the cart.");
        return;
    } else {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    //create new cartBox
    const cartBox = createCartBox(product);
    cartContent.appendChild(cartBox);
    updateTotalPrice();
    quantityControl(cartBox, product);
};

saveCart();
const updateTotalPriceOfProduct = () => {
    const cartContent = document.querySelector(".cart-content");
    let totalPriceforProduct;
    cartContent.querySelectorAll(".cart-box").forEach((cartBox) => {
        const cartPriceElement = cartBox.querySelector(".cart-product-price");
        const productCart = cart.find(
            (cartItem) =>
                cartBox.querySelector(".cart-product-image").dataset.productId ==
                cartItem.Id
        );
        totalPriceforProduct = 0.0;
        totalPriceforProduct +=
            parseFloat(productCart.Price) * productCart.Quantity;
        cartPriceElement.textContent = totalPriceforProduct;
    });
};
const updateTotalPrice = () => {
    const cartTotalPriceElement = document.querySelector(".total-price");
    let totalPriceforProduct = 0.0;
    cart.forEach((cartItem) => {
        totalPriceforProduct += cartItem.Price * cartItem.Quantity;
    });
    cartTotalPriceElement.textContent = "$" + totalPriceforProduct;
};

function quantityControl(cartBox, product) {
    cartBox
        .querySelector(".cart-product-quantity")
        .addEventListener("click", (event) => {
            const quantityElemet = cartBox.querySelector(".number");
            let quantity = parseInt(quantityElemet.textContent);
            if (event.target.id == "decrement" && quantity > 0) {
                cart.forEach((cartItem) => {
                    if (quantity == 1) {
                        quantity = --cartItem.Quantity;
                        cartBox.remove();
                        cart = cart.filter((cartItem) => cartItem.Id != product.Id);
                        localStorage.setItem("cart", JSON.stringify(cart));

                        return;
                    }
                    if (cartItem.Id == product.Id) {
                        quantity = --cartItem.Quantity;
                        quantityElemet.textContent = quantity;
                    }
                });
            } else if (event.target.id == "increment") {
                // quantity++;
                cart.forEach((cartItem) => {
                    if (cartItem.Id == product.Id) {
                        quantity = ++cartItem.Quantity;
                        quantityElemet.textContent = quantity;
                    }
                });
            }
            localStorage.setItem("cart", JSON.stringify(cart));

            updateTotalPriceOfProduct();
            updateTotalPrice();
        });
}

function createCartBox(product) {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    let { Id, Image, Price, Quantity } = product;
    cartBox.innerHTML = `<img src="${Image}"  class="cart-product-image" data-product-id="${Id}">
                <div class="cart-product-quantity"  data-price="${parseFloat(
        Price
    )}">
                    <button id="decrement">-</button>
                    <span class="number">${Quantity}</span>
                    <button id="increment">+</button>
                </div>
                <h2 class="cart-product-price">${Price}</h2>
                <div class="cart-close-icon-circle">
                    <i class=" ri-close-line cart-close product-remove-icon"></i>
                </div>
    `;
    cartBox
        .querySelector(".product-remove-icon")
        .addEventListener("click", () => {
            const productId = cartBox.querySelector(".cart-product-image").dataset
                .productId;
            cartBox.remove();
            cart = cart.filter((cartItem) => cartItem.Id != productId);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateTotalPrice();
        });
    return cartBox;
}
function saveCart() {
    document.querySelector(".save-cart").addEventListener("click", () => {
        localStorage.setItem("Savedcart", JSON.stringify(cart));
        alert("Cart has been saved successfully!");
    });
}

//reload the cart

if (cart.length > 0) {
    cart.forEach((cartItem) => {
        const product = cartItem;
        const cartBox = createCartBox(product);
        cartContent.appendChild(cartBox);
        updateTotalPrice();
        updateTotalPriceOfProduct();

        // Quantity control
        quantityControl(cartBox, product);
    });
}
