"use server";
import { redirect } from "next/navigation";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { createAuthSession } from "@/lib/auth";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please Enter A Valid Email Address";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters long";
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
  }

  await createAuthSession(result.userId);
  redirect("/training");
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials",
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}


export async function auth(mode, prevState, formData) {
  if(mode === 'login'){
    return login(prevState, formData);
  }

  return signup(prevState, formData);
}