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
export default calc;