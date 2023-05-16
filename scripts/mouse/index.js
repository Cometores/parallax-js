import parallaxSpeed from './parallaxSpeed.json' assert { type: "json" };

const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,
    yValue = 0;

let rotateDegree = 0;

function update(cursorX) {
    parallax_el.forEach((el) => {
        const speeds = parallaxSpeed[el.classList[1]];
        let speedx= speeds.x;
        let speedy= speeds.y;
        let speedz= speeds.z;
        let rotateSpeed = speeds.rotation;

        /* Taking x-mouse-pos and component's "left" CSS property */
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : - 1;
        let zValue = (cursorX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) 
                translateY(calc(-50% + ${yValue * speedy}px)) 
                rotateY(${rotateDegree * rotateSpeed}deg)
                perspective(2300px) translateZ(${zValue * speedz}px)`;
    });
}

/* Centering elements when the page reloads */
update(0);

window.addEventListener("mousemove", (e) => {
    /* Coordinates from the center of the screen */
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    /* between -20 and 20 */
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
})


/* GSAP Animation */
// let timeline = gsap.timeline();
//
// timeline.from()