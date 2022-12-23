/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Калькулятор calc

    // получаем элемент куда все будем записывать
    const result = document.querySelector('.calculating__result span');
    // 5 переменных которые будут меняться
    let sex;
    let height;
    let weight;
    let age;
    let ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // функция сохранящая в localStorage выбор статическиз импутов
    function initLocalSettings(selector ,activeClass) {
        const elements = document.querySelectorAll(selector)
        // при обновлении страницы класс активности д.б убран у всех кнопок, и поставлен той кнопке у которой дата атрибут равено тому значению что и в LocalStorage
        elements.forEach(elem => {
            elem.classList.remove(activeClass)
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })

    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

 

    // общая формула расчет
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            // если хоть одна из переменных не введена то Значение не будет расчитываться
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            //если переменная sex выбранно женщина
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    // функция работы со статическими данными
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // если у е.target усть атриьут data-ratio 
                if (e.target.getAttribute('data-ratio')) {
                    // дослово, мы вытаскиваем значение активности в зависимости по то копке по которой кликнули у каждой они разные
                    ratio = +e.target.getAttribute('data-ratio');
                    // фиксируем в localStorfg выбор клиента
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });

        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция которая будет обрабатывать каждый input
    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        // Обработчик события на Input
        input.addEventListener('input', () => {

            // проверка того что ввел пользователь в input
            if (input.value.match(/\D/g) ) {
                // если не число то
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();

        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

// module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    // используем классы для карточек

    // 1) создаем шаблон , для того чтобы потом от него отпачковывать карты

    class MenuCard {
        //сво-ва которые нам нужны для создания карточек
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chanheToUAH();
        }

        // методы
        // метод конвертации валют
        chanheToUAH() {
            this.price = this.price * this.transfer;
        }
        // метод создания верстки
        render() {
            // то что будем вставлять
            const element = document.createElement('div');
            // перебираем новые классы
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            // помещение элемента на страницу
            this.parent.append(element);

        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        // возращаем промис, для дальнейшей обработки через цепочку then5
        return await res.json()
    }

    // создание новый карточек на странице путем запроса данных с сервера
    getResource('http://localhost:3000/menu')
        .then(data => {
            // дуструктуризируем данные с сервера
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

// module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms() {
    
    // Forms

    // получение все форм
    const forms = document.querySelectorAll('form');
    // Обьект с сообщениями котоыре мы будем показывать в различных ситуация
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // подвязываем под все функции нашу функцию bindPostData
    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            bindPostData(item);
        });
    });

    // выносим функционал общение с сервером в отдельную функцию
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            // то тело которое мы будем отправлять
            body: data
        });
        // возращаем промис, для дальнейшей обработки через цепочку then5
        return await res.json()
    }

    // функция которая будет отвечать за постинг данных
    function bindPostData(form) {
        // Собщание которое будет появляться в диве после отправки фомры
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto
        `;
        // отправка сообщения на страницу
        // form.appendChild(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage);

        // const request = new XMLHttpRequest();
        // // вызываем метод open чтобы настроить этот запрос
        // request.open('POST', 'server.php');



        // настройка заголовков, которые будут говорить что именно приходит  сервера
        // request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        // переделка в формат json

        const object = {};

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        // formData.forEach(function (value, key) {
        //     object[key] = value;
        // });

        // конвертация в json


        // отправка формы

        // модифицируем полученный формат от сервера

        postData('http://localhost:3000/requests', JSON.stringify(object))
            .then(data => {
                // data - те данные которые возращаются из promisa
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                // операция которая будет соответствовать ошибке
                showThanksModal(message.failure);
            }).finally(() => {
                // очистка формы
                form.reset();
            })

        // request.addEventListener('load', () => {
        //     if (request.status === 200) {
        //         console.log(request.response);
        //         showThanksModal(message.success);
        //         form.reset();
        //         statusMessage.remove();
        //     } else {
        //         showThanksModal(message.failure);
        //     }
        // });
    }




    // Вид модальных окон отправки форм
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        // скрываем контент предыдущий
        prevModalDialog.classList.add('hide');
        // открытие модально окна
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)();
        // создание нового контента 
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        // формирование той верстки которая будет в данном окне
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // помещение модального окна на страницу
        document.querySelector('.modal').append(thanksModal);
        // openModal();
        // настройка появление старого модального окна для повторной отправки формы
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //         // лбьект c настройками для нашего fetch. Сво-в много. Самые главные: метод && body
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: 'Alex'
    //         }),
    //         //теперь мы имеем обьект в json формате который мы отправим с помощью fetch
    //         // указываем заголвки кот будут определять какой контент мы с вами отправляем
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })

    //     .then(response => response.json())
    //     .then(json => console.log(json));

}

// module.exports = forms;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');

    //открытие модального окна через toggle
    // modal.classList.toggle('show');
    // отключение скрола при открыти модального окна
    document.body.style.overflow = 'hidden';
    // если клиент открыл модальное окно сам то мы очищаем интерва
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    // Закрытие модального окна через toggle
    // modal.classList.toggle('show');

    // восстанавливаем скрол после закрытия модального окна
    document.body.style.overflow = '';
}
// closeModal не вызываем а просто передаем!
// modalCloseBtn.addEventListener('click', closeModal);

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    // определим переменные

    const modalTrigger = document.querySelectorAll(triggerSelector);
    // само модальное окно
    const modal = document.querySelector(modalSelector);
    // переменная закрытия
    // const modalCloseBtn = document.querySelector('[data-close]');




    // Получили псевдомассив триггеров, и чтбы повесить на каждый из ник обработчик события необходимо перебрать каждый элемент псевдомассива
    modalTrigger.forEach(btn => {
        // Нам понадобиться 2 функции, открытие и закрытие
        //Обработчики события необходимо назначить на несколько тригеров

        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });




    // закрытие модального окна при клике на overflow
    modal.addEventListener('click', (e) => {
        // грубо говоря если клик будет по обьекту модал то закроем модалььное окно
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    // закрытие модального окна при нажатии на кнопки при помощи события keydown
    document.addEventListener('keydown', (e) => {
        // второе условие уточняет открыто ли в данный момент модальное окно, и будет запускать функцию закрытия только при условии что оно открыто
        if (e.code === 'Escape' && modalCloseBtn.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    
    // функция показа модального окна во время скрола
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            // удаление повторного показа модального окна 
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    // если пользователь долистал страницу до конца то вылазиет модальное окно
    window.addEventListener('scroll', showModalByScroll);

}

// module.exports = modal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParents = document.querySelector('.tabheader__items');

    // Первая задача скрыть все ненужные нам табы
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        // убираем класс активности у заголовка
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // Функция которая будет показывать нам табы

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    // В скобках ноль указывает какому из табов мы добавляем класс активности, ES6 позволяет в аргумемнт функции сразу прописать что будет вызываться по умолчанию у нас это i = 0
    showTabContent();

    // 3 задача Делигирование событий клика, обязательно передовать обььект события

    tabsParents.addEventListener('click', (event) => {
        // Присваиваем переменную для удобства использования Even.target
        const target = event.target;
        // contains tabheader__item
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

// используем синтексис comand.js для экспорта
// module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    // Timer
    // Переменная определяющая дедлайн
    const deadLine = '2023-01-11';

    // разница между дедлайном и нашем текущем временем
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        // в переменную t получем разницу в колличестве миллисекунд
        const t = Date.parse(endtime) - Date.parse(new Date());
        // Прописываем что будет если пользователь укажет даду которая не входит в акцию то, есть просрочена
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            // Описание расчета если пользователь подпадает в диапозон акции
            // Разницу в миллисекундах воращаем обратно в числовой формат для получения кол-ва дней
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            // получение общего кол-ва часов
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            //получение минут
            minutes = Math.floor((t / 1000 / 60) % 60);
            // получение секунд
            seconds = Math.floor((t / 1000) % 60);
            // возращаем полученные значения в виде обьекта

        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // функция для подставления 0 перед 1 значным числом
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }


    // Фун-ция которая будет устанавливать наш таймер на страничку
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        // интервал запуска функции
        const timeInterval = setInterval(updateClock, 1000);
        // Функция которая будет обновлять наш таймер каждую секунду

        // фикс мигания верстки при обновлении или заупскии страницы
        //необходимо вызвать функциию в начале
        // функция инициализации один раз запуститься исчезнет, далее будет работать setInterval
        updateClock();

        function updateClock() {
            // Расчет того времени который у нас остался прямо на эту секунду
            const t = getTimeRemaining(endtime);
            // Расчетные велечины поместить на страницу
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // остановка таймера 
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

}

// module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {

    // запуск модального окна по истечении времени
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 500000);
    
   
    // импорт файлов js используя синтексиси commandjs


    // т.к это функции нам необходимо их вызвать
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map