import { getCookies } from "next-client-cookies/server";

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${input}`, {
    ...init,
    ...{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookies().get('access_token')}`
      }
    }
  });
  const result = await data.json();

  return result as T
}