'use client';

import { useState } from 'react';
import Button from "../SharedComponents/Button";
import { TelegramIcon } from "../SharedComponents/Icons";
import AboutPageMessageForm from './AboutPageMessageForm';

const TelegramButton = () => {
  const [showMessageForm, setShowMessageForm] = useState(false);

  const toggleMessageForm = () => {
    setShowMessageForm(!showMessageForm);
  };

  return (
    <>
      <Button className="bottom-[40px] right-[20px] md:right-[40px] fixed z-10"
        onClick={toggleMessageForm}
      >
        <TelegramIcon width={60} height={60} />
      </Button>
      {showMessageForm && <AboutPageMessageForm onClose={toggleMessageForm} />}
    </>
  );
};

export default TelegramButton;
