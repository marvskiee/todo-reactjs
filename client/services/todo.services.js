export const deletePost = async (id) => {
  const result = await fetch("http://localhost:5000/api/post/delete/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await result?.json();
  return data;
};

export const updatePost = async (id, newData) => {
  const result = await fetch("http://localhost:5000/api/post/update/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await result?.json();
  return data;
};

export const addPost = async (newData) => {
  const result = await fetch("http://localhost:5000/api/post/add", {
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

export const getAllTodo = async () => {
  const result = await fetch("http://localhost:5000/api/post", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await result?.json();
  return data
};
