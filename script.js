document.addEventListener("DOMContentLoaded", ()=>{
const products = [
    { id: 1, name: "Orange", price: 19.999 },
    { id: 2, name: "Apple", price: 29.999 },
    { id: 3, name: "Banana", price: 49.999 }, 

]
const cart = [];
const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const totalPriceDisplay = document.querySelector("#total-price");
const checkOutBtn = document.querySelector("#checkout-btn");
const addBtn = document.querySelector("#add-btn");
const emptyCartMessage = document.querySelector("#empty-cart");

products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}"> Add to cart</button>
    `;
    productList.appendChild(productDiv);
})

productList.addEventListener("click",(e)=>{
 if ( e.target.tagName === "BUTTON"){
const productId = parseInt(e.target.getAttribute("data-id"));
const product = products.find((p)=>p.id === productId);
addToCart(product);
 }
})

function addToCart(product){
const existingItem = cart.find((item)=> item.product.id === product.id);
if(existingItem){
    existingItem.quantity +=1;
}
else {
    cart.push({product, quantity:1});
}
renderCart();
}
function renderCart(){
    cartItems.innerHTML = "";
let totalPrice = 0;
if(cart.length > 0){
   emptyCartMessage.classList.add("hidden"); 
   cartTotal.classList.remove("hidden");

   cart.forEach((item)=>{
    totalPrice += item.product.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.innerHTML =`
    ${item.product.name} | Qty: ${item.quantity} | Price: $${(item.product.price * item.quantity).toFixed(2)}`;
    cartItems.appendChild(cartItem);
});
totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
} else{
    emptyCartMessage.classList.remove("hidden");
    totalPriceDisplay.textContent = `$0.00`;
}
}

checkOutBtn.addEventListener("click",()=>{
    cart.length = 0; //clear the cart
    alert("You have Successfully paced your Order")
    renderCart();
})
})