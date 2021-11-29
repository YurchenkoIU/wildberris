const cart = () => {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = cart.querySelector('.modal-close')
    const cartTableGoods = document.querySelector('.cart-table__goods')
    const cardTableTotal = document.querySelector('.card-table__total')

    console.log(cartTableGoods)

    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map((item) => {
            if (item.id === id) {
                item.count++;
            }
            return item;
        })

        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderItems(cartArray);        
    }

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0;
            }
            return item;
        })  

        localStorage.setItem('cart', JSON.stringify(cartArray));
        renderItems(cartArray);        
    }

    const deleteGoods = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map((item) => {
            if (item.id === id) {
                item.count = 0;
            }
            return item;
        })  

        localStorage.setItem('cart', JSON.stringify(cartArray));        
        renderItems(cartArray);        
    }

    const summCount = () => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))        

        return cartArray.reduce(function(sum, current) {
            return sum + current.count*current.price;
        }, 0)
    }
    
    const renderItems = (data) => {
        cartTableGoods.innerHTML='';

        data.forEach(({name, price, count, id}) => {  
            if (count !==0) {
            const cartElem = document.createElement('tr');        

            cartElem.classList.add('good-row');

            cartElem.innerHTML =`
                <td>${name}</td>
				    <td>${price}$</td>
				    <td><button class="cart-btn-minus" data-index="${id}">-</button></td>
				    <td>${count}</td>
				    <td><button class=" cart-btn-plus" data-index="${id}">+</button></td>
				    <td>${price*count}$</td>
				    <td><button class="cart-btn-delete" data-index="${id}">x</button></td>
            `
            cartTableGoods.append(cartElem); 
            } 
            
        })
        cardTableTotal.textContent = `${summCount()}$`
    }
    
    cartBtn.addEventListener('click', () => {
        cart.style.display = 'flex'
    })

    closeBtn.addEventListener('click', () => {
        cart.style.display = ''
    })

    cartBtn.addEventListener('click', () => {
        cart.classList.add('is-open');
        //console.log('123');
        if (localStorage.getItem('cart')) {
        renderItems(JSON.parse(localStorage.getItem('cart')))        
        };
    });

    cart.addEventListener('click', (e) => {
        e.preventDefault;

        if (e.target.classList.contains ('cart-btn-plus')) {
            incrementCount(e.target.dataset.index);
            //console.log(e.target.dataset.index);
        } else if (e.target.classList.contains ('cart-btn-minus')) {
            decrementCount(e.target.dataset.index);
            //console.log('minus');
        } else if (e.target.classList.contains ('cart-btn-delete')) {
            deleteGoods(e.target.dataset.index);
            console.log('delete');
        }
        //modalPricetag.textContent = summCount();
    })


} 

cart()