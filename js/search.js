const search = () => {
    const input = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')

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
        })
        
    }
    
    const getData = (value) => {
        fetch ('https://willberies-dce44-default-rtdb.firebaseio.com/db.json')
        .then((res) => res.json())
        .then((data) => {
            const dataGoods = data.filter((good) => good.name.toLowerCase().includes(value.toLowerCase()))
            
            if (window.location.pathname !== '/goods.html') {
                window.location.href ='/goods.html'
            } else {
                renderGoods(dataGoods)
            }

            localStorage.setItem('goods',JSON.stringify(dataGoods))
        })
    }


    try {
        searchBtn.addEventListener('click', () => {
            console.log(input.value)

            getData(input.value)
        })
    }
    catch(e) {
        console.log(e.message)
    }

    
}

search()