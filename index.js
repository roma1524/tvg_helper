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