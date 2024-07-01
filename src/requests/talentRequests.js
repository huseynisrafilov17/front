import { baseURL } from "../utils/baseURL";

export async function getTalents() {
  const response = await fetch(`${baseURL}/v1/talent`);
  const data = await response.json();
  return data;
}

export async function updateTalents(id, talent) {
  const response = await fetch(`${baseURL}/v1/talent/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(talent),
  });
}
