let currentImageIndex = 0;
let galleryImages = [];

document.addEventListener("DOMContentLoaded", () => {

    // ================= NAV MENU =================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuToggle.textContent =
                navMenu.classList.contains("active")
                    ? "✕"
                    : "☰";
        });

        document.querySelectorAll("#navMenu a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";
            });

        });
    }

    // ================= HERO SEARCH =================

    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            const propertyType =
                document.getElementById("propertyType")?.value;

            const location =
                document.getElementById("location")?.value;

            const dealType =
                document.getElementById("dealType")?.value;

            const priceRange =
                document.getElementById("priceRange")?.value;

            console.log({
                propertyType,
                location,
                dealType,
                priceRange
            });

            document
                .getElementById("properties")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });
    }

    // ================= PROPERTY TABS =================

    const tabButtons =
        document.querySelectorAll(".tab-btn");

    const tabContents =
        document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetTab =
                button.dataset.tab;

            tabButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            tabContents.forEach(tab =>
                tab.classList.remove("active")
            );

            button.classList.add("active");

            document
                .getElementById(targetTab)
                ?.classList.add("active");
        });
    });

    // ================= OFFERS SECTION =================

    const offersToggle =
        document.getElementById("offersToggle");

    const offersContainer =
        document.getElementById("offersContainer");

    const offerCards =
        document.querySelectorAll(".offer-card");

    if (offersToggle && offersContainer) {

        offersToggle.addEventListener("click", () => {

            offersContainer.classList.toggle("active");

            if (offersContainer.classList.contains("active")) {

                offersToggle.textContent =
                    "Hide Offers";

                offerCards.forEach(card =>
                    card.classList.remove("show")
                );

                offerCards.forEach((card, index) => {

                    setTimeout(() => {

                        card.classList.add("show");

                    }, index * 700);

                });

            } else {

                offersToggle.textContent =
                    "View Offers";

                offerCards.forEach(card =>
                    card.classList.remove("show")
                );
            }
        });
    }

    // ================= PROPERTY DETAILS =================

    const properties = {

        kenol: {
            title: "Luxury Family Home - Kenol",
            price: "KES 18,500,000",
            location: "Kenol",
            bedrooms: "4 Bedrooms",
            type: "House",
            hero: "assets/kenolhouse.jpg",

            gallery: [
                "assets/living1.jpg",
                "assets/kitchen1.jpg",
                "assets/bedroom1.jpg",
                "assets/bathroom1.jpg",
                "assets/balcony1.jpg",
                "assets/fireplace2.jpg"
            ],

            description:
                "Modern family home located in Kenol featuring spacious living areas, premium finishes, secure compound and easy access to major roads.",

            features: [
                "4 Spacious Bedrooms",
                "3 Bathrooms",
                "Modern Kitchen",
                "Private Balcony",
                "Parking for 3 Cars",
                "Secure Compound"
            ]
        },

        diani: {
            title: "Beachfront Villa - Diani",
            price: "KES 42,000,000",
            location: "Diani",
            bedrooms: "5 Bedrooms",
            type: "Villa",
            hero: "assets/dianihouse.jpg",

            gallery: [
                "assets/living2.jpg",
                "assets/kitchen2.jpg",
                "assets/bedroom2.jpg",
                "assets/bathroom2.jpg",
                "assets/balcony2.jpg",
                "assets/dining2.jpg"
            ],

            description:
                "Beautiful beachfront villa located in Diani. Perfect for luxury living, holiday rentals and long-term investment.",

            features: [
                "Beach Access",
                "Swimming Pool",
                "5 Bedrooms",
                "Large Garden",
                "Ocean View",
                "Staff Quarters"
            ]
        },

        matuu: {
            title: "Prime Land - Matuu",
            price: "KES 2,500,000",
            location: "Matuu",
            size: "1 Acre",
            type: "Land",
            hero: "assets/matuuland.jpeg",

            gallery: [
                "assets/matuuland.jpeg",
                "assets/matuuad.jpg",
                "assets/matuuad2.jpg"
            ],

            description:
                "Prime land suitable for residential or commercial development. Located near major roads and growing infrastructure.",

            features: [
                "1 Acre",
                "Ready Title",
                "Road Access",
                "Electricity Nearby",
                "Water Available",
                "Fast Growing Area"
            ]
        }
    };

    const params =
        new URLSearchParams(window.location.search);

    const propertyId =
        params.get("id") || "kenol";

    const property =
        properties[propertyId];

    if (property) {

        document.getElementById("propertyTitle") &&
            (document.getElementById("propertyTitle").textContent =
                property.title);

        document.getElementById("propertyPrice") &&
            (document.getElementById("propertyPrice").textContent =
                property.price);

        const meta =
            document.getElementById("heroMeta");

        if (meta) {

            meta.innerHTML = "";

            if (property.location) {
                meta.innerHTML +=
                    `<span> ${property.location}</span>`;
            }

            if (property.bedrooms) {
                meta.innerHTML +=
                    `<span>🛏 ${property.bedrooms}</span>`;
            }

            if (property.size) {
                meta.innerHTML +=
                    `<span> ${property.size}</span>`;
            }

            meta.innerHTML +=
                `<span>${property.type}</span>`;
        }

        const gallery =
    document.getElementById("gallery");

if (gallery) {

    gallery.innerHTML = "";

    const allImages = [
        property.hero,
        ...property.gallery
    ];

    galleryImages = allImages;

    allImages.forEach((image, index) => {

    const img = document.createElement("img");

    img.loading = "lazy";
    img.decoding = "async";
    img.src = image;

    img.addEventListener("click", () => {

        currentImageIndex = index;
        openLightbox(index);

    });

    gallery.appendChild(img);

});

}

        const description =
            document.getElementById("description");

        if (description) {
            description.textContent =
                property.description;
        }

        const features =
            document.getElementById("features");

        if (features) {

            features.innerHTML = "";

            property.features.forEach(feature => {

                const li =
                    document.createElement("li");

                li.textContent = feature;

                features.appendChild(li);
            });
        }
    }

    // ================= MODERN LIGHTBOX =================

const lightbox =
    document.getElementById("lightbox");

function openLightbox(startIndex = 0){

    if(!lightbox) return;

    lightbox.innerHTML = `

        <button class="lightbox-arrow lightbox-prev">
            ❮
        </button>

        <div class="lightbox-track">
            ${galleryImages.map(img => `
                <img
                    src="${img}"
                    alt=""
                    loading="eager"
                    decoding="sync"
                    draggable="false"
                >
            `).join("")}
        </div>

        <button class="lightbox-arrow lightbox-next">
            ❯
        </button>

        <span class="close-lightbox">
            &times;
        </span>

        <div class="lightbox-counter">
            ${startIndex + 1} / ${galleryImages.length}
        </div>
    `;

    lightbox.style.display = "block";

    const track =
        lightbox.querySelector(".lightbox-track");

    const images =
        track.querySelectorAll("img");

    let current = startIndex;

    const counter =
        lightbox.querySelector(".lightbox-counter");

    images[current].scrollIntoView({
        behavior:"auto",
        inline:"center"
    });

    function updateCounter(){

        counter.textContent =
            `${current + 1} / ${galleryImages.length}`;
    }

    function showImage(index){

        current = index;

        images[current].scrollIntoView({
            behavior:"smooth",
            inline:"center"
        });

        updateCounter();
    }

    // CLOSE

    lightbox
        .querySelector(".close-lightbox")
        .addEventListener("click", closeLightbox);

    // NEXT

    lightbox
        .querySelector(".lightbox-next")
        .addEventListener("click", ()=>{

            showImage(
                (current + 1) %
                galleryImages.length
            );

        });

    // PREVIOUS

    lightbox
        .querySelector(".lightbox-prev")
        .addEventListener("click", ()=>{

            showImage(
                current === 0
                ? galleryImages.length - 1
                : current - 1
            );

        });

    // TAP TO ZOOM

    images.forEach(img => {

        img.addEventListener("click", e => {

            e.stopPropagation();

            if(img.classList.contains("zoomed")){

                img.classList.remove("zoomed");

            }else{

                images.forEach(i =>
                    i.classList.remove("zoomed")
                );

                img.classList.add("zoomed");
            }

        });

    });

    // KEYBOARD NAVIGATION

    function keyHandler(e){

        if(lightbox.style.display !== "block")
            return;

        if(e.key === "Escape")
            closeLightbox();

        if(e.key === "ArrowRight")
            showImage(
                (current + 1) %
                galleryImages.length
            );

        if(e.key === "ArrowLeft")
            showImage(
                current === 0
                ? galleryImages.length - 1
                : current - 1
            );
    }

    lightbox.dataset.keyhandler = "true";
}

function closeLightbox(){

    if(!lightbox) return;

    lightbox.style.display = "none";

    lightbox.innerHTML = "";
}

if(lightbox){

    lightbox.addEventListener("click", e => {

        if(e.target === lightbox){

            closeLightbox();
        }

    });

}

const backBtn = document.getElementById("backBtn");

if (backBtn) {

    backBtn.addEventListener("click", () => {

        const returnUrl =
            sessionStorage.getItem("returnUrl");

        if (returnUrl) {

            window.location.href = returnUrl;

        } else {

            window.history.back();

        }

    });

}

const slides =
    document.querySelectorAll(".slideshow img");

if (slides.length) {

    let currentSlide = 0;

    slides[currentSlide].classList.add("active");

    setInterval(() => {

        slides[currentSlide].classList.remove("active");

        currentSlide =
            (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");

    }, 5000);
}

// ================= DEFAULT TAB =================

window.addEventListener("load", () => {

    document
        .getElementById("apartments")
        ?.classList.add("active");
});

// ================= NAVBAR SCROLL EFFECT =================

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(17,17,17,0.95)";

        navbar.style.backdropFilter =
            "blur(10px)";

    } else {

        navbar.style.background =
            "#111";

        navbar.style.backdropFilter =
            "none";
    }
});

document
    .querySelectorAll(".property-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            sessionStorage.setItem(
                "returnUrl",
                window.location.href
            );

            sessionStorage.setItem(
                "returnScroll",
                window.scrollY
            );

        });

    });

window.addEventListener("load", () => {

    const savedScroll =
        sessionStorage.getItem("returnScroll");

    if (savedScroll) {

        window.scrollTo({
    top: Number(savedScroll),
    behavior: "auto"
});

        sessionStorage.removeItem("returnScroll");
    }

});