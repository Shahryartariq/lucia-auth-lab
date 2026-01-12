"use server";
import { redirect } from "next/navigation";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { createAuthSession } from "@/lib/auth";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please Enter A Valid Email Address";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const hashedPassword = hashUserPassword(password);
  
  const result = await createUser(email, hashedPassword);
 
  if (result.errors) {
    return { errors: result.errors };
  } else {
     await createAuthSession(result.userId)
     redirect("/training");
  }

}
