import React, { useContext, useEffect, useRef, useState } from "react";
import parsley from "parsleyjs";
import jquery from "jquery";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth-context";

const UserProfile = () => {
  const loginForm = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    postTitle: "",
    postContent: "",
    postCategoryId: "",
  });
  const { callApi, error } = useApi();
  const twiceRef = useRef(false);
  const [categories, setCategories] = useState([]);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    jquery(loginForm.current).parsley();
    if (twiceRef.current === false) {
      setUser(authContext.getCurrentUserDetail());
      fetchCategories();
    }
    return () => {
      twiceRef.current = true;
    };
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      let respData = await callApi("/api/v1/categories/", "GET");
      setCategories(respData);
    } catch (err) {
      toast.error(error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (event, field) => {
    setPostData((prevData) => {
      return { ...prevData, [field]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (postData.postTitle.trim() === "") {
      toast.error("Post Title cannot be empty");
      return;
    }
    if (postData.postContent.trim() === "") {
      toast.error("Post Content cannot be empty");
      return;
    }
    if (postData.postCategoryId === "") {
      toast.error("Post Category cannot be empty");
    }

    //post data submission
    setIsLoading(true);
    try {
      const body = {
        postTitle: postData.postTitle,
        postContent: postData.postContent,
        postCategoryId: postData.postCategoryId,
        postUserId: user.id,
      };
      const response = await callApi(
        "/api/v1/users/categories/posts",
        "POST",
        body,
        {
          Authorization: `Bearer ${authContext.getToken()}`,
        }
      );

      toast.success("Post Created Successfully");
      resetHandler();
    } catch (e) {
      toast.error(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetHandler = () => {
    setPostData({
      postTitle: "",
      postContent: "",
      postCategoryId: "",
    });
  };

  return (
    <>
      <div className="w-full max-w-lg p-4 bg-indigo-950 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 md:max-w-3xl">
        <form
          className="space-y-6"
          ref={loginForm}
          onSubmit={submitHandler}
          data-parsley-validate
          data-parsley-focus="none"
          noValidate
        >
          <h5 className="text-xl font-medium text-white text-center">
            Add Post
          </h5>
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-white"
            >
              Post Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title..."
              className="bg-gray-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => inputChangeHandler(e, "postTitle")}
              value={postData.postTitle}
              // invalid={error?.postTitle ? true : false}
              data-parsley-trigger="focusout"
              data-parsley-required-message="Post Title is required."
              disabled={isLoading}
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Post Content
            </label>
            <textarea
              type="text"
              name="content"
              id="content"
              placeholder="Content..."
              className="bg-gray-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-36"
              required
              onChange={(e) => inputChangeHandler(e, "postContent")}
              value={postData.postContent}
              // invalid={error?.postContent ? true : false}
              data-parsley-trigger="focusout"
              data-parsley-required-message="Post Content is required."
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-white"
            >
              Choose a category
            </label>
            <select
              id="category"
              className="bg-gray-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => inputChangeHandler(e, "postCategoryId")}
              value={postData.postCategory}
              // invalid={error?.postCategory ? true : false}
              data-parsley-trigger="focusout"
              data-parsley-required-message="Post Category is required."
              disabled={isLoading}
              defaultValue={0}
            >
              <option value={0} disabled>
                --Category--
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-around items-center">
            <button
              type="submit"
              className="w-full text-white bg-green-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading}
            >
              {isLoading ? "Adding Post..." : "Add Post"}
            </button>
            <button
              type="reset"
              className="ms-5 w-full text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading}
              onClick={resetHandler}
            >
              Reset Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
