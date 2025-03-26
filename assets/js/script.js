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



// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("loginForm");
//     // const promoCarousel = document.getElementById("promoCarousel");

//     // promoCarousel.classList.remove("show-carousel");

//     loginForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//         const email = document.getElementById("loginEmail").value;
//         const password = document.getElementById("loginPassword").value;

//         if (email === "admin@pokemongo.com" && password === "password") {
//             document.getElementById("navbar-guest").classList.add("d-none");
//             document.getElementById("navbar-auth").classList.remove("d-none");

//             promoCarousel.classList.add("show-carousel");


//             const carouselInstance = new bootstrap.Carousel(promoCarousel, {
//                 interval: 3000,
//                 ride: "carousel",
//             });

//             const loginModalElement = document.getElementById("loginModal");
//             const loginModal = bootstrap.Modal.getInstance(loginModalElement);
//             if (loginModal) {
//                 loginModal.hide();
//             }

//             setTimeout(() => {
//                 promoCarousel.scrollIntoView({ behavior: "smooth" });
//             }, 500);
//         } else {
//             alert("Invalid email or password. Please try again!");
//         }
//     });
// });

// Featured Carousel
// let currentIndex = 0;
//     const slides = document.querySelectorAll('.carousel-item');
//     const dots = document.querySelectorAll('.dot');

//     function showSlide(index) {
//         if (index >= slides.length) {
//             index = 0;
//         } else if (index < 0) {
//             index = slides.length - 1;
//         }

//         const offset = -index * 100;
//         document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;

//         dots.forEach((dot) => dot.classList.remove('active'));
//         dots[index].classList.add('active');

//         currentIndex = index;
//     }
//     setInterval(() => {
//         currentIndex++;
//         showSlide(currentIndex);
//     }, 4000);

//     showSlide(currentIndex);