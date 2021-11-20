const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')    

    const getData = () => {
        fetch ('https://willberies-dce44-default-rtdb.firebaseio.com/db.json')
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('goods',JSON.stringify(data))
    })
    }
    
    links.forEach((link) => {
        link.addEventListener('click',(e) => {
            e.preventDefault()
            
            getData()
            console.log(link.textContent)
        })        
    })    

    //localStorage.setItem('goods',JSON.stringify([1,2,3,4,5]))
    //console.log(JSON.parse(localStorage.getItem('goods')))
}

getGoods()