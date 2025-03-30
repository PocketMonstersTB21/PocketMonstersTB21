let prev = "", curr;
let isActive = true;

function transferActive(item){
    curr = item;
    let currmenu = document.getElementById(curr);
    currmenu.classList.add("active");
    // console.log(curr)
    let prevmenu = document.getElementById(prev);
    prev = curr;
    prevmenu.classList.remove("active");
    // console.log(prev)
}

var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });

