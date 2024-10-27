import { Products } from './data.js';

const ProductsList = document.getElementById('products');
const cart = document.getElementById('cart');  

let productsHTML = '';
Products.forEach(ele => {
    productsHTML += `
    <div class='productsCards'>
        <p>${ele.names}</p>
        <p>${ele.price}</p>
        <div class='quntity'> 
            <p style='cursor: pointer' onclick='decremnet(${ele.id})'>-</p>
            <p id='qnt${ele.id}'>0</p>
            <p style='cursor: pointer' onclick='increment(${ele.id}, "${ele.names}", ${ele.price})'>+</p>
        </div>
    </div>
    `;
});
ProductsList.innerHTML = productsHTML;

let Increment_quntity = {};  
window.increment = function(id, names, price) {
    if (!Increment_quntity[id]) {
        Increment_quntity[id] = 0;
    }
    Increment_quntity[id]++;
    
    let count = document.getElementById(`qnt${id}`);
    count.innerHTML = Increment_quntity[id];
    
    Products[id-1].quntity = Increment_quntity[id];  
    updateCart();  }

window.decremnet = function(id) {
    if (!Increment_quntity[id]) {
        Increment_quntity[id] = 0;
    }
    
    if (Increment_quntity[id] > 0) {
        Increment_quntity[id]--;
    }
    
    let count = document.getElementById(`qnt${id}`);
    count.innerHTML = Increment_quntity[id];
    
    Products[id-1].quntity = Increment_quntity[id];   updateCart();  
}

function updateCart() {
    let cartHTML = '';
    let totalCartPrice = 0;  
    Products.forEach(product => {
        if (product.quntity > 0) {
            let totalPrice = product.quntity * product.price;
            totalCartPrice += totalPrice;  
            cartHTML += `
               
                <div class='cartItem'>
                    <p>${product.names}</p>
                    <div style='display:flex'>
                    <p>${product.quntity}</p>
                    <p><span style='margin-left:2px'>*</span> ${product.price}</p>
                    </div>
                 
                </div>

               
            `;
        }
    });

    if (cartHTML === '') {
        cart.innerHTML = "<p>Cart is empty</p>";
    } else {
        cartHTML += `<hr><p style='    background-color: #A6A6A6;
    color: #fff;
    font-weight: 600;
    padding: 10px;'><strong>Total : ${totalCartPrice}</strong></p>`;
        cart.innerHTML = cartHTML;
    }
}

updateCart();
