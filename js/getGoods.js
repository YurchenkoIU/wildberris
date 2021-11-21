const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')   
    const allBtn = document.querySelector('.more') 

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

    try {
    allBtn.addEventListener('click', (e) => {
        e.preventDefault()

            getData()   
        }
    )}
    catch(error) {
            console.log(error.message)
        }  
    
    //localStorage.setItem('goods',JSON.stringify([1,2,3,4,5]))
    //console.log(JSON.parse(localStorage.getItem('goods')))
}

getGoods()