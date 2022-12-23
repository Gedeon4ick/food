import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from "./modules/modal";

window.addEventListener('DOMContentLoaded', () => {

    // запуск модального окна по истечении времени
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000);
    
   
    // импорт файлов js используя синтексиси commandjs


    // т.к это функции нам необходимо их вызвать
    tabs();
    modal('[data-modal]', '.modal', modalTimerId);
    timer();
    cards();
    calc();
    forms();
    slider();
});