const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')   
    const allBtn = document.querySelector('.more')     

    const addToCart = (cartItem) => {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        //console.log(cartArray.some((item) => item.id === cartItem.id))
        if (cartArray.some((item) => item.id === cartItem.id)) {
            cartArray.map((item) => {
            if (item.id === cartItem.id) {
                item.count++;
            }
            return item;
            })
        } else {           
            cartArray.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cartArray));
    };

    const renderGoods = (goods) => {
        const goodsList = document.querySelector('.long-goods-list')

        goodsList.innerHTML = ''

        goods.forEach(({label, img, description, name, id, price}) => {
            const goodBlock = document.createElement('div')

            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')

            goodBlock.innerHTML = `
                <div class="goods-card">
					<span class="label ${label ? null : 'd-none'}">${label}</span>
					<img src="db/${img}" alt="image: ${name}" class="goods-image">
					<h3 class="goods-title">${name}</h3>
					<p class="goods-description">${description}</p>
					<button class="button goods-card-btn add-to-cart" data-id="${id}">
					    <span class="button-price">$${price}</span>
					</button>
				</div>`

            goodsList.append(goodBlock)    
            
            const addToCartBtn = goodBlock.querySelector('.add-to-cart')
            addToCartBtn.addEventListener('click', (e) => {
                console.log(addToCartBtn.textContent)
                addToCart({label, img, description, name, id, price, count: 1})
            })
        })
        
    }
    
    const getData = (category, goodValue) => {
        fetch ('https://willberies-dce44-default-rtdb.firebaseio.com/db.json')
        .then((res) => res.json())
        .then((data) => {
            const dataGoods = category ? data.filter ((item) => item[category] == goodValue) : data
        
            if (window.location.pathname !== '/goods.html') {
                window.location.href ='/goods.html'
            } else {
                renderGoods(dataGoods)
            }

            localStorage.setItem('goods',JSON.stringify(dataGoods))
        })
    }    

    links.forEach((link) => {
        link.addEventListener('click',(e) => {
            e.preventDefault()
            
            const goodValue = link.textContent
            const category = link.dataset.field

            getData(category, goodValue)   
            //console.log(category, goodValue)        
        })  
    })    

    if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }    
    
    if (allBtn) {
    allBtn.addEventListener('click', (e) => {
        e.preventDefault()
        
            getData()         
        }
    )}   
}

getGoods()