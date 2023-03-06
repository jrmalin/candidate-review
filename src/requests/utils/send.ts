import { HttpRequestMethod } from "./HttpRequestMethod";

export const send = async <T>(
  pathname: string,
  method: HttpRequestMethod,
  body?: T
): Promise<any> => {
  const init: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(pathname, init);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return (await response.json()) as T;
};
