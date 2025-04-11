import { METHODS, POSTResponseType } from "./Types";
import APIError from "./APIError";


const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
const checkCaptcha = async (token: string): Promise<POSTResponseType> => {
  try {
    const fetchParams: RequestInit = { method: METHODS.POST };
    fetchParams.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    fetchParams.body = new URLSearchParams({
      secret: process.env.CAPTCHA_SECRET_KEY as string,
      response: token
    });
    const response = await fetch(recaptchaURL, fetchParams);
    if (!response.ok) {
      throw new APIError(response.statusText, response.status);
    }
    return response.json();

  } catch (error) {
    throw error;
  }
};

const CaptchaService = {
  checkCaptcha
};

export default CaptchaService;
