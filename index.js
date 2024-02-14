const { Telegraf, Markup } = require("telegraf")
require('dotenv').config()
const text = require('./conts')

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.start((ctx) => ctx.reply(ctx.message));
bot.start((ctx) => ctx.reply(`Привет ${ ctx.message.from.first_name ? ctx.message.from.first_name : 'bitch' }. Чтобы начать пользоваться ботом, нажми на "меню"`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('tolls_for_roads', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Оплата дорог</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Голландия', 't_btn_1'), Markup.button.callback('Дания', 't_btn_1'), Markup.button.callback('Швеция', 't_btn_1'), Markup.button.callback('Люксембург', 't_btn_1')],
                [Markup.button.callback('Чехия', 't_btn_5'), Markup.button.callback('Польша', 't_btn_6')],
                [Markup.button.callback('Швейцария', 't_btn_7'), Markup.button.callback('Словения', 't_btn_8')],
                [Markup.button.callback('Словакия', 't_btn_9'), Markup.button.callback('Франция', 't_btn_10')]
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

addActionBot('t_btn_1', false, text.bd_text[0][0])

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))