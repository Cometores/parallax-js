const translateElements = document.querySelectorAll(".translate");
const bigTitle = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const imageContainer = document.querySelector(".imgContainer");
const opacityElements = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

const headerHeight = header.offsetHeight;
const sectionHeight = section.offsetHeight;

function handleScroll() {
    const scrollY = window.pageYOffset;
    const sectionRect = section.getBoundingClientRect();

    // Параллакс эффект для элементов
    translateElements.forEach((element) => {
        const speed = parseFloat(element.dataset.speed);
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });

    // Изменение прозрачности
    opacityElements.forEach((element) => {
        element.style.opacity = scrollY / (sectionRect.top + sectionHeight);
    });

    // Изменение прозрачности заголовка
    bigTitle.style.opacity = Math.max(-scrollY / (headerHeight / 2) + 1, 0);

    // Изменение высоты тени
    shadow.style.height = `${scrollY * 0.5 + 300}px`;

    // Параллакс эффект для контента и изображения
    content.style.transform = `translateY(${(scrollY / (sectionHeight + sectionRect.top) * 50) - 50}px)`;
    imageContainer.style.transform = `translateY(${(scrollY / (sectionHeight + sectionRect.top) * -50) + 50}px)`;

    // Изменение ширины бордера
    border.style.width = `${(scrollY / (sectionRect.top + sectionHeight)) * 30}%`;
}

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

// Обработка события прокрутки
window.addEventListener('scroll', handleScroll);

disableZoom();