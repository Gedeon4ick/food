import {closeModal, openModal} from './modal';

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

}

// module.exports = forms;
export default forms;