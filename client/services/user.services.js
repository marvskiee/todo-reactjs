export const checkAuth = async (local_user) => {
  const result = await fetch(
    "http://localhost:5000/api/user/find/" + local_user,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result?.json();
  return data;
};
export const login = async (newData) => {
  const result = await fetch("http://localhost:5000/api/user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await result?.json();
  return data;
};

export const register = async (newData) => {
  const result = await fetch("http://localhost:5000/api/user/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await result?.json();
  return data;
};
