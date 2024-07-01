import { baseURL } from "../utils/baseURL";

export async function getCompanies() {
  const response = await fetch(`${baseURL}/v1/company`);
  const data = await response.json();
  return data;
}

export async function updateCompany(id, company) {
  const response = await fetch(`${baseURL}/v1/company/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(company),
  });
}
