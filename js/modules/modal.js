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
export default modal;
export {closeModal};
export {openModal};