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
export default timer;
