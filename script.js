

const getProducts = async (productLoading) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        productLoading(data);
    } catch (error) {

    }
};

const displayTrend = (products) => {
    const productCardContainer = document.getElementById('trending-product');

    productCardContainer.innerHTML = '';

    const productsDisplay = products.slice(0, 3);

    if (products.length === 0) {
        productCardContainer.innerHTML = `<span class="loading loading-infinity loading-xl"></span>`;
        return;
    }

    productsDisplay.forEach((product) => {
        const card = document.createElement('div');

        card.innerHTML = `

        <div class="card bg-base-100 shadow-sm">
            <figure>
                <img class="w-full h-50 object-contain bg-gray-300" src="${product.image}"alt="${product.cetagory}" />
             </figure>
             <div class='m-2'>
             <div class='flex justify-between'>
             <h6>${product.category}</h6>
             <h6><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i>${product.rating.rate} (${product.rating.count})</h6>
             
             </div>
            <div class="card-body">
                 <h2 class="card-title">${product.title.slice(0, 30)}..</h2>
                 <h3 class="font-bold text-xl">$${product.price}</h3>
                 <div class="card-actions justify-end">
                  <button class="btn btn-primary">Buy Now</button>
                </div>
             </div>
             </div>
        </div>
        `;

        // ৪. মেইন কন্টেইনারে কার্ডটি ঢুকিয়ে দেওয়া
        productCardContainer.appendChild(card);
    });
};

// ফাংশনটি রান করা
getProducts(displayTrend);


