window.addEventListener('DOMContentLoaded', () => {
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

    // Modal

    // определим переменные

    const modalTrigger = document.querySelectorAll('[data-modal]');
    // само модальное окно
    const modal = document.querySelector('.modal');
    // переменная закрытия
    // const modalCloseBtn = document.querySelector('[data-close]');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');

        //открытие модального окна через toggle
        // modal.classList.toggle('show');
        // отключение скрола при открыти модального окна
        document.body.style.overflow = 'hidden';
        // если клиент открыл модальное окно сам то мы очищаем интерва
        clearInterval(modalTimerId);
    }

    // Получили псевдомассив триггеров, и чтбы повесить на каждый из ник обработчик события необходимо перебрать каждый элемент псевдомассива
    modalTrigger.forEach(btn => {
        // Нам понадобиться 2 функции, открытие и закрытие
        //Обработчики события необходимо назначить на несколько тригеров

        btn.addEventListener('click', openModal);
    });


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // Закрытие модального окна через toggle
        // modal.classList.toggle('show');

        // восстанавливаем скрол после закрытия модального окна
        document.body.style.overflow = '';
    }
    // closeModal не вызываем а просто передаем!
    // modalCloseBtn.addEventListener('click', closeModal);

    // закрытие модального окна при клике на overflow
    modal.addEventListener('click', (e) => {
        // грубо говоря если клик будет по обьекту модал то закроем модалььное окно
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // закрытие модального окна при нажатии на кнопки при помощи события keydown
    document.addEventListener('keydown', (e) => {
        // второе условие уточняет открыто ли в данный момент модальное окно, и будет запускать функцию закрытия только при условии что оно открыто
        if (e.code === 'Escape' && modalCloseBtn.classList.contains('show')) {
            closeModal();
        }
    });

    // запуск модального окна по истечении времени
    const modalTimerId = setTimeout(openModal, 500000);

    // функция показа модального окна во время скрола
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            // удаление повторного показа модального окна 
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    // если пользователь долистал страницу до конца то вылазиет модальное окно
    window.addEventListener('scroll', showModalByScroll);


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
        openModal();
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
            closeModal();
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
        dot.setAttribute('data-slide-to', i+1);
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



    // назначаем обработчик событий на кнопки 
    next.addEventListener('click', () => {
        //              '500px' - преобразуем в 500
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
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
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
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
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

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

});