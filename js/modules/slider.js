function slider() {
     // слайдер

    // получение слайдеров
    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    // стрелоки
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    // получение индитификаторов страниц
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    // главная обертка
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    // поле с нашими слайдами
    const slidesField = document.querySelector('.offer__sleder-inner');
    // получение ширины окна через которые мы смотрим на слайды
    const width = window.getComputedStyle(slidesWrapper).width;
    // слайд индекс будет определять какой слайд
    let slideIndex = 1;

    // переменная которая будет говорить нам на сколько мы отступили в право и лево
    let offset = 0;

    //вывод текущего значения слайдера
    if (slides.length < 10) {
        current.textContent = `${slides.length}`;
        // обработка значения current
        current.textContent = `${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = `${slideIndex}`;
    }

    // добавляем стили полю с слайдами
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all 0.9s ';

    // ограничиваем показ видимости wrapper
    slidesWrapper.style.overflow = 'hidden';

    // для переключения слайдов необходимо трансформировать блок в котором находяться слайды

    slides.forEach(slide => {
        slide.style.width = width;
    });
    // изменяем свойство position родительскому элементу для того чтобы относитьльно него расопложить dots
    // намного лечге это было бы сделать в css
    slider.style.position = 'relative';

    // создаем большую обертку для точек, опять же легче просто было создать в html
    const indicators = document.createElement('ol');
    // создаем массив dots для дальнейшего использования метода Push
    const dots = [];
    indicators.classList.add('carousel-indicators');

    // добавляем свойства классу, опять же , легче через сss
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    // помещаем созданную обертку внутрь слайдера
    slider.append(indicators);

    // cjplftv dots в зависимости от кол-ва слайдов
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        // активное состояние dots
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    // назначаем обработчик событий на кнопки 
    next.addEventListener('click', () => {
        //              '500px' - преобразуем в 500
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        // сдвигаем при нажатии слайд
        slidesField.style.transform = `translateX(-${offset}px)`;

        // изменения индекса счета
        if (slideIndex == slides.length) {
            // если долистали до 4 то переносим индекс до значения 1
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        // изменение значения которое лежит в этих блоках
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        // работа с dots
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    // кнопка назад
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        // сдвигаем при нажатии слайд
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            // если долистали до 4 то переносим индекс до значения 1
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        // изменение значения которое лежит в этих блоках
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
        // настройка переключения слайдов при клике по определенному dots

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });



    // инициализируем наш слайдер задаем изночальное положение
    // showSlides(sledeIndex);

    // // вывод общего кол-ва слайдев, если меньши 10 то добавляем ноль
    // if (slides.length < 10) {
    //     total.textContent = `${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // // функция показа и скрытия наших слайдов
    // function showSlides(n) {
    //     // если слайд индекс больше длины массива всех слайдов то изменяем его на 1, тем самым круговое движение слайдеров обеспечиваем
    //     if (n > slides.length) {
    //         sledeIndex = 1;
    //     }

    //     // условие в обратную сторону
    //     if (n < 1) {
    //         // если значение отрицательно то слайд интекс устанавливаем в полседнее значение, опять же круговое движение только в другую сторону
    //         sledeIndex = slides.length;
    //     }

    //     // скрываем все слайды кроме того что интересует нас
    //     slides.forEach((item) => item.style.display = 'none');

    //     // показать нужный слайд(так как отчет от нуля идет)
    //     slides[sledeIndex - 1].style.display = 'block';

    //     // вывод текущего значения слайдера
    //     if (slides.length < 10) {
    //         current.textContent = `${sledeIndex}`;
    //     } else {
    //         current.textContent = sledeIndex;
    //     }
    // }

    // // Увеличение индекса
    // function plusSlides(n) {
    //     showSlides(sledeIndex += n);
    // }

    // // вещаем обработчики событий на кнопки назад
    // prev.addEventListener('click', function () {
    //     plusSlides(-1);
    // });

    // // next
    // next.addEventListener('click', function () {
    //     plusSlides(1);
    // });
}

// module.exports = slider;
export default slider;