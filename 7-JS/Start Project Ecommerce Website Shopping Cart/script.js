

//Generat Shop Item dynamically code
const data=[
    {
        Id:1,
        Image:"images/product1.jpg",
        Title:"Casual Black polo",
        Price:50,
    },
      {
        Id:2,
        Image:"images/product2.jpg",
        Title:"Water Proof Hoodie",
        Price:100,
    },
        {
        Id:3,
        Image:"images/product3.jpg",
        Title:"Blue Sweatshirt",
        Price:90,
    },
        {
        Id:4,
        Image:"images/product4.jpg",
        Title:"Hooded Urban Jacket",
        Price:80,
    },
          {
        Id:5,
        Image:"images/product5.jpg",
        Title:"Black polo",
        Price:80,
    },
           {
        Id:6,
        Image:"images/product6.jpg",
        Title:"Water Proof Hoodi",
        Price:80,
    },
               {
        Id:7,
        Image:"images/product7.jpg",
        Title:"Hooded Urban Jacket",
        Price:80,
    },
                  {
        Id:8,
        Image:"images/product8.jpg",
        Title:"Water Proof Hoodi",
        Price:80,
    },

]
  const shopContent=document.querySelector('.product-content');
const  GenerateShopBox = ({Id,Image,Title,Price})=>{
const productBox=document.createElement('div');
productBox.classList.add('product-box');
productBox.innerHTML=
`<input hidden id="shopItemId" data-shop-item-id="${Id}">
<div class="product-image-box">
                    <img src=${Image} class="product-image">
                </div>
                <h2 class="product-title">${Title} </h2>
                <div class="price-and-cart">
                    <span class="product-price">$${Price}</span>
                    <i class="ri-shopping-cart-2-line add-cart"></i>
                </div>`;
                shopContent.appendChild(productBox);


}

data.forEach(GenerateShopBox); 



//display cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartElement = document.querySelector(".cart");
  const cartContent = document.querySelector(".cart-content");
const closeCartIcon = document.querySelector(".cart-close");
const cartIcon = document.querySelector("#cart-icon");
cartIcon.addEventListener("click", () => cartElement.classList.add("active"));
//remove cart 
closeCartIcon.addEventListener("click", () => cartElement.classList.remove("active"));

//add to the cart
const addCartButton = document.querySelectorAll(".add-cart");
addCartButton.forEach((button) => {
    button.addEventListener("click", (event) => {
        const selectedProductBox = event.target.closest(".product-box");
        addToCart(selectedProductBox);
       
    });
});
//get the selected product data
const addToCart = (selectedProductBox) => {
    const product={
    Id:selectedProductBox.querySelector('#shopItemId').dataset.shopItemId,
    Image : selectedProductBox.querySelector("img").src,
    Title :selectedProductBox.querySelector(".product-title").textContent,
    Price : selectedProductBox.querySelector(".product-price").textContent,
    Quantity:1
    }

 //prevent repeted the same product in the cart
  const iSDuplicated =cart.filter((cartItem)=>cartItem.Id==product.Id).length>0;
if(iSDuplicated){
     //repeted so dont add it
        alert("This item is already in the cart.");
        return;
}else
{  
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
  
}
    const cartBox=createCartBox(product);
    removeProductFromCart(cartBox);
   controlQuantity(cartBox);
updateTotalPrice();
};

const updateTotalPrice = ()=>{
        const cartTotalPriceElement=document.querySelector('.cart-total-price');
        let totalPrice=0.0;
        cart.forEach (cartItem=>{
           totalPrice+=cartItem.Quantity * parseFloat(cartItem.Price.replace('$',''));
        });
        cartTotalPriceElement.textContent=`$${totalPrice}`
}


function createCartBox(product){
    //create new cartBox Element with the new data
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
      let{Id,Image,Title,Price,Quantity}=product ;
    cartBox.innerHTML = `
    <input hidden id="cart-item-id" data-cart-item-id="${Id}">
    <img src="${Image}"  class="cart-image">
            <div class="cart-details">
                <h2 class="cart-product-title">${Title}</h2>
                <span class="cart-product-price">${Price}</span>
                <div class="cart-product-quantity">
                    <button id="decrement">-</button>
                    <span class="number">${Quantity}</span>
                    <button id="increment">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-6-line cart-remove"></i>`;

    cartContent.appendChild(cartBox);
    return cartBox;
    
}
reloadCart()
function reloadCart(){
    cart.forEach(product=>{
        const cartBox=createCartBox(product);
        removeProductFromCart(cartBox);
           controlQuantity(cartBox);
           updateTotalPrice();

    })
}

function removeProductFromCart(cartBox){
        //remove product from cart
    cartBox.querySelector(".cart-remove")
        .addEventListener("click", () =>{ 
            cartBox.remove();
            cart=cart.filter(cartItem=>cartItem.Id!=cartBox.querySelector('#cart-item-id').dataset.cartItemId);
            localStorage.setItem("cart",JSON.stringify(cart));
       updateTotalPrice();
        });
}

function controlQuantity(cartBox){
        //control in cart-product-quantity inc dec
    cartBox.querySelector(".cart-product-quantity")
        .addEventListener("click", (event) => {
           
            if(event.target.id=='decrement' ){
                handleDecrement(cartBox);
                 updateTotalPrice();

            }else if(event.target.id=='increment'){
                handleIncrement(cartBox);
                 updateTotalPrice();

            }

      

        });
       

}

function handleDecrement(cartBox){
     const quantityElement=cartBox.querySelector('.number');
            let quantity=parseInt(quantityElement.textContent);
    if(quantity<0) return;
  const productTitle= cartBox.querySelector('.cart-product-title').textContent;
    const cartProduct=cart.find(cartItem=>cartItem.Title==productTitle);
    cartProduct.Quantity=--quantity;
    if(cartProduct.Quantity==0){
        cart=cart.filter(cartItem=>cartItem.Title!=productTitle);
         cartBox.remove();
    }else{
        quantityElement.textContent=quantity;
    
    }
    localStorage.setItem("cart",JSON.stringify(cart));
}
function handleIncrement(cartBox){
     const quantityElement=cartBox.querySelector('.number');
            let quantity=parseInt(quantityElement.textContent);
      const productId= cartBox.querySelector('#cart-item-id').dataset.cartItemId;
     const cartProduct=cart.find(cartItem=>cartItem.Id==productId);
    cartProduct.Quantity=++quantity;
    quantityElement.textContent=quantity;
    localStorage.setItem("cart",JSON.stringify(cart));
}
const  BuyCart=()=>{
    localStorage.setItem("cart",JSON.stringify(cart));
    alert('Thanks! Your cart has been successfully checked out')

}


