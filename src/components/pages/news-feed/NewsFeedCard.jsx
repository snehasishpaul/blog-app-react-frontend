import React, { useEffect } from "react";

const NewsFeed = (props) => {
  return (
    <>
      <div className="max-w-full mx-auto bg-indigo-950 shadow-lg overflow-hidden mb-20">
        <div className="md:flex md:flex-col">
          <div className="md:flex-shrink-0">
            {/* <img
              className="w-full max-h-52"
              src="https://via.placeholder.com/150"
              alt="Card Image"
            /> */}
          </div>
          <div className="p-8 border-1 border-solid border-white rounded-lg">
            <div className="uppercase tracking-wide text-sm text-white font-semibold">
              {props.post.postTitle}
            </div>
            <p className="mt-2 text-slate-400">{props.post.postContent}</p>
            <div className="mt-4">
              <a href="#" className="text-indigo-500">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
