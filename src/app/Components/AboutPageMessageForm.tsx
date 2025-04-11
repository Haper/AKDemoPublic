"use client";

import { useState } from "react";
import { showPopupMessage } from "@/app/SharedComponents/PopupMessage";
import TextInput from "@/app/SharedComponents/TextInput";
import { addMessage } from "@/domain/api/actions";
import type { NewMessage } from "@/domain/api/Types";
import { messageSchema } from "@/domain/api/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../SharedComponents/Button";
import { CloseButtonIcon } from "../SharedComponents/Icons";
import Modal from "../SharedComponents/Modal";
import TextArea from "../SharedComponents/TextArea";
import ReCAPTCHA from "react-google-recaptcha";
import './AboutPageMessageForm.scss';

const AboutPageMessageForm = ({ onClose }: { onClose?: () => void; }) => {
  const [captchaToken, setCaptchaToken] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      await addMessage({ ...data, timestamp: new Date() } as NewMessage, captchaToken);
      showPopupMessage('Message has been sent!');
      onClose?.();

    } catch (error) {
      showPopupMessage((error as Error)?.message || 'Unknown error', true);
    }
  };

  return (
    <Modal className="bg-black/50">
      <form className="MessageFormMainContainer" data-cy="messageForm" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <h3 className="text-2xl font-bold" data-cy="messageFormHeading">Send me a message</h3>
        <div className="TextInputVerticalContainer">
          <TextInput {...register("name")}
            autoComplete="name"
            label="Name:"
            aria-describedby="name-error"
            data-cy="messageFormNameInput"
          />
          <p id='name-error' className="text-xs" data-cy="messageFormNameError">{errors.name?.message}</p>
        </div>

        <div className="TextInputVerticalContainer">
          <TextInput {...register("email")}
            type="email"
            autoComplete="email"
            label="Email:"
            aria-describedby="email-error"
            data-cy="messageFormEmailInput"
          />
          <p id='email-error' className="text-xs" data-cy="messageFormEmailError">{errors.email?.message}</p>
        </div>

        <div className="TextInputVerticalContainer">
          <TextArea {...register("message")}
            label="Message:"
            aria-describedby="message-error"
            data-cy="messageFormMessageInput"
          />
          <p id='message-error' className="text-xs" data-cy="messageFormMessageError">{errors.message?.message}</p>
        </div>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string}
          onChange={(token) => {
            setCaptchaToken(token || '');
          }}
        />

        <Button type="submit" className="SubmitButton" data-cy="messageFormSubmitButton" disabled={isSubmitting || !captchaToken}>Send</Button>

        <Button className="CloseButton" onClick={onClose} data-cy="messageFormCloseButton">
          <CloseButtonIcon width={32} height={32} />
        </Button>
      </form>
    </Modal>
  );
};

export default AboutPageMessageForm;
