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
                [Markup.button.callback('Германия', 't_btn_1'), Markup.button.callback('Бельгия', 't_btn_1'), Markup.button.callback('Франция', 't_btn_1')],
                [Markup.button.callback('Нидерланды', 't_btn_5'), Markup.button.callback('Швейцария', 't_btn_6'), Markup.button.callback('Австрия', 't_btn_7')],
                [Markup.button.callback('Италия', 't_btn_8'), Markup.button.callback('Испания', 't_btn_9'), Markup.button.callback('Люксембург', 't_btn_10')],
                [Markup.button.callback('Польша', 't_btn_11'), Markup.button.callback('Дания', 't_btn_12'), Markup.button.callback('Чехия', 't_btn_13')],
                [Markup.button.callback('Литва', 't_btn_14'), Markup.button.callback('Латвия', 't_btn_15'), Markup.button.callback('Эстония', 't_btn_16')],
                [Markup.button.callback('Словакия', 't_btn_17'), Markup.button.callback('Словения', 't_btn_18'), Markup.button.callback('Румыния', 't_btn_19')],
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

// function countriesInfo(btn, name, info, tunnel, otherPayMethods, mainThings) {
//     bot.action(btn, async (ctx) => {
//         try {
//             await ctx.answerCbQuery(); // функция для обработки часов на кнопке

//             await ctx.replyWithHTML(name, Markup.inlineKeyboard(
//                 [
//                     [Markup.button.callback('Основной метод оплаты', 'mainB_btn_1')]
//                 ]
//             ))

//             if ( tunnel !== false) {
//                 await ctx.replyWithHTML(info, Markup.inlineKeyboard(
//                     [
//                         [Markup.button.callback('Туннели', 'tunnel_btn_1')]
//                     ]
//                 ))
//             } else {
               
//             }

//             // await ctx.replyWithHTML(info, {
//             //     disable_web_page_preview: true
//             // })

//         } catch (error) {
//             console.log(error);
//         }
//     })
// }


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

function kkl (obj) {
     
    let arrInfoAbotCountries = [];

    for(let item in obj) {
        
        if(obj[item] !== false){
            if(item == 'info')
            arrInfoAbotCountries.push([Markup.button.callback('Основной метод оплаты дорог', `btn_${obj.first_name}_1`)])
            if(item == 'otherPayMethods')
            arrInfoAbotCountries.push([Markup.button.callback('Альтернативные способы оплаты', `btn_${obj.first_name}_2`)])
            if(item == 'tunnel')
            arrInfoAbotCountries.push([Markup.button.callback('Туннели / Мосты / Паромы / Поезда', `btn_${obj.first_name}_3`)])
            if(item == 'mainThings')
            arrInfoAbotCountries.push([Markup.button.callback('Прочие нюансы', `btn_${obj.first_name}_4`)])
        }
    }

    return arrInfoAbotCountries;
}


// addActionBot('mainB_btn_1', './img/dkv.png', countries.de.info);
// addActionBot('t_btn_5', './img/dkv.png', countries.nl.info);
// addActionBot('t_btn_12', './img/dkv.png', countries.dk);
countriesInfo('t_btn_1', countries.de);
countriesInfo('t_btn_10', countries.lu);
countriesInfo('t_btn_5', countries.nl);
countriesInfo('t_btn_12', countries.dk);


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))