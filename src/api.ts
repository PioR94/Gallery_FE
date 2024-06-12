export const baseUrl = process.env.REACT_APP_BASE_URL;

export const sendDt = (data: any, path: string) => {
  fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      typeof data === 'number' ||
        typeof data === 'boolean' ||
        typeof data === 'string'
        ? { data }
        : { ...data },
    ),
  });
};

export const downloadData = (http: string) => {
  return fetch(http).then((r) => r.json());
};

export const updateData = (data: any, path: string) => {
  return fetch(`${baseUrl}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      typeof data === 'number' ||
        typeof data === 'boolean' ||
        typeof data === 'string'
        ? { data }
        : { ...data },
    ),
  }).then((r) => r.json());
};
