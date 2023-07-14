import React, { useEffect, useRef, useState } from "react";
import parsley from "parsleyjs";
import jquery from "jquery";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";

const UserProfile = () => {
  const loginForm = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    postTitle: "",
    postContent: "",
    postCategory: "",
  });
  const { callApi, error, setError } = useApi();

  useEffect(() => {
    jquery(loginForm.current).parsley();
    return () => {
      fetchCategories();
    };
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      let respData = await callApi("/api/v1/categories/", "GET");

      console.log(respData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (event, field) => {
    setPostData((prevData) => {
      return { ...prevData, [field]: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
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
              onChange={(e) => inputChangeHandler(e, "postCategory")}
              value={postData.postCategory}
              // invalid={error?.postCategory ? true : false}
              data-parsley-trigger="focusout"
              data-parsley-required-message="Post Category is required."
              disabled={isLoading}
            >
              <option defaultValue={null} disabled>
                Category...
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
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
