import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js'

const slider = () => {
    const swiper = new Swiper('.swiper', {
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        //autoplay: {
        //    delay: 2500,
        //    disableOnInteraction: false,
        //  },
        pagination: {
            el: ".swiper-pagination",            
            //clickable: true,
            
          },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    })
}

slider()