let productForm = document.getElementById('add_product_form');

productForm.addEventListener('submit', function(event){
    event.preventDefault();
    let data = JSON.stringify({
        "name": event.target['name'].value,
        "description": event.target['description'].value,
        "price": event.target['price'].value,
        "photo_url": event.target['photo_url'].value
    });

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.onload = function () {
        if (xhr.status === 201) {
            event.target.reset();
            alert('Product added successfully');
        }
        else {
            alert('Server error. Try again later');
        }
    };

    xhr.open("POST", "https://market-0a86.restdb.io/rest/product");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6666ef2485f7f65dbe63c87b");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
})



let orders = document.getElementById('admin_page_orders');

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://market-0a86.restdb.io/rest/orders");
xhr.responseType = 'json'
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6666ef2485f7f65dbe63c87b");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.onload = function() {
    xhr.response.forEach(function(order){
        let orderElement = document.createElement('div');
        orderElement.classList.add('product'); 
        let statusColor = 'green';
        if(order.status == 'Completed') {
            statusColor = 'yellow';
        }
        orderElement.innerHTML += `
            <h2>Order ${order._id}</h2>
            <p><b>Status:</b> <span style="color:${statusColor}">${order.status}</span></p>
            <p><b>Customer name:</b> ${order.name}</p>
            <p><b>Address:</b> ${order.address}</p>
            <p><b>Phone:</b> ${order.phone}</p>
            <p><b>Post Office Number:</b> ${order.post_number}</p>
        `;  
        let sum = 0;
        order.products.forEach(function(p){
            orderElement.innerHTML += `
                <p><img height="50" src="${p.photo_url}"> ${p.name} |${p.price}$</p>
            `;
            sum += +p.price;
        });
        orderElement.innerHTML += `
        <p>Total Price: ${sum}$</p> 
        <button onclick="complete('${order._id}')">Mark as Completed</button> 
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
 
    xhr.open("PUT", "https://market-0a86.restdb.io/rest/orders/(ObjectID)");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6666ef2485f7f65dbe63c87b");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}