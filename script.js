const tl = gsap.timeline({defaults: { ease: "power1.out"} });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25});

tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5});

tl.to(".intro", { y: "-100%", duration:1 }, "-=1");

tl.fromTo('nav',{opacity: 0}, {opacity:1, duration: 1 });
tl.fromTo('.big-text',{opacity: 0}, {opacity:1, duration: 1 }, '-=1');


// Button to up

const goTopBtn = document.querySelector(".go-top-btn");

window.addEventListener("scroll", checkHeight);

function checkHeight(){
    if (window.scrollY > 400) {
        goTopBtn.style.display = "flex";
    }
    else{
        goTopBtn.style.display = "none"
    }
};

goTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior:"smooth"
    })
})