import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { AddDataId, GetAllData } from "../../../service/global";
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
    ["article"],
    async ({ pageParam = 1 }) =>
      (await GetAllData("article", {
        limit: pageSize,
        page: pageParam
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
              fields={[e?.title, e?.user?.name, e?.likesCount]}
              confirm={false}
              OnConfirm={e?.isActive ? null : async() => {
                await AddDataId('article/isActive', e?.id)
                  .then(() => {
                    queryClient.invalidateQueries(['article'])
                  })
                  .catch(err => { console.log(err) })
              }}
              show={true}
              update={() => navigate(`/article/${e?.id}`)}
              ondelete={"article"}
            />
          ))}
        <div ref={ref} style={{ padding: "10px" }}></div>
      </div>
    </>
  );
};

export default IndexPage;
