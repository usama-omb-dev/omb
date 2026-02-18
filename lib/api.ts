const BASE_URL = "https://backend.onlinemarketingbakery.nl/wp-json/wp/v2";

export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
