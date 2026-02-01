const API_URL = "https://diks-ekspress-server.online"; // backend demo online

let user_id = 1;
const demoProducts = [
  {id:1,name:"Smartphone X",description:"HP Android terbaru",price:2500000,country:"Indonesia",category:"Electronics"},
  {id:2,name:"Laptop Pro",description:"Laptop performa tinggi",price:7500000,country:"USA",category:"Electronics"},
  {id:3,name:"Jaket Kulit",description:"Fashion jaket keren",price:500000,country:"France",category:"Fashion"},
  {id:4,name:"Sneakers",description:"Sepatu stylish",price:600000,country:"Japan",category:"Fashion"},
  {id:5,name:"Headphone",description:"Noise cancelling",price:300000,country:"USA",category:"Electronics"}
];

let cart = [];
let wishlist = [];
let reviews = [
  {product_id:1,user:"Alice",rating:5,comment:"Bagus sekali!"},
  {product_id:3,user:"Bob",rating:4,comment:"Nyaman dipakai"}
];

document.getElementById("dark-toggle").addEventListener("change", function(){
  document.body.classList.toggle("dark-mode");
});

function showToast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg; t.style.display="block";
  setTimeout(()=>{ t.style.display="none"; },1500);
}

function loadProducts(){
  const cat=document.getElementById("category-filter").value;
  const country=document.getElementById("country-filter").value;
  const filtered = demoProducts.filter(p=>{
    return (!cat||p.category===cat) && (!country||p.country===country);
  });
  const ul=document.getElementById("product-list"); ul.innerHTML='';
  filtered.forEach(p=>{
    const li=document.createElement('li'); li.className='product-card';
    li.innerHTML=`
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>Rp${p.price}</p>
      <p>🌍 ${p.country}</p>
      <button onclick="addToCart(${p.id})">+ Keranjang</button>
      <button onclick="toggleWishlist(${p.id})">❤ Wishlist</button>`;
    ul.appendChild(li);
  });
  loadReviews();
}

function addToCart(pid){
  const item = cart.find(c=>c.product_id===pid);
  if(item) item.quantity += 1;
  else cart.push({product_id:pid,quantity:1});
  showToast("Ditambahkan ke cart");
  loadCart();
}

function loadCart(){
  const ul=document.getElementById("cart-list"); ul.innerHTML='';
  cart.forEach(i=>{
    const p = demoProducts.find(p=>p.id===i.product_id);
    const li=document.createElement('li'); li.innerText=`${p.name} Qty: ${i.quantity}`;
    ul.appendChild(li);
  });
}

function toggleWishlist(pid){
  const index = wishlist.indexOf(pid);
  if(index>=0) wishlist.splice(index,1);
  else wishlist.push(pid);
  loadWishlist();
}

function loadWishlist(){
  const ul=document.getElementById("wishlist-list"); ul.innerHTML='';
  wishlist.forEach(pid=>{
    const p = demoProducts.find(p=>p.id===pid);
    const li=document.createElement('li'); li.innerText=p.name;
    ul.appendChild(li);
  });
}

function checkout(){
  if(cart.length===0){ showToast("Keranjang kosong"); return; }
  const pm = prompt("Metode pembayaran (cod / prepaid / dana)","cod");
  showToast(`Checkout berhasil dengan ${pm}`);
  cart=[]; loadCart();
}

function loadReviews(){
  const ul=document.getElementById("review-list"); ul.innerHTML='';
  reviews.forEach(r=>{
    const p = demoProducts.find(p=>p.id===r.product_id);
    const li=document.createElement('li'); 
    li.innerText=`${p.name} - ${r.user}: ${r.rating}⭐ ${r.comment}`;
    ul.appendChild(li);
  });
}

loadProducts(); loadCart(); loadWishlist();