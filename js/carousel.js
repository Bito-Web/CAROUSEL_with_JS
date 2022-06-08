/* ----- Variables ------ */
let slidePosition = 0;
const deviceWidth = window.innerWidth;
const carousel = document.querySelector('.carousel');
const carousel_container = document.querySelector('.carousel__container');
const slides = document.querySelectorAll('.carousel__container__items__item');
const totalSlides = slides.length;
const mobile = Boolean (deviceWidth < 768 ? true : false);

/* ----- Functions ------ */
function createDots() {
    const div = document.createElement('div');
    div.setAttribute('class', 'carousel__dots');
    carousel.appendChild(div);

    for (let i = 0; i < totalSlides; i++) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'carousel__dots__dot');
        div.appendChild(button);
        if (i == 0) {
            button.classList.add('active')
        }
    }
}
function createArrows() {
    const div = document.createElement('div');
    div.setAttribute('class', 'carousel__container__arrows');
    carousel_container.appendChild(div);

    const left_arrow = document.createElement('button');
    left_arrow.setAttribute('class', 'carousel__container__arrows__prev');
    left_arrow.setAttribute('type', 'button');
    left_arrow.innerHTML = `&lt;`;

    const rigth_arrow = document.createElement('button');
    rigth_arrow.setAttribute('class', 'carousel__container__arrows__next');
    rigth_arrow.setAttribute('type', 'button');
    rigth_arrow.innerHTML = `&gt;`;

    div.appendChild(left_arrow);
    div.appendChild(rigth_arrow);
}
// createArrows and createDots must to be called before define the HTML elements and all his interactions
createArrows();
createDots();

/* ----- Variables ------ */
const arrows = document.querySelector('.carousel__container__arrows');
const prev_arrow = document.querySelector('.carousel__container__arrows__prev');
const next_arrow = document.querySelector('.carousel__container__arrows__next');
const dots_container = document.querySelector('.carousel__dots');
const dots = document.querySelectorAll('.carousel__dots__dot');

/* ----- Functions ------ */
function dotEvent() {
    for (let i = 0; i < totalSlides; i++) {
        slidePosition;
        dots[i].setAttribute('id', `${i}`);
        dots[i].addEventListener('click', () => {
            slidePosition = dots[i].getAttribute('id');
            updateSlideToShow();
        })
    }
}
dotEvent();

function updateSlideToShow() {
    for (let slide of slides) {
        slide.classList.remove('active');
    }
    for (let dot of dots) {
        dot.classList.remove('active');
    }
    slides[slidePosition].classList.add('active')
    dots[slidePosition].classList.add('active')
}

function nextSlide() {
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    }else {
        slidePosition++;
    }
    updateSlideToShow();
}

function prevSlide() {
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    }else {
        slidePosition--;
    }
    updateSlideToShow();
}

function autoPlay() {
    let setPlay;

    carousel_container.onmouseleave = () => setPlay = setInterval(nextSlide, 5000);
    carousel_container.onmouseenter = () => clearInterval(setPlay);
}
autoPlay();

function mouseDirection(e) {
    mobile;
    let windowWidth = deviceWidth / 2;

    if (e.clientX > windowWidth) {
        nextSlide();
    }else if (e.clientX < windowWidth) {
        prevSlide();
    }
}

/* ----- Events ------ */
if (!mobile) {
    prev_arrow.onclick = () => prevSlide();
    next_arrow.onclick = () => nextSlide();
    arrows.classList.remove('hidden');
}else{
    carousel_container.onclick = (e) => mouseDirection(e);
    arrows.classList.add('hidden');
}

