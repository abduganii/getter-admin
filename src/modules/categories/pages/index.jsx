import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import GlobalTable from "../../../ui/global-table";
import { useInView } from 'react-intersection-observer'
import { useNavigate } from "react-router-dom";
const SitesPage = () => {
  const navigate = useNavigate()
  const { ref, inView } = useInView()
  const pageSize = 20;

  const { data, isLoading: isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['categories'],
    async ({ pageParam = 1 }) => await GetAllData("categories", {
      limit: pageSize,
      page: pageParam
    }
    ) || {},

    {
      getNextPageParam: (lastPage) => {
        return lastPage?.meta?.currentPage +1
      }
    }
  )
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  const DataArr =  data?.pages?.length ?data?.pages?.reduce((acc, page) => [...acc, ...page?.items], []) : []
 
  return (
    <>

    <div className="mx-auto w-full max-w-[792px] mt-[30px] items-center">

        {DataArr && DataArr?.map(e => (
          <GlobalTable
            key={e?.id}
            id={e?.id}
            fields={[,e?.title, e?.type]}
            confirm={false}
            show={true}
            update={()=>navigate(`/categories/${e?.id}`)}
            ondelete={'categories'}
            />
          ))}
        <div ref={ref} style={{ padding: "10px" }}></div>
    </div>
    </>
  );
};

export default SitesPage;
