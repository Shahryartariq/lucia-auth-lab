import sql from '@/lib/db'; // Neon client

export async function getTrainings() {
  const trainings = await sql`
    SELECT *
    FROM trainings;
  `;
  return trainings; // returns an array of rows
}
