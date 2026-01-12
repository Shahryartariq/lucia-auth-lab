import dotenvFlow from "dotenv-flow";
import { neon } from "@neondatabase/serverless";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenvFlow.config();

// Neon SQL client
const sql = neon(process.env.DATABASE_URL);

// Dummy training data
const DUMMY_TRAININGS = [
  {
    title: "Yoga",
    image: "/yoga.jpg",
    description: "A gentle way to improve flexibility and balance.",
  },
  {
    title: "Boxing",
    image: "/boxing.jpg",
    description: "A high-energy workout that improves strength and speed.",
  },
  {
    title: "Running",
    image: "/running.jpg",
    description: "A great way to improve cardiovascular health and endurance.",
  },
  {
    title: "Weightlifting",
    image: "/weightlifting.jpg",
    description: "A strength-building workout that helps tone muscles.",
  },
  {
    title: "Cycling",
    image: "/cycling.jpg",
    description:
      "A low-impact workout that improves cardiovascular health and endurance.",
  },
  {
    title: "Gaming",
    image: "/gaming.jpg",
    description:
      "A fun way to improve hand-eye coordination and reflexes.",
  },
  {
    title: "Sailing",
    image: "/sailing.jpg",
    description:
      "A relaxing way to enjoy the outdoors and improve balance.",
  },
];

async function initDB() {
  // 1️⃣ Users table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `;

  // 2️⃣ Sessions table
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      expires_at TIMESTAMP NOT NULL,
      user_id INTEGER NOT NULL,
      CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `;

  // 3️⃣ Trainings table
  await sql`
    CREATE TABLE IF NOT EXISTS trainings (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `;

  // 4️⃣ Seed trainings (idempotent)
  for (const training of DUMMY_TRAININGS) {
    await sql`
      INSERT INTO trainings (
        title,
        image,
        description
      ) VALUES (
        ${training.title},
        ${training.image},
        ${training.description}
      )
      ON CONFLICT DO NOTHING;
    `;
  }

  console.log("✅ Database initialized successfully");
}

// Run script
initDB()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ DB init failed:", err);
    process.exit(1);
  });

export default sql;
