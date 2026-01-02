
const STORAGE_KEY='products_v1';
let products=JSON.parse(localStorage.getItem(STORAGE_KEY))||[];
let currentView='list',editIndex=null,searchText='',currentPage=1;
let PAGE_SIZE=5,sortMode='';

const toastEl = document.getElementById('toast'); // FIX: define toastEl properly
const name = document.getElementById('name');
const price = document.getElementById('price');
const category = document.getElementById('category');
const stock = document.getElementById('stock');
const description = document.getElementById('description');
const nameError = document.getElementById('nameError');
const priceError = document.getElementById('priceError');
const categoryError = document.getElementById('categoryError');
const productForm = document.getElementById('productForm');
const productContainer = document.getElementById('productContainer');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const pageSizeSelect = document.getElementById('pageSizeSelect');
const formTitle = document.getElementById('formTitle');
const listBtn = document.getElementById('listBtn');
const cardBtn = document.getElementById('cardBtn');
const testResults = document.getElementById('testResults');

function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(products));}
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),2000);} 

function toggleDark(){document.body.classList.toggle('dark');}
function setView(v){currentView=v;listBtn.classList.toggle('active',v==='list');cardBtn.classList.toggle('active',v==='card');render();}
function safeTrim(el){return el&&typeof el.value==='string'?el.value.trim():'';}
function validate(){let ok=true;nameError.textContent=priceError.textContent=categoryError.textContent='';
 if(!safeTrim(name)){nameError.textContent='Required';ok=false;}
 if(!price.value||price.value<=0){priceError.textContent='Invalid';ok=false;}
 if(!safeTrim(category)){categoryError.textContent='Required';ok=false;}
 return ok;}

productForm.onsubmit=e=>{e.preventDefault();if(!validate())return;
 const p={name:safeTrim(name),price:+price.value,category:safeTrim(category),stock:stock.value,description:description.value};
 if(editIndex!==null){products[editIndex]=p;editIndex=null;toast('Product updated');}
 else{products.push(p);toast('Product added');}
 productForm.reset();save();render();};

function editProduct(i){const p=products[i];if(!p)return;name.value=p.name;price.value=p.price;category.value=p.category;stock.value=p.stock;description.value=p.description;editIndex=i;formTitle.textContent='Edit Product';}
function deleteProduct(i){products.splice(i,1);save();toast('Product deleted');render();}

searchInput.oninput=e=>{searchText=(e.target.value||'').toLowerCase();currentPage=1;render();};
sortSelect.onchange=e=>{sortMode=e.target.value;render();};
pageSizeSelect.onchange=e=>{PAGE_SIZE=+e.target.value;currentPage=1;render();};

function render(){
 let list=products.map((p,i)=>({...p,_i:i})).filter(p=>(p.name||'').toLowerCase().includes(searchText));
 if(sortMode==='name-asc')list.sort((a,b)=>a.name.localeCompare(b.name));
 if(sortMode==='price-asc')list.sort((a,b)=>a.price-b.price);
 if(sortMode==='price-desc')list.sort((a,b)=>b.price-a.price);
 const pages=Math.max(1,Math.ceil(list.length/PAGE_SIZE));currentPage=Math.min(currentPage,pages);
 const page=list.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE);
 if(currentView==='list'){
  productContainer.innerHTML=`<table><thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th></tr></thead><tbody>${page.map(p=>`<tr><td>${p.name}</td><td>${p.price}</td><td>${p.category}</td><td>${p.stock||'-'}</td><td><button class='btn btn-edit' onclick='editProduct(${p._i})'>Edit</button> <button class='btn btn-delete' onclick='deleteProduct(${p._i})'>Delete</button></td></tr>`).join('')}</tbody></table>`;
 } else {
  productContainer.innerHTML=`<div class='grid'>${page.map(p=>`<div class='card'><h3>${p.name}</h3><p>₹${p.price}</p><p>${p.category}</p><button class='btn btn-edit' onclick='editProduct(${p._i})'>Edit</button> <button class='btn btn-delete' onclick='deleteProduct(${p._i})'>Delete</button></div>`).join('')}</div>`;
 }
 pagination.innerHTML=Array.from({length:pages},(_,i)=>`<button class='${i+1===currentPage?'active':''}' onclick='currentPage=${i+1};render()'>${i+1}</button>`).join('');
}

function exportJSON(){const blob=new Blob([JSON.stringify(products,null,2)],{type:'application/json'});download(blob,'products.json');}
function exportCSV(){const csv=['name,price,category,stock,description',...products.map(p=>`${p.name},${p.price},${p.category},${p.stock},${p.description}`)].join('\n');download(new Blob([csv],{type:'text/csv'}),'products.csv');}
function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();}

/* Unit tests */
function test(n,f){try{f();log(`✔ ${n}`);}catch(e){log(`✘ ${n}`);}}
function expect(v){return{toBe:x=>{if(v!==x)throw Error();}}}
function log(m){testResults.innerHTML+=m+'<br>';} 

test('Validation fails on empty',()=>{name.value='';price.value='';category.value='';expect(validate()).toBe(false);});
test('Add product increases length',()=>{const l=products.length;products.push({name:'X',price:1,category:'C'});save();expect(products.length).toBe(l+1);});

render();
