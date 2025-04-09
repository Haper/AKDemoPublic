import { Telegraf } from 'telegraf';
import { NewMessage, Message } from './Types';
import MongoDBService from './mongoDBService';
import dayjs from 'dayjs';

const bot = new Telegraf(process.env.TG_BOT_TOKEN as string);

bot.command('messages', async (ctx) => {
  const messages: Message[] = await MongoDBService.selectLastMessages();
  const messageLines = ['<b>Last 10 messages:</b>'];
  for (const message of messages) {
    messageLines.push(
      '',
      `<b>${dayjs(message.timestamp).format('YYYY-MM-DD HH:mm')}</b>`,
      `<b>Name:</b> ${message.name}`,
      `<b>Email:</b> ${message.email}`,
      `<b>Message:</b> ${message.message}`,
    );
  }
  await ctx.reply(messageLines.join('\n'), { parse_mode: 'HTML' });
});

const sendMessage = async (message: NewMessage) => {
  try {
    const messageLines = [
      `<b>${dayjs(message.timestamp).format('YYYY-MM-DD HH:mm')}</b>`,
      `<b>Name:</b> ${message.name}`,
      `<b>Email:</b> ${message.email}`,
      `<b>Message:</b> ${message.message}`,
    ]
    await bot.telegram.sendMessage(process.env.TG_CHAT_ID as string, messageLines.join('\n'), { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Error sending message via Telegram:', error);
  }
};

const TelegramService = {
  bot,
  sendMessage,
};

export default TelegramService;
