'use server';

import { loginSchema } from "./validation";
import {
  LoginType,
  RegisterType,
  POSTResponseType,
  NewMessage
} from "./Types";
import DataService from "./dataService";
import CaptchaService from "./captchaService";
import MongoDBService from "./mongoDBService";
import TelegramService from "./telegramService";
import APIError from "./APIError";

export const loginUser = async (data: LoginType): Promise<POSTResponseType> => {
  try {
    const result = loginSchema.safeParse(data);
    if (!result.success) throw new APIError(result.error.message, 400);

    await DataService.loginUser(data);
    return { success: result.success };

  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data: RegisterType): Promise<POSTResponseType> => {
  try {
    const result = loginSchema.safeParse(data);
    if (!result.success) throw new APIError(result.error.message, 400);

    // await DataService.registerUser(data);
    // Emulate server delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: result.success };

  } catch (error) {
    throw error;
  }
};

export const addMessage = async (message: NewMessage, captchaToken: string): Promise<POSTResponseType> => {
  try {
    const result = await CaptchaService.checkCaptcha(captchaToken);
    if (!result.success) {
      throw new APIError("Wrong Captcha", 400);
    }

    await MongoDBService.insertMessage(message);
    await TelegramService.sendMessage(message);
    return { success: true };

  } catch (error) {
    throw error;
  }
};
