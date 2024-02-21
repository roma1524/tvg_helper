const { Telegraf, Markup } = require("telegraf")
require('dotenv').config()
const text = require('./conts')
const countries = require('./tollsForRoads/countries')

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.start((ctx) => console.log(ctx.message));
bot.start((ctx) => ctx.reply(`Привет ${ ctx.message.from.first_name ? ctx.message.from.first_name : 'bitch' }. Чтобы начать пользоваться ботом, нажми на "меню"`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('tolls_for_roads', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Оплата дорог</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Германия', 't_btn_1'), Markup.button.callback('Бельгия', 't_btn_2'), Markup.button.callback('Франция', 't_btn_3')],
                [Markup.button.callback('Нидерланды', 't_btn_4'), Markup.button.callback('Швейцария', 't_btn_5'), Markup.button.callback('Австрия', 't_btn_6')],
                [Markup.button.callback('Италия', 't_btn_7'), Markup.button.callback('Испания', 't_btn_8'), Markup.button.callback('Люксембург', 't_btn_9')],
                [Markup.button.callback('Польша', 't_btn_10'), Markup.button.callback('Дания', 't_btn_11'), Markup.button.callback('Чехия', 't_btn_12')],
                [Markup.button.callback('Литва', 't_btn_13'), Markup.button.callback('Латвия', 't_btn_14'), Markup.button.callback('Эстония', 't_btn_15')],
                [Markup.button.callback('Словакия', 't_btn_16'), Markup.button.callback('Словения', 't_btn_17'), Markup.button.callback('Румыния', 't_btn_18')],
                [Markup.button.callback('Остальные', 'drugie_strani')]
            ]
        ))
    } catch (error) {
        console.log(error);
    }    
})

bot.command('working_hours', async (ctx) => {
    try {
        await ctx.replyWithHTML(`${text.estr_text[0][0]}`)
    } catch (error) {
        console.log(error);
    }    
})

bot.command('contacts', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Контакты</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Бухгалтерия', 'ct_btn_1')],
                [Markup.button.callback('Менеджера', 'ct_btn_2')],
                [Markup.button.callback('Диспетчер', 'ct_btn_3')],
                [Markup.button.callback('Инструктор', 'ct_btn_4')],
                [Markup.button.callback('Механик DAF', 'ct_btn_5'), Markup.button.callback('Механик MB', 'ct_btn_6')],
                [Markup.button.callback('Персонал', 'ct_btn_7')],
                [Markup.button.callback('Заменены водителей', 'ct_btn_8')],
            ]
        ))
    } catch (error) {
        console.log(error);
    }    
})

bot.command('docs', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Документы в рейсе</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Список документов', 'doc_btn_1')],
                [Markup.button.callback('Заполнение CMR', 'doc_btn_2')],
                [Markup.button.callback('Палетшайн', 'doc_btn_3')],
                [Markup.button.callback('Европротокол', 'doc_btn_4')]
            ]
        ))
    } catch (error) {
        console.log(error);
    }    
})

bot.command('refueling', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Заправка</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('по Q8', 'fu_btn_1')],
                [Markup.button.callback('по DKV', 'fu_btn_2')],
                [Markup.button.callback('GlobalTank', 'fu_btn_3')],
                [Markup.button.callback('VIADA', 'fu_btn_4')]
            ]
        ))
    } catch (error) {
        console.log(error);
    }    
})

bot.command('questions', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Основые вопросы в рейсе</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Слив топлива', 'q_btn_1')],
                [Markup.button.callback('ДТП', 'q_btn_2')],
                [Markup.button.callback('Повреждение груза', 'q_btn_3')],
                [Markup.button.callback('Обмен паллет', 'q_btn_4')]
            ]
        ))
    } catch (error) {
        console.log(error);
    }    
})


/**
 * Функция добавляет контекст по нажатой кнопке
 * @param { string } name - идентификатор нажатой кнопки
 * @param { string } src - путь для картинки
 * @param { string } argText - описание
 */
function addActionBot(name, src, argText) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery(); // функция для обработки часов на кнопке

            if ( src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }

            await ctx.replyWithHTML(argText, {
                disable_web_page_preview: true
            })
        } catch (error) {
            console.log(error);
        }
    })
}


/**
 * Функция отрисовывает нужное количество кнопок, в зависимости от значений объекта
 * @param { string } btn - идентификатор кнопки
 * @param { object } obj - объект страны
 * @returns { Array } возвращает массив кнопок
 */
function countriesInfo(btn, obj) {
    bot.action(btn, async (ctx) => {
        try {
            await ctx.answerCbQuery(); // функция для обработки часов на кнопке

            await ctx.replyWithHTML(obj.name, Markup.inlineKeyboard(
                kkl(obj)
            ))

        } catch (error) {
            console.log(error);
        }
    })
}


/**
 * Функция итерирует переданный объект, и в зависимости от значений объекта, добавляет в пустой массив соответствующую кнопку
 * @param { object } obj - объект страны
 * @returns { Array } массив с не пустыми значениями
 */
function kkl (obj) {
     
    let arrInfoAbotCountries = [];

    for(let item in obj) {
        
        if(obj[item] !== false){
            if(item == 'info')
            arrInfoAbotCountries.push([Markup.button.callback('Основной метод оплаты дорог', `btn_${obj.firstName}_1`)])
            if(item == 'otherPayMethods')
            arrInfoAbotCountries.push([Markup.button.callback('Альтернативные способы оплаты', `btn_${obj.firstName}_2`)])
            if(item == 'tunnel')
            arrInfoAbotCountries.push([Markup.button.callback('Туннели / Мосты / Паромы / Поезда', `btn_${obj.firstName}_3`)])
            if(item == 'mainThings')
            arrInfoAbotCountries.push([Markup.button.callback('Прочие нюансы', `btn_${obj.firstName}_4`)])
        }
    }

    return arrInfoAbotCountries;
}


addActionBot('btn_de_1', countries.de.imgSrc, countries.de.info);
addActionBot('btn_be_1', countries.be.imgSrc, countries.be.info);
addActionBot('btn_fr_1', countries.fr.imgSrc, countries.fr.info);
addActionBot('btn_nl_1', countries.nl.imgSrc, countries.nl.info);
addActionBot('btn_ch_1', countries.ch.imgSrc, countries.ch.info);
addActionBot('btn_at_1', countries.at.imgSrc, countries.at.info);
addActionBot('btn_it_1', countries.it.imgSrc, countries.it.info);
addActionBot('btn_es_1', countries.es.imgSrc, countries.es.info);
addActionBot('btn_lu_1', countries.lu.imgSrc, countries.lu.info);
addActionBot('btn_dk_1', countries.dk.imgSrc, countries.dk.info);
addActionBot('btn_cz_1', countries.cz.imgSrc, countries.cz.info);
addActionBot('btn_lt_1', countries.lt.imgSrc, countries.lt.info);
addActionBot('btn_lv_1', countries.lv.imgSrc, countries.lv.info);
addActionBot('btn_ee_1', countries.ee.imgSrc, countries.ee.info);
addActionBot('btn_sk_1', countries.sk.imgSrc, countries.sk.info);
addActionBot('btn_si_1', countries.si.imgSrc, countries.si.info);
addActionBot('btn_ro_1', countries.ro.imgSrc, countries.ro.info);


// addActionBot('btn_de_2', countries.de.imgSrc, countries.de.otherPayMethods);
// addActionBot('btn_be_2', countries.be.imgSrc, countries.be.otherPayMethods);
// addActionBot('btn_fr_2', countries.fr.imgSrc, countries.fr.otherPayMethods);
// addActionBot('btn_nl_2', countries.nl.imgSrc, countries.nl.otherPayMethods);
addActionBot('btn_ch_2', countries.ch.imgSrc, countries.ch.otherPayMethods);
// addActionBot('btn_at_2', countries.at.imgSrc, countries.at.otherPayMethods);
// addActionBot('btn_it_2', countries.it.imgSrc, countries.it.otherPayMethods);
// addActionBot('btn_es_2', countries.es.imgSrc, countries.es.otherPayMethods);
// addActionBot('btn_lu_2', countries.lu.imgSrc, countries.lu.otherPayMethods);
addActionBot('btn_dk_2', countries.dk.imgSrc, countries.dk.otherPayMethods);
// addActionBot('btn_cz_2', countries.cz.imgSrc, countries.cz.otherPayMethods);
// addActionBot('btn_lt_2', countries.lt.imgSrc, countries.lt.otherPayMethods);
// addActionBot('btn_lv_2', countries.lv.imgSrc, countries.lv.otherPayMethods);
// addActionBot('btn_ee_2', countries.ee.imgSrc, countries.ee.otherPayMethods);
// addActionBot('btn_sk_2', countries.sk.imgSrc, countries.sk.otherPayMethods);
// addActionBot('btn_si_2', countries.si.imgSrc, countries.si.otherPayMethods);
// addActionBot('btn_ro_2', countries.ro.imgSrc, countries.ro.otherPayMethods);


// addActionBot('btn_de_2', countries.de.imgSrc, countries.de.otherPayMethods);
// addActionBot('btn_be_2', countries.be.imgSrc, countries.be.otherPayMethods);
// addActionBot('btn_fr_2', countries.fr.imgSrc, countries.fr.otherPayMethods);
// addActionBot('btn_nl_2', countries.nl.imgSrc, countries.nl.otherPayMethods);
// addActionBot('btn_ch_2', countries.ch.imgSrc, countries.ch.otherPayMethods);
// addActionBot('btn_at_2', countries.at.imgSrc, countries.at.otherPayMethods);
// addActionBot('btn_it_2', countries.it.imgSrc, countries.it.otherPayMethods);
// addActionBot('btn_es_2', countries.es.imgSrc, countries.es.otherPayMethods);
// addActionBot('btn_lu_2', countries.lu.imgSrc, countries.lu.otherPayMethods);
addActionBot('btn_dk_3', countries.dk.imgSrc, countries.dk.tunnel);
// addActionBot('btn_cz_2', countries.cz.imgSrc, countries.cz.otherPayMethods);
// addActionBot('btn_lt_2', countries.lt.imgSrc, countries.lt.otherPayMethods);
// addActionBot('btn_lv_2', countries.lv.imgSrc, countries.lv.otherPayMethods);
// addActionBot('btn_ee_2', countries.ee.imgSrc, countries.ee.otherPayMethods);
// addActionBot('btn_sk_2', countries.sk.imgSrc, countries.sk.otherPayMethods);
// addActionBot('btn_si_2', countries.si.imgSrc, countries.si.otherPayMethods);
// addActionBot('btn_ro_2', countries.ro.imgSrc, countries.ro.otherPayMethods);


countriesInfo('t_btn_1', countries.de);
countriesInfo('t_btn_2', countries.be);
countriesInfo('t_btn_3', countries.fr);
countriesInfo('t_btn_4', countries.nl);
countriesInfo('t_btn_5', countries.ch);
countriesInfo('t_btn_6', countries.at);
countriesInfo('t_btn_7', countries.it);
countriesInfo('t_btn_8', countries.es);
countriesInfo('t_btn_9', countries.lu);
countriesInfo('t_btn_10', countries.pl);
countriesInfo('t_btn_11', countries.dk);
countriesInfo('t_btn_12', countries.cz);
countriesInfo('t_btn_13', countries.lt);
countriesInfo('t_btn_14', countries.lv);
countriesInfo('t_btn_15', countries.ee);
countriesInfo('t_btn_16', countries.sk);
countriesInfo('t_btn_17', countries.si);
countriesInfo('t_btn_18', countries.ro);





bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))