import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import GlobalTable from "../../../ui/global-table";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
const IndexPage = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const pageSize = 25;

  const {
    data,
    isLoading: isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ["product"],
    async ({ pageParam = 1 }) =>
      (await GetAllData("portfolio", {
        limit: pageSize,
        page: pageParam,
        type:"product"
      })) || {},
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.meta?.currentPage + 1;
      }
    }
  );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const DataArr = data?.pages?.length
    ? data?.pages?.reduce((acc, page) => [...acc, ...page?.items], [])
    : [];
  return (
    <>
      <div className="mx-auto w-full h-full  max-w-[792px] mt-[30px] items-center">
        {DataArr &&
          DataArr?.map((e) => (
            <GlobalTable
              key={e?.id}
              id={e?.id}
              fields={[e?.secondText, e?.link, e?.regularPrice]}
              confirm={false}
              show={true}
              update={() => navigate(`/portfolio/${e?.id}`)}
              ondelete={"portfolio"}
              secondUrl={'product'}
            />
          ))}
        <div ref={ref} style={{ padding: "10px" }}></div>
      </div>
    </>
  );
};

export default IndexPage;
