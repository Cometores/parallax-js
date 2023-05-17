import parallaxSpeed from './parallaxSpeed.json' assert { type: "json" };

const parallax_el = document.querySelectorAll(".parallax");

/* Mouse coordinates from the center of the screen */
let xValue = 0,
    yValue = 0;

let rotateDegree = 0;

let imgArray = [];

function update(cursorX) {
    imgArray.forEach((img) => {
        /* Taking x-mouse-pos and component's "left" CSS property */
        let zValue = (cursorX - parseFloat(getComputedStyle(img.el).left)) * img.inLeft * 0.2;

        /* Changing transform CSS property*/
        img.el.style.transform = `translateX(calc(-50% + ${-xValue * img.speedx}px)) 
                translateY(calc(-50% + ${yValue * img.speedy}px)) 
                perspective(2300px) translateZ(${zValue * img.speedz}px)
                rotateY(${rotateDegree * img.rotateSpeed}deg)`;
    });
}

function initialization() {
    parallax_el.forEach((el) => {
        const speeds = parallaxSpeed[el.classList[1]];
        imgArray.push(
            {
                el,
                inLeft: parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : - 1,
                speedx: speeds.x,
                speedy: speeds.y,
                speedz: speeds.z,
                rotateSpeed: speeds.rotation
            }
        )
    });

    /* Centering elements when the page reloads */
    update(0);
}

initialization();

window.addEventListener("mousemove", (e) => {
    /* Mouse coordinates from the center of the screen */
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20; //between -20 and 20

    update(e.clientX);
})


/* GSAP Animation */
// let timeline = gsap.timeline();
//
// timeline.from()