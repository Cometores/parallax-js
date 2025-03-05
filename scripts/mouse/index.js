import parallaxSpeed from "./parallaxSpeed.js";

const parallaxElements = document.querySelectorAll(".parallax");
const screenCenterX = window.innerWidth / 2;
const screenCenterY = window.innerHeight / 2;

let xValue = 0, yValue = 0, rotateDegree = 0;
let imgArray = [];

/**
 * Масштабирует значение относительно экрана, чтобы эффект был одинаковым на всех разрешениях.
 * @param {number} value - Текущее значение координаты.
 * @param {number} max - Максимальное значение (ширина или высота экрана).
 * @param {number} scale - Коэффициент масштаба.
 * @returns {number} - Пропорциональное значение в `vw` или `vh`.
 */
const scaleValue = (value, max, scale = 1) => (value / max) * scale * 100;

/**
 * Обновляет положение элементов параллакса.
 */
const updateParallax = () => {
    imgArray.forEach(({ el, speedx, speedy, speedz, rotateSpeed, inLeft }) => {
        const zValue = scaleValue(xValue * inLeft, window.innerWidth, speedz);

        el.style.transform = `
            translateX(calc(-50% + ${scaleValue(-xValue, window.innerWidth, speedx)}vw))
            translateY(calc(-50% + ${scaleValue(yValue, window.innerHeight, speedy)}vh))
            perspective(2300px) translateZ(${zValue}px)
            rotateY(${rotateDegree * rotateSpeed}deg)
        `;
    });

    requestAnimationFrame(updateParallax);
};

/**
 * Инициализирует элементы параллакса.
 */
const initializeParallax = () => {
    imgArray = [];

    parallaxElements.forEach((el) => {
        const speeds = parallaxSpeed[el.classList[1]];

        if (speeds == null)
            console.log(el)
        imgArray.push({
            el,
            inLeft: el.getBoundingClientRect().left < screenCenterX ? 1 : -1,
            speedx: parseFloat(speeds.x),
            speedy: parseFloat(speeds.y),
            speedz: parseFloat(speeds.z),
            rotateSpeed: parseFloat(speeds.rotation)
        });
    });

    updateParallax(); // Обновляем начальные позиции
};

/**
 * Обработчик движения мыши.
 * @param {MouseEvent} e - Событие движения мыши.
 */
const handleMouseMove = (e) => {
    xValue = e.clientX - screenCenterX;
    yValue = e.clientY - screenCenterY;
    rotateDegree = (xValue / screenCenterX) * 20; // Значение от -20° до 20°
};

// Запрещаем зумирование страницы
const disableZoom = () => {
    document.addEventListener("wheel", (event) => {
        if (event.ctrlKey) event.preventDefault();
    }, { passive: false });

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && ["+", "-", "0"].includes(event.key)) {
            event.preventDefault();
        }
    });
};

// Инициализация
initializeParallax();
disableZoom();

// События
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", initializeParallax);