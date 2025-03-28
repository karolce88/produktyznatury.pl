document.addEventListener('DOMContentLoaded', () => {
	let productsData = []
	let currentPage = 1
	const productsPerPage = 10

	const requestError = () => {
		const productsList = document.querySelector('.products-container')

		if (productsList) {
			productsList.innerHTML =
				'<div class="error"><p class="error__txt-head">Przepraszamy!</p><p class="error__txt">Wystąpił błąd podczas ładowania produktów.</p><p class="error__btn">Załaduj produkty</p></div>'
		}
	}

	function loadProducts() {
		const start = (currentPage - 1) * productsPerPage
		const end = start + productsPerPage
		const productsToLoad = productsData.slice(start, end)
		const productsContainer = document.querySelector('.products-container')

		productsToLoad.forEach((product) => {
			const productHtml = `
      <div class="product" data-id="${product.id}">
        <div class="product-image">
			<a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}">
			 </a>
        </div>
        <div class="product-content">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-price">Cena: <span class="price">${product.price}</span> zł</div>
          <button class="product-btn">Dodaj do koszyka</button>
        </div>
      </div>`
			const tempDiv = document.createElement('div')
			tempDiv.innerHTML = productHtml
			if (productsContainer) {
				productsContainer.appendChild(tempDiv.firstElementChild)
			}
		})
		currentPage++
	}

	const loadingIndicator = document.querySelector('.loading')

	if (loadingIndicator) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						loadProducts()
					}
				})
			},
			{
				rootMargin: '100px',
			}
		)

		observer.observe(loadingIndicator)
	}

	const loadAllProducts = () => {
		fetch('dist/DB/products.json')
			.then((response) => response.json())
			.then((data) => {
				productsData = data.products
				loadProducts()
			})
			.catch((error) => {
				console.error('Błąd wczytywania produktów:', error)
				requestError()
			})
	}
	loadAllProducts()

	const errorBtn = document.querySelector('.error__btn')
	if (errorBtn) {
		errorBtn.addEventListener('click', () => {
			loadAllProducts()
		})
	}

	const checkIsProductSite = document.querySelector('.isProductSite')

	if (checkIsProductSite) {
		const urlParams = new URLSearchParams(window.location.search)
		const num = urlParams.get('id')
		const number = num - 1
	
		const createProduct = (product) => {
			document.title = `${product.name} - produktyznatury.pl`
			
			const productCardHtml = `<div class="product-card__left">
               <div class="product-card__picture">
                  <img class="product-card__img" src="${product.image}" alt="${product.name}">
               </div>
               <div class="product-card__details">
                  <h1 class="product-card__name">${product.name}</h1>
                  <p class="product-card__description">${product.description}</p>
                  <p class="product-card__price">Cena: <span class=product-card__price>${product.price}</span> zł</p>
                  <button class="product-card__btn product-btn">Dodaj do koszyka</button>
               </div>
            </div>`

				const productsContainer = document.querySelector('.product-card__info')

				const tempDiv = document.createElement('div')
				tempDiv.innerHTML = productCardHtml
				if (productsContainer) {
					productsContainer.appendChild(tempDiv.firstElementChild)
				}
		}

		const getProductData = () => {
			fetch('dist/DB/products.json')
			.then((response) => response.json())
			.then((data) => {
				createProduct(data.products[number])
				console.log(data.products[number]);
			})
			.catch((error) => {
				console.error('Błąd wczytywania produktów:', error)
			})
		}
		getProductData();
	}

	
}) // end
