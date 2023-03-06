export async function postData<T>(url = "/", data = {}): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json() as T;
}

export async function getData(url = "/") {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache"
  });

  return response.json();
}
