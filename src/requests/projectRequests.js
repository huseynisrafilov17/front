import { baseURL } from "../utils/baseURL";

export async function getProjectCategories() {
  const response = await fetch(`${baseURL}/project-categories`);
  const data = await response.json();
  return data;
}

export async function getProjectServices() {
  const response = await fetch(`${baseURL}/project-service-types`);
  const data = await response.json();
  return data;
}

export async function getProjects() {
  const response = await fetch(`${baseURL}/v1/project`);
  const data = await response.json();
  return data;
}
