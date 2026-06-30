const BASE_URL = "https://lm-ls-183164363219.asia-south1.run.app";
export async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("❌", path, text);
    throw new Error(text);
  }

  return res.json();
}
