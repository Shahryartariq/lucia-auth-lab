import sql from "@/lib/db"; // your Neon client

export async function createUser(email, password) {
  try {
    const result = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${password})
      RETURNING id;
    `;
    return { userId: result[0].id };
  } catch (error) {
    if (error.code === "23505") {
      // Unique email violation
      return {
        errors: { email: "Email Account Already Exists" },
      };
    }
    throw error;
  }
}

export async function getUserByEmail(email) {
  const result = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
    LIMIT 1;
  `;

  return result[0] ?? null;
}
