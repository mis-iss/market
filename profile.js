let cartProd = document.getElementById('cart-products');

let orderBlock = document.getElementById('order-block');

let modal = document.getElementById('myModal');

let span = document.getElementsByClassName('close')[0];

span.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

function buyAll() {
    modal.style.display = "block";
    let sum = 0;
    orderBlock.innerHTML = null;
}

function openCart() {
    cartProd.classList.toggle('hide');
}

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let data = JSON.stringify({
        "name": e.target['name'].value,
        "photo_url": e.target['photo_url'].value,
        "bank_card_number": e.target['bank_card_number'].value
      });

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://market-0a86.restdb.io/rest/profile");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("x-apikey", "6666ef2485f7f65dbe63c87b");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(data);

      modal.style.display = "none";
      cart = [];
      cartProd.innerHTML = 'Money was withdrawn from your credit card';
      localStorage.setItem("cart", '[]');
})


// POST TO THE WEB //


let orders = document.getElementById('profile_zamovlenya');

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://market-0a86.restdb.io/rest/profile");
xhr.responseType = 'json'
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6666ef2485f7f65dbe63c87b");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.onload = function() {
    xhr.response.forEach(function(order){
        let orderElement = document.createElement('div');
        orderElement.classList.add('product'); 
        orderElement.innerHTML += `
            <p><b>Name:</b> ${order.name}</p>
            <p><img src="${order.photo_url}">
            <p><b>Bank card number:</b> ${order.bank_card_number}</p>
        `;  
        orders.append(orderElement);
    })
}

xhr.send();


function complete(id) {
    var data = JSON.stringify({
        "status": "Completed"
    });
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.onload = function() {
        if (xhr.status == 200) {
            location.reload();
        }
        else {
            alert('Server error. Try again later');
        }
    }
 
    xhr.open("PUT", "https://market-0a86.restdb.io/rest/profile/(ObjectID)");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6666ef2485f7f65dbe63c87b");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}