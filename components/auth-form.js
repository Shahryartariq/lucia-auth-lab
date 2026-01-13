"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { auth } from "@/action/auth-action";
import { SubmitButton } from "./submit-auth";


export default function AuthForm({ mode }) {
  const action = auth.bind(null, mode);
  const [formState, formAction] = useFormState(action, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
         <SubmitButton mode={mode} />
      </p>
      <p>
        {mode === "login" && <Link href="/?mode=signup">Create an account.</Link>}
        {mode === "signup" && <Link href="/?mode=login">Login with existing account.</Link>}
      </p>
    </form>
  );
}
