const lu = {
    info: 'В Люксембурге действует электронная система оплаты дорог “Eurovignette”. Заказать ее можно через сервис на сайте системы, через мобильное приложение или в пунктах продажи, например, на бензозаправках. А оплатить – кредитной картой, топливной картой или наличными.',
    otherPayMethods: false,
    tunnel: false, 
    mainThings: false,
    name: 'Люксембурег',
    imgSrc: '../img/ev.png',
    firstName: 'lu'
}

const de = {
    info: 'Бортовое устройство DKV BOX EUROPE (OBU) предназначено для электронного взимания дорожных сборов и выполнения прочих телематических услуг',
    otherPayMethods: false,
    tunnel: false,
    mainThings: false,
    name: 'Германия',
    imgSrc: '../img/dkv.png',
    firstName: 'de'
}

const nl = {
    info: 'В Нидерландах действует электронная система оплаты дорог “Eurovignette”. Заказать ее можно через сервис на сайте системы, через мобильное приложение или в пунктах продажи, например, на бензозаправках. А оплатить – кредитной картой, топливной картой или наличными.',
    otherPayMethods: true,
    tunnel: true,
    mainThings: true,
    name: 'Нидерланды',
    imgSrc: '../img/ev.png',
    firstName: 'nl'
}

const dk = {
    info: `
    В Дании действует электронная система оплаты дорог “Eurovignette”. Заказать ее можно через сервис на сайте системы, через мобильное приложение или в пунктах продажи, например, на бензозаправках. А оплатить – кредитной картой, топливной картой или наличными.
    
    
    Обратите внимание: 
    С 1 января 2025 года Дания перейдет от евровиньетки к дорожному налогу на основе километража для грузовых автомобилей.
    `,
    otherPayMethods: false,
    tunnel: false,
    mainThings: false,
    name: 'Дания',
    imgSrc: '../img/ev.png',
    firstName: 'dk'
 }

module.exports.dk = dk;
module.exports.nl = nl;
module.exports.de = de;
module.exports.lu = lu;