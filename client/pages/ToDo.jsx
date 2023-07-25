import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addPost,
  deletePost,
  getAllTodo,
  updatePost,
} from "../services/todo.services";

const ToDo = ({
  loginCredentials,
  setIsLoggedIn,
  toasterConfig,
  setForm,
  setLoginCredentials,
}) => {
  const [modalMode, setModalMode] = useState(null);
  const [comment, setComment] = useState("");
  const [todoList, setTodoList] = useState([]);
  const targetPostRef = useRef();
  const targetCommentRef = useRef();
  const descriptionRef = useRef();
  const [newItem, setNewItem] = useState("");

  const deletePostHandler = async (post_id) => {
    try {
      const res = await deletePost(post_id);
      if (res?.success) {
        const newList = todoList.filter((i) => i?._id != post_id);
        setTodoList([...newList]);

        toast("Todo post have been deleted!", {
          ...toasterConfig,
          type: "success",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const addCommentHandler = async (post) => {
    if (comment?.trim()?.length > 0) {
      updatePostHandler(post?._id, {
        comments: [
          ...(post?.comments || []),
          {
            username: loginCredentials?.username,
            comment,
          },
        ],
      });
    } else {
      toast("Please fill up the field!", {
        ...toasterConfig,
        type: "error",
      });
    }
  };
  const updatePostHandler = async (post_id, newData) => {
    try {
      const res = await updatePost(post_id, newData);
      if (res?.success) {
        toast("Todo post have been updated!", {
          ...toasterConfig,
          type: "success",
        });
        setModalMode(null);
        load();
      }
    } catch (e) {
      toast("Please fill up the field!", {
        ...toasterConfig,
        type: "error",
      });
      console.log(e);
    }
  };
  const addPostHandler = async () => {
    try {
      const res = await addPost({
        description: newItem,
        username: loginCredentials?.username,
      });
      if (res?.success) {
        toast("Todo post have been added!", {
          ...toasterConfig,
          type: "success",
        });
        setNewItem("");
        setTodoList([res?.data, ...todoList]);
      } else {
        toast("Please fill up the field!", {
          ...toasterConfig,
          type: "error",
        });
      }
    } catch (e) {
      toast("Something went wrong.", {
        ...toasterConfig,
        type: "error",
      });
      console.log(e);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setForm("login")
    setLoginCredentials({
      username: "",
      password: "",
    });
    setIsLoggedIn(false);
  };

  const load = async () => {
    try {
      const res = await getAllTodo();

      if (res?.success) {
        setTodoList(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCommentHandler = async (post, comment_id) => {
    updatePostHandler(post?._id, {
      comments: [...post?.comments?.filter((i) => i?._id != comment_id)],
    });
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      {modalMode && (
        <div className="modal-wrapper">
          <div className="modal-card">
            <p className="header text-left">Edit {modalMode}</p>
            <input
              type="text"
              placeholder="Todo"
              defaultValue={
                modalMode == "post"
                  ? targetPostRef?.current?.description
                  : targetCommentRef?.current?.comment
              }
              ref={descriptionRef}
            />
            <div className="modal-button">
              <button
                className="success-btn"
                onClick={() => {
                  let temp_comments = [];
                  let update_comments = targetPostRef?.current?.comments;
                  if (modalMode == "comment") {
                    if(descriptionRef?.current?.value?.trim()?.length == 0){
                      return toast("Please fill up the field.", {
                        ...toasterConfig,
                        type: "error",
                      });
                    }
                    console.log(
                      update_comments,
                      descriptionRef?.current?.value
                    );
                    for (let i in update_comments) {
                      console.log(
                        targetCommentRef?.current?._id == update_comments[i]._id
                      );
                      if (
                        targetCommentRef?.current?._id == update_comments[i]._id
                      ) {
                        temp_comments.push({
                          ...update_comments[i],
                          comment: descriptionRef?.current?.value,
                        });
                      } else {
                        temp_comments.push(update_comments[i]);
                        console.log(temp_comments);
                      }
                    }
                  }

                  modalMode == "post"
                    ? updatePostHandler(targetPostRef?.current?._id, {
                        description: descriptionRef.current?.value,
                      })
                    : updatePostHandler(targetPostRef?.current?._id, {
                        comments: temp_comments,
                      });
                }}
              >
                Save
              </button>
              <button className="dark-btn" onClick={() => setModalMode(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="form-card">
          <div className="header-wrapper">
            <p className="header">Todo List</p>
            <button className="dark-btn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
          <div className="add-item">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e?.target.value)}
              type="text"
              className=""
              placeholder="New Todo"
            />
            <button onClick={addPostHandler} className="success-btn">
              Add
            </button>
          </div>

          <div>
            {todoList?.length > 0 ? (
              todoList.map((item) => (
                <div key={item?._id} className="item-card">
                  <div className="item-body">
                    <div>
                      <p className="todo-item">{item?.description}</p>
                      <p className="text-sm">Posted By: {item?.username}</p>
                    </div>
                    {loginCredentials?.username == item?.username && (
                      <div className="item-buttons">
                        <button
                          className="primary-btn"
                          onClick={() => {
                            targetPostRef.current = item;
                            setModalMode("post");
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="danger-btn"
                          onClick={() => deletePostHandler(item?._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  {item?.comments?.length > 0 && (
                    <>
                      <p className="text-bold text-sm">
                        Comments: {item?.comments?.length}
                      </p>
                      {item?.comments.map((comment, commentKey) => (
                        <div key={commentKey} className="comment-card">
                          <div className="item-body">
                            <div>
                              <p>{comment?.comment}</p>
                              <p className="text-sm">
                                Commented By: {comment?.username}
                              </p>
                            </div>
                            {loginCredentials?.username ==
                              comment?.username && (
                              <div className="item-buttons">
                                <button
                                  className="primary-btn"
                                  onClick={() => {
                                    targetPostRef.current = item;
                                    targetCommentRef.current = comment;
                                    setModalMode("comment");
                                  }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="danger-btn"
                                  onClick={() =>
                                    deleteCommentHandler(item, comment?._id)
                                  }
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <div className="add-item">
                    <input
                      type="text"
                      placeholder="Enter Comment here"
                      className="input-dark"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      onClick={() => addCommentHandler(item)}
                      className="success-btn"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">There is no data right now</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
