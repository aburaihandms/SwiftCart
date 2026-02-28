


let count = 0;
function counter() {
    count++;
    document.getElementById("counter").innerText = count;
};




const getProducts = async (callbackFunc, isTrending = false) => {
    if (isTrending) {
        manageTrendingLoader(true);
    } else {
        manageProductLoader(true);
    }

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        callbackFunc(data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

const categoruButton = async () => {
    const url = "https://fakestoreapi.com/products/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayProduct(data);

};


const loadProduct = async (category) => {

    manageProductLoader(true)

    const url = `https://fakestoreapi.com/products/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    allProduct(data);
};

const loadProductsDetails = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    const res = await fetch(url);
    const Details = await res.json();
    modalDetails(Details);
};

const manageProductLoader = (status) => {
    if (status == true) {
        document.getElementById("products-loader").classList.remove("hidden")
        document.getElementById("products-list").classList.add("hidden")

    } else {
        document.getElementById("products-list").classList.remove("hidden")
        document.getElementById("products-loader").classList.add("hidden")
    }
};

const manageTrendingLoader = (status) => {
    if (status == true) {
        document.getElementById("trending-loader").classList.remove("hidden")
        document.getElementById("trending-product").classList.add("hidden")

    } else {
        document.getElementById("trending-product").classList.remove("hidden")
        document.getElementById("trending-loader").classList.add("hidden")
    }
};

const modalDetails = (product) => {
    const showProductsDetails = document.getElementById("showModalDetails")
    showProductsDetails.innerHTML = `
    <div class="card bg-base-100 image-full w-full shadow-sm">
            <figure>
                <img class=" w-full h-50 object-contain relative" src="${product.image}" alt="${product.category}" />
            </figure>
             <div class="w-full h-full bg-white/20 backdrop-invert backdrop-opacity-10 absolute"></div>
             <div class="card-body  ">
                 <h2 class="card-title  text-black">${product.title}</h2>
                 <p class=" text-black">${product.description}</p>
             </div>
     </div>
        <div class="justify-between flex">
                    <h2 class="font-bold">$ ${product.price}</h2>
                    <h6><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1); font-bold"></i>${product.rating.rate} (${product.rating.count})</h6>
         </div>
    `;

    document.getElementById("productModal").showModal();


};


const removeActive = () => {
    const allBtns = document.querySelectorAll(".categoryBtn");
    allBtns.forEach(btn => {
        btn.classList.remove("active", "text-white", "bg-primary");
    });
};

const displayProduct = (categories) => {
    const btnContainer = document.getElementById("catagoryBtn");
    btnContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = "categoryBtn btn btn-soft btn-primary rounded-4xl active text-white bg-primary";
    allBtn.innerText = "All";

    allBtn.onclick = () => {
        removeActive();
        allBtn.classList.add("active", "text-white", "bg-primary");
        getProducts(allProduct);
    };
    manageProductLoader(false)
    btnContainer.appendChild(allBtn);


    categories.forEach((category) => {
        const safeId = category.replace(/[^a-zA-Z0-9]/g, "-");
        const btn = document.createElement("button");
        btn.id = safeId;
        btn.className = "categoryBtn btn btn-soft btn-primary rounded-4xl";
        btn.innerText = category;
        btn.onclick = () => {
            removeActive();
            btn.classList.add("active", "text-white", "bg-primary");
            loadProduct(category);
        };

        btnContainer.appendChild(btn);
    });
    manageProductLoader(false)
};
categoruButton();



const allProduct = (products) => {
    const productCardContainer = document.getElementById('products-list');
    productCardContainer.innerHTML = '';
    products.forEach((product) => {
        const card = document.createElement('div');
        card.innerHTML = `

        <div class="card bg-base-100 shadow-sm">
            <figure>
                <img class="w-full h-50 object-contain bg-gray-300" src="${product.image}"alt="${product.category}" />
             </figure>
             <div class='m-2'>
             <div class='flex justify-between'>
             <h6 class="rounded-full w-auto h-auto bg-slate-200">${product.category}</h6>
             <h6><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i>${product.rating.rate} (${product.rating.count})</h6>
             </div>

            <div class="card-body">
                 <h2 class="card-title">${product.title.slice(0, 25)}..</h2>
                 <h3 class="font-bold text-xl">$${product.price}</h3>
                 <div class="card-actions justify-between pt-1">
                  <button onclick="loadProductsDetails(${product.id})" class="btn btn-outline"> <i class="fa-regular fa-eye" style="color: rgb(0, 0, 0);"></i> Details </button>
                  <button onclick="counter()" class="btn btn-primary"><i class="fa-solid fa-cart-arrow-down fa-lg" style="color: rgb(255, 255, 255);"></i> Buy Now</button>
                </div>
             </div>
             </div>
        </div>
        `;
        productCardContainer.appendChild(card);
    });
    manageProductLoader(false)
};
getProducts(allProduct)



const displayTrend = (products) => {
    const productCardContainer = document.getElementById('trending-product');
    productCardContainer.innerHTML = '';
    const productsDisplay = products.slice(0, 3);
    productsDisplay.forEach((product) => {
        const card = document.createElement('div');
        card.innerHTML = `

        <div class="card bg-base-100 shadow-sm">
            <figure>
                <img class="w-full h-50 object-contain bg-gray-300" src="${product.image}"alt="${product.category}" />
             </figure>
             <div class='m-2'>
             <div class='flex justify-between'>
             <h6 class="rounded-full w-auto h-auto bg-slate-200">${product.category}</h6>
             <h6><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i>${product.rating.rate} (${product.rating.count})</h6>
             
             </div>
            <div class="card-body">
                 <h2 class="card-title">${product.title.slice(0, 30)}..</h2>
                 <h3 class="font-bold text-xl">$${product.price}</h3>
                 <div class="card-actions justify-between pt-1">
                  <button onclick="loadProductsDetails(${product.id})" class="btn btn-outline"> <i class="fa-regular fa-eye" style="color: rgb(0, 0, 0);"></i> Details </button>
                  <button onclick="counter()" class="btn btn-primary"><i class="fa-solid fa-cart-arrow-down fa-lg" style="color: rgb(255, 255, 255);"></i> Buy Now</button>
                </div>
             </div>
             </div>
        </div>
        `;
        productCardContainer.appendChild(card);
    });
    manageTrendingLoader(false);
};
getProducts(displayTrend, true);


