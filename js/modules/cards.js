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
export default cards;