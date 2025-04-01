document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll(".mini-link");
    let prev = null;
    
    // Mapping section IDs to corresponding menu link IDs
    let sectionToMenuMap = {
        "featuredCarousel": "featuredCarouselMenu",
        "itemBoxes": "itemBoxesMenu",
        "pokecoinsSection": "pokecoinsMenu",
        "dailybundlesSection": "daily-bundlesMenu",
    };

    function updateActiveSection() {
        let scrollPosition = window.scrollY + 10; // Slight offset for better detection

        sections.forEach((section) => {
            let top = section.offsetTop;
            let bottom = top + section.offsetHeight;
            let sectionId = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < bottom) {
                let menuId = sectionToMenuMap[sectionId];
                if (menuId) {
                    transferActive(menuId);
                }
            }
        });
    }

    function transferActive(item) {
        let currmenu = document.getElementById(item);
        if (!currmenu || item === prev) return;

        let prevmenu = prev ? document.getElementById(prev) : null;
        if (prevmenu) prevmenu.classList.remove("active");

        currmenu.classList.add("active");
        prev = item;
    }

    // Attach click event to menu items for smooth scrolling
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                let navbarHeight = document.querySelector(".mini-navbar")?.offsetHeight || 0;
                let offset = 70; // Adjust this value to control how much below the section it lands

                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight + offset,
                    behavior: "smooth",
                });

                setTimeout(() => transferActive(this.id), 300); // Ensure active class updates after scroll
            }
        });
    });

    window.addEventListener("scroll", updateActiveSection);
});

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

  document.addEventListener("DOMContentLoaded", function () {
    const priceButtons = document.querySelectorAll(".priceButton");
    const popupOverlay = document.getElementById("cardPopup");
    const popupCardImage = document.getElementById("popupCardImage");
    const popupCardPrice = document.getElementById("popupCardPrice");
    const closeButton = document.querySelector(".close-btn");

    // Function to show popup
    function showPopup(event) {
        let card = event.target.closest(".card"); // Find the parent card
        if (!card) return;

        let cardImage = card.querySelector("img").src;
        let cardPrice = card.querySelector(".priceButton p").textContent;

        popupCardImage.src = cardImage;
        popupCardPrice.textContent = cardPrice;
        popupOverlay.style.display = "flex";
    }

    // Attach event listeners to all price buttons
    priceButtons.forEach(button => {
        button.addEventListener("click", showPopup);
    });

    // Close popup when clicking outside or using close button
    popupOverlay.addEventListener("click", function (event) {
        if (event.target === popupOverlay || event.target === closeButton) {
            popupOverlay.style.display = "none";
        }
    });
});

// CARD FUNCTION
// Create a global overlay element
let overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

function showCard(card) {
    let item = document.getElementById(card);
    let overlay = document.getElementById('overlay');

    // Show pop-up
    item.style.display = 'flex'; // Ensure it's visible before animation
    setTimeout(() => {
        item.style.transform = 'translate(-50%, -50%)';
        item.style.opacity = '1';
    }, 10);

    // Show overlay (dark background)
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.opacity = '0.5'; // Darker effect
    }, 10);
}

function closeCard(card) {
    let item = document.getElementById(card);
    let overlay = document.getElementById('overlay');

    // Hide pop-up
    item.style.transform = 'translate(-50%, 100%)';
    item.style.opacity = '0';

    // Hide overlay
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        item.style.display = 'none'; // Hide pop-up completely
        overlay.style.display = 'none'; // Hide overlay
    }, 300); // Matches transition duration
}

