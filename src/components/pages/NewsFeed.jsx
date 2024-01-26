import React, { useEffect, useRef, useState } from "react";
import NewsFeedCard from "./news-feed/NewsFeedCard";
import useAxios from "../hooks/useAxios";
import Pagination from "react-js-pagination";
import { useQuery } from "@tanstack/react-query";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { myAxios } = useAxios();
  // const twiceRef = useRef(false);
  let cntPerPage = 5;
  let refPageNo = useRef(1);
  const [pageCount, setPageCount] = useState(1);
  const refCountPerPage = useRef(cntPerPage);
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = controllerRef.current;
    // if (twiceRef.current === false) {
    //   loadPosts({ signal: controller.signal });
    // }

    loadPosts({ signal: controller.signal });
    return () => {
      // twiceRef.current = true;
      controller.abort();
      controllerRef.current = new AbortController();
    };
  }, []);

  const loadPosts = async ({ signal }) => {
    // window.scroll(0, 0);
    setIsLoading(true);
    try {
      let filteredParam = `/api/v1/postsPaginated?`;
      refCountPerPage.current = cntPerPage;
      filteredParam = filteredParam.concat(
        `pageNumber=${refPageNo.current - 1}&pageSize=${
          refCountPerPage.current
        }`
      );

      const response = await myAxios.get(filteredParam, { signal });
      console.log(response.data);
      // setPageResponse(response.data);

      if (signal.aborted) {
        // Do nothing if the component has been unmounted
        return;
      }

      if (response.data) {
        // return response.data;
        setPageCount(response.data.totalElements);
        setPosts(response.data.content);
      } else {
        throw new Error("Invalid response data"); // Throw an error if the response is not as expected
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (e) => {
    refPageNo.current = e;
    loadPosts({ signal: controllerRef.current.signal });
  };

  const onSelectPaginationDrop = async (e) => {
    refPageNo.current = 1;
    refCountPerPage.current = e;
    cntPerPage = e;
    loadPosts({ signal: controllerRef.current.signal });
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && posts.length === 0 && <p>No content to show</p>}
      {!isLoading && posts.length > 0 && (
        <>
          <div className="w-5/6">
            <div className="flex justify-between items-center w-full mb-12">
              <h5>NewsFeed</h5>
              <h5>
                Total Posts : <span className="mx-2">{pageCount}</span>
              </h5>
            </div>
            <div>
              {posts.map((post) => (
                <NewsFeedCard key={post.postId} post={post} />
              ))}
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="text-sm">
                <span>
                  Showing{" "}
                  {refCountPerPage.current * (refPageNo.current - 1) + 1} to{" "}
                  {refCountPerPage.current * refPageNo.current < pageCount
                    ? refCountPerPage.current * refPageNo.current
                    : pageCount}{" "}
                  of {pageCount} entries
                </span>
              </div>
              <div className="text-sm">
                <Pagination
                  activeClass="paginate_button page-item active"
                  activeLinkClass="paginate_button page-item"
                  disabledClass="paginate_button page-item"
                  activePage={refPageNo.current}
                  linkClass="page-link"
                  itemsCountPerPage={+refCountPerPage.current}
                  totalItemsCount={pageCount}
                  pageRangeDisplayed={3}
                  onChange={handlePageChange.bind(this)}
                />
              </div>
              <div>
                <div className="input-group mb-3 text-sm border-1 border-white border-solid">
                  <div className="input-group-prepend">
                    <label
                      className="bg-indigo-950 text-white p-2"
                      htmlFor="inputGroupSelect01"
                    >
                      Rows
                    </label>
                  </div>
                  <select
                    className="custom-select bg-indigo-950 text-white rounded-lg"
                    id="showPageId"
                    onChange={(e) => {
                      onSelectPaginationDrop(e.target.value);
                    }}
                    defaultValue={refCountPerPage.current}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewsFeed;
