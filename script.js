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

// Slider Section2

const slides = [...document.querySelectorAll(".slide")]
console.log(slides);

const sliderData = {
  locked: false,
  direction: 0,
  slideOutIndex: 0,
  slideInIndex: 0
}

const directionButtons = [...document.querySelectorAll(".direction-btn")];

directionButtons.forEach(btn => btn.addEventListener("click", handleClick))

function handleClick(e) {
  if(sliderData.locked) return;
  sliderData.locked = true;

  getDirection(e.target)

  slideOut();
}

function getDirection(btn){

  sliderData.direction = btn.className.includes("right") ? 1 : -1

  sliderData.slideOutIndex = slides.findIndex(slide => slide.classList.contains("active"))

  if(sliderData.slideOutIndex + sliderData.direction > slides.length - 1) {
    sliderData.slideInIndex = 0;
  }
  else if (sliderData.slideOutIndex + sliderData.direction < 0) {
    sliderData.slideInIndex = slides.length - 1;
  }
  else {
    sliderData.slideInIndex = sliderData.slideOutIndex + sliderData.direction;
  }
}

function slideOut(){
  slideAnimation({
    el: slides[sliderData.slideInIndex],
    props: {
      display: "flex",
      transform: `translateX(${sliderData.direction < 0 ? "100%" : "-100%"})`,
      opacity: 0
    }
  })
  
  slides[sliderData.slideOutIndex].addEventListener("transitionend", slideIn)

  slideAnimation({
    el: slides[sliderData.slideOutIndex],
    props: {
      transition: "transform 0.4s cubic-bezier(0.74, -0.34, 1, 1.19), opacity 0.4s ease-out",
      transform: `translateX(${sliderData.direction < 0 ? "-100%" : "100%"})`,
      opacity: 0,
    }
  })

}

function slideAnimation(animationObject){
  for(const prop in animationObject.props){
    animationObject.el.style[prop] = animationObject.props[prop]
  }
}

function slideIn(e) {
  slideAnimation({
    el: slides[sliderData.slideInIndex],
    props: {
      transition: "transform 0.4s ease-out, opacity 0.6s ease-out",
      transform: "translateX(0%)",
      opacity: 1,
    }
  })
  slides[sliderData.slideInIndex].classList.add("active");
  
  
  slides[sliderData.slideOutIndex].classList.remove("active");
  e.target.removeEventListener("transitionend", slideIn)
  slides[sliderData.slideOutIndex].style.display = "none";

  setTimeout(() => {
    sliderData.locked = false;
  }, 400)
}