"use client";

import Button from "@/app/SharedComponents/Button";
import { showPopupMessage } from "@/app/SharedComponents/PopupMessage";
import TextInput from "@/app/SharedComponents/TextInput";
import { loginUser } from "@/domain/api/actions";
import { loginSchema } from "@/domain/api/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const SignInForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginUser(data);
      showPopupMessage('Sign in successful!');

    } catch (error) {
      showPopupMessage((error as Error)?.message || 'Unknown error', true);
    }
  };

  return (
    <form className="BasicFormMainContainer" data-cy="signInForm" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
      <h3 className="text-2xl font-bold" data-cy="signInFormHeading">Sign In Form</h3>
      <div className="TextInputVerticalContainer">
        <TextInput {...register("username")}
          autoComplete="username"
          label="Username:"
          aria-describedby="username-error"
          data-cy="signInUsernameInput"
        />
        <p id='username-error' className="text-xs" data-cy="signInUsernameError">{errors.username?.message}</p>
      </div>

      <div className="TextInputVerticalContainer">
        <TextInput {...register("password")}
          type="username"
          autoComplete="current-password"
          label="Password:"
          aria-describedby="password-error"
          data-cy="signInPasswordInput"
        />
        <p id='password-error' className="text-xs" data-cy="signInPasswordError">{errors.password?.message}</p>
      </div>

      <Button type="submit" className="SubmitButton" data-cy="signInSubmitButton" disabled={isSubmitting}>Sign In</Button>
    </form>
  );
};
export default SignInForm;
