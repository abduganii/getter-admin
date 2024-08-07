import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import {  AddDataId, GetAllData, UpdateData, UpdateDataId} from "../../../service/global";
import GlobalTable from "../../../ui/global-table";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
const SitesPage = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const pageSize = 25;
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ["website"],
    async ({ pageParam = 1 }) =>
      (await GetAllData("website", {
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
      <div className="mx-auto w-full max-w-[792px] mt-[30px] items-center">
        {DataArr &&
          DataArr?.map((e) => (
            <GlobalTable
              key={e?.id}
              id={e?.id}
              fields={[e?.link, e?.title, e?.likesCount]}
              confirm={false}
              OnConfirm={e?.isActive ? null : async() => {
                await UpdateData('website/isActive', {
                  isActive:true
                }, e?.id)
                  .then(() => {
                    queryClient.invalidateQueries(['website'])
                  })
                  .catch(err => { console.log(err) })
              }}
              show={true}
              update={() => navigate(`/sites/${e?.id}`)}
              ondelete={"website"}
              fileid={e?.media}
            />
          ))}
        <div ref={ref} style={{ padding: "10px" }}></div>
      </div>
    </>
  );
};

export default SitesPage;
