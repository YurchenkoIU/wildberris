const goods = () => {
    const addToCartBtn = document.querySelectorAll('.add-to-cart')    

    const addToCart = (cartItem) => {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        //console.log(cartArray.some((item) => item.id === cartItem.id))
        /*if (cartArray.some((item) => item.id === cartItem.id)) {
            cartArray.map((item) => {
            if (item.id === cartItem.id) {
                item.count++;
            }
            return item;
            })
        } else {   */         
            cartArray.push(cartItem);
        //}

        localStorage.setItem('cart', JSON.stringify(cartArray));
    };
    
    addToCartBtn.forEach((addToCartBtn) => {
        addToCartBtn.addEventListener('click', (e) => {
            console.log(addToCartBtn.textContent)
        })
    })
}

goods()