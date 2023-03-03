// declaring main variables/arrays to use -------
import {menuArray} from '/data.js'
const menu = document.getElementById('menu-container')
const cart = document.getElementById('cart')
const order = document.getElementById('order')
const cartItem = document.getElementById('cart-item')
const totalAmnt = document.getElementById('total')
const finishOrder = document.getElementById('finalize')
const modal = document.getElementById('payment-modal')
const payBtn = document.getElementById('pay-btn')
const closeModal = document.getElementById('close-modal')
const orderComplete = document.getElementById('order-complete-message')
let orderArray = []

// checking if add/remove buttons are clicked -------
document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        addItem(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }
})

// finalize order to open modal, button to close modal and edit order, and function to complete order and show order complete message -------
finishOrder.addEventListener('click', () => {toggleHide(modal)})

closeModal.addEventListener('click', () => {toggleHide(modal)})

modal.addEventListener('submit', (e) => {
    e.preventDefault()
    toggleHide(modal)
    toggleHide(cart)
    orderComplete.innerHTML = `
    <h2 class="order-message">Thanks for the order ${document.getElementById("name").value}! Your order is on its way!</h2>
    `
})

// function to toggle hide class -------
function toggleHide(item) {
    item.classList.toggle('hide')
}

// function to call functions that update html -------
function updateOrder() {
    renderOrder()
    totalPrice()
}

// functions to add/remove items -------
function addItem(itemId) {
    const itemObj = menuArray.filter((item) => {
        return item.id.toString() === itemId
    })[0]
    itemObj.count++
    itemObj.total = itemObj.price * itemObj.count
    if(!orderArray.includes(itemObj)) {
        orderArray.push(itemObj)
    }
    updateOrder()
}

function removeItem(itemId) {
    const itemObj = menuArray.filter((item) => {
        return item.id.toString() === itemId
    })[0]
    if(itemObj.count > 0) {
        itemObj.count--
        itemObj.total = itemObj.price * itemObj.count
    }
    orderArray = orderArray.filter((item) => {
        return item.count > 0
    })
    updateOrder()
}

// rendering items selected to order -------
function renderOrder() {
    if(orderArray.length > 0){
        cart.classList.remove('hide')
        let orderItems = ''
        orderArray.forEach((item) => {
            orderItems += `
                <div class="cart-item">
                    <h2 class="cart-food-title">${item.name}</h2>
                    <p class="quantity">Quantity: ${item.count}</p>
                    <button id="remove-btn" class="remove-btn" data-remove="${item.id}">Remove</button>
                    <p class="cart-price">$ ${item.price * item.count}</p>
                </div>
                `
        })
        // Why is it that when i use "cart.insertAdjacentHTML" it duplicates orders, but "cart.innerHTML" it doesn't? I don't mind using innerHTMl, I just would like to know the difference. I'm having a hard time understanding the difference from googling it.
        order.innerHTML = orderItems
    } else {
        cart.classList.add('hide')
    }
}

// rendering total price of order -------
function totalPrice() {
    let priceTotal  = 0
    orderArray.forEach((item) => {
        priceTotal += item.total
    })
    totalAmnt.textContent = `$ ${priceTotal}`
}

// rendering menu items -------
function renderMenu() {
    menuArray.forEach((item) => {
    menu.innerHTML += `
        <div class="menu-item">
            <h1 class="food-icon">${item.emoji}</h1>
            <div class="food-container">
                <h2 class="food-title">${item.name}</h2>
                <p class="food-descrip">${item.ingredients}</p>
                <p class="price">$ ${item.price}</p>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </div>
        `
    })
}
renderMenu()
// --------- A couple of questions below: ----------------------------------------------

// How to disable "add to menu" buttons after submitting form? I had trouble doing that.

// ----------------------------------------

// For the function below, this is how I originally planned to render my order items:
//     - select all buttons with "add-btn" class
//     - add an event listener on all of them with forEach()
//     - add to order on each click by adding to cart.innerHTML (this is where I got lost)
// It would duplicate order items as well. Could I have changed something to make this work?

// const addBtn = document.querySelectorAll('.add-btn')
// let cartHtml = ''
// addBtn.forEach((addBtn) => {
//     addBtn.addEventListener('click', () => {
//         cart.innerHTML += `
//         <div class="cart-item">
//             <p class="cart-food-title">${item.name}</p>
//             <button id="remove-btn" class="remove-btn">Remove</button>
//             <p class="cart-price">$ ${item.price}</p>
//         </div>
//         `
//     })
// })
// ----------------------------------------