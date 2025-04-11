"use client";

import Button from "@/app/SharedComponents/Button";
import { AcceptIcon } from "@/app/SharedComponents/Icons";
import { showPopupMessage } from "@/app/SharedComponents/PopupMessage";
import TextInput from "@/app/SharedComponents/TextInput";
import { registerUser } from "@/domain/api/actions";
import { registerSchema } from "@/domain/api/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SalutationSelection from "./SalutationSelection";
import PhoneInput from "@/app/SharedComponents/PhoneInput";
import { z } from "zod";


const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      salutation: undefined,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await registerUser(data);
      showPopupMessage('Sign up successful!');

    } catch (error) {
      showPopupMessage((error as Error)?.message || 'Unknown error', true);
    }
  };

  return (
    <form className="BasicFormMainContainer" data-cy="signUpForm" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
      <h3 className="text-2xl font-bold" data-cy="signUpFormHeading">Sign Up Form</h3>

      <div className="TextInputVerticalContainer">
        <div className="flex gap-2">
          <SalutationSelection {...register("salutation")} autoComplete="honorific-prefix" label="First Name:" data-cy="signUpSalutationInput" />
          <TextInput {...register("firstname")} autoComplete="given-name" data-cy="signUpFirstnameInput" />
        </div>
        <p id='firstname-error' className="text-xs" data-cy="signUpFirstnameError">{errors.firstname?.message}</p>
        {isSubmitted && !errors.firstname?.message && !errors.salutation?.message &&
          <AcceptIcon width={22} height={22} className="AcceptIconContainer" data-cy="signUpFirstnameAcceptIcon" />
        }
      </div>
      <div className="TextInputVerticalContainer">
        <TextInput {...register("lastname")} autoComplete="family-name" label="Last Name:" data-cy="signUpLastnameInput" />
        <p id='lastname-error' className="text-xs" data-cy="signUpLastnameError">{errors.lastname?.message}</p>
        {isSubmitted && !errors.lastname?.message &&
          <AcceptIcon width={22} height={22} className="AcceptIconContainer" data-cy="signUpLastnameAcceptIcon" />
        }
      </div>

      <div className="TextInputVerticalContainer">
        <TextInput {...register("username")} autoComplete="username" label="Username:" data-cy="signUpUsernameInput" />
        {isSubmitted && !errors.username?.message &&
          <AcceptIcon width={22} height={22} className="AcceptIconContainer" data-cy="signUpUsernameAcceptIcon" />
        }
        <p id='username-error' className="text-xs" data-cy="signUpUsernameError">{errors.username?.message}</p>
      </div>

      <div className="TextInputVerticalContainer">
        <TextInput {...register("email")} autoComplete="email" type="email" label="Email:" data-cy="signUpEmailInput" />
        {isSubmitted && !errors.email?.message &&
          <AcceptIcon width={22} height={22} className="AcceptIconContainer" data-cy="signUpEmailAcceptIcon" />
        }
        <p id='email-error' className="text-xs" data-cy="signUpEmailError">{errors.email?.message}</p>
      </div>
      {/* autoComplete="tel"  */}
      <div className="TextInputVerticalContainer">
        <PhoneInput {...register("phone")} label="Phone:" data-cy="signUpPhoneInput" />
        {isSubmitted && !errors.phone?.message &&
          <AcceptIcon width={22} height={22} className="AcceptIconContainer" data-cy="signUpPhoneAcceptIcon" />
        }
        <p id='phone-error' className="text-xs" data-cy="signUpPhoneError">{errors.phone?.message}</p>
      </div>

      <hr />

      <div className="TextInputVerticalContainer">
        <TextInput {...register("password")} autoComplete="new-password" type="password" label="Password:"
          data-cy="signUpPasswordInput"
        />
        {isSubmitted && !errors.password?.message &&
          <AcceptIcon width={22} height={22} className="AcceptIconContainer" data-cy="signUpPasswordAcceptIcon" />
        }
        <p id='password-error' className="text-xs" data-cy="signUpPasswordError">{errors.password?.message}</p>
      </div>
      <div className="TextInputVerticalContainer">
        <TextInput {...register("confirmPassword")} type="password" label="Confirm Password:"
          data-cy="signUpConfirmPasswordInput"
        />
        {isSubmitted && !errors.confirmPassword?.message &&
          <AcceptIcon width={22} height={22} className="AcceptIconContainer" data-cy="signUpConfirmPasswordAcceptIcon" />
        }
        <p id='confirm-password-error' className="text-xs" data-cy="signUpConfirmPasswordError">{errors.confirmPassword?.message}</p>
      </div>

      <Button type="submit" className="SubmitButton" disabled={isSubmitting} data-cy="signUpSubmitButton">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
