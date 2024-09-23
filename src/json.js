async function manageErrors(response) {
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
  return response;
}

async function post(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await manageErrors(response);

  const resData = await response.json();

  return resData;
}

async function put(url, data) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await manageErrors(response);

  const resData = await response.json();

  return resData;
}

async function get(url) {
  const response = await fetch(url);

  await manageErrors(response);
  const data = await response.json();
  return data;
}

async function remove(url, data) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await manageErrors(response);

  const resData = await response.json();

  return resData;
}

export { put, get, post, remove };
