import React, { useEffect, useRef, useState } from "react";
import NewsFeedCard from "./news-feed/NewsFeedCard";
import useAxios from "../hooks/useAxios";
import Pagination from "react-js-pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const NewsFeed1 = () => {
  const { myAxios } = useAxios();
  let cntPerPage = 5;
  let refPageNo = useRef(1);
  const [pageCount, setPageCount] = useState(1);
  const refCountPerPage = useRef(cntPerPage);
  // const controllerRef = useRef(new AbortController());
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: ({ signal }) => loadPosts({ signal: signal }),
    // staleTime: 5000,
    // refetchOnWindowFocus: false,
  });

  const loadPosts = async ({ signal }) => {
    // window.scroll(0, 0);
    try {
      let filteredParam = `/api/v1/postsPaginated?`;
      refCountPerPage.current = cntPerPage;
      filteredParam = filteredParam.concat(
        `pageNumber=${refPageNo.current - 1}&pageSize=${
          refCountPerPage.current
        }`
      );

      const response = await myAxios.get(filteredParam, { signal });

      if (response.data) {
        // console.log(response.data);
        setPageCount(response.data.totalElements);
        return response.data;
      }
    } catch (error) {
      // console.error(error);
      throw error;
    }
  };

  const handlePageChange = async (e) => {
    refPageNo.current = e;
    // loadPosts({ signal: controllerRef.current.signal });
    queryClient.invalidateQueries("posts");
    // refetch();
  };

  const onSelectPaginationDrop = async (e) => {
    refPageNo.current = 1;
    refCountPerPage.current = e.target.value;
    cntPerPage = e.target.value;
    // loadPosts({ signal: controllerRef.current.signal });
    // queryClient.invalidateQueries("posts");
    refetch();
  };

  return (
    <>
      {isPending && <div>Loading...</div>}
      {isError && <div>Error: {error}</div>}
      {data && (
        <div className="w-5/6">
          <div className="flex justify-between items-center w-full mb-12">
            <h5>NewsFeed</h5>
            <h5>
              Total Posts : <span className="mx-2">{pageCount}</span>
            </h5>
          </div>
          <div>
            {data.content.map((post) => (
              <NewsFeedCard key={post.postId} post={post} />
            ))}
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-sm">
              <span>
                Showing {refCountPerPage.current * (refPageNo.current - 1) + 1}{" "}
                to{" "}
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
                    onSelectPaginationDrop(e);
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
      )}
    </>
  );
};

export default NewsFeed1;
