import TelegramService from "@/domain/api/telegramService";
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await TelegramService.bot.handleUpdate(body);
    return new Response(null, { status: 200 });

  } catch (err) {
    console.error('TG WebHook Error', err);
    return new Response('Error', { status: 500 });
  }
}
