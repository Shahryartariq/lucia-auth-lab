"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ mode }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <span className="spinner"></span>
      ) : mode === "login" ? (
        "Login"
      ) : (
        "Create Account"
      )}
    </button>
  );
}
