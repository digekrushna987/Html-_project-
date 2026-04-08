
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let cart = [];

// ✅ Add Product to Firebase
function addProduct() {
 let name = document.getElementById('pname').value;
 let price = document.getElementById('price').value;

 db.collection("products").add({
   name: name,
   price: price
 }).then(() => {
   alert("Product Saved!");
   loadProducts();
 });
}

// ✅ Load Products from Firebase
function loadProducts() {
 let store = document.getElementById('store');
 store.innerHTML = "";

 db.collection("products").get().then((snapshot) => {
   snapshot.forEach((doc) => {
     let data = doc.data();

     let div = document.createElement('div');
     div.className = 'product';

     div.innerHTML = `
       <h4>${data.name}</h4>
       <p>₹ ${data.price}</p>
       <button onclick="addToCart('${data.name}', ${data.price})">Add to Cart</button>
     `;

     store.appendChild(div);
   });
 });
}

// 🛒 Cart Logic
function addToCart(name, price) {
 cart.push({name, price});
 renderCart();
}

function renderCart() {
 let cartDiv = document.getElementById('cart');
 cartDiv.innerHTML = '';
 let total = 0;

 cart.forEach(item => {
   let p = document.createElement('p');
   p.innerText = item.name + ' - ₹' + item.price;
   cartDiv.appendChild(p);
   total += Number(item.price);
 });

 let t = document.createElement('h3');
 t.innerText = 'Total: ₹' + total;
 cartDiv.appendChild(t);
}

// 🚀 Load data on start
loadProducts();