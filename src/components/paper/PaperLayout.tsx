import SEARCH_PARAMS from "@/data/searchParamsKeys";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../shared/Loading";
import Modal from "../shared/Modal";
import CustomTable from "../tables/wrapper/CustomTable";
import PaperHeader from "./PaperHeader";

type PaperLayoutProps = {
  name: string;
  queryFn: (
    page: number,
    limit: number,
  ) => Promise<unknown>;
  columns: unknown[];
  queryKey: string;
  paperHeaderProps: {
    name: string;
  };
  tableProps?: unknown;
  formProps?: unknown;
  handleDeleteSelected: (ids: string[]) => Promise<unknown>;
  FormWrapper: React.ElementType;
}

const PaperLayout = ({
  name,
  queryFn,
  queryKey,
  columns,
  paperHeaderProps,
  FormWrapper
}: PaperLayoutProps) => {
  const pageSearchParam = +useCustomSearchParams(SEARCH_PARAMS.PAGE) || 1;
  const limitSearchParam = +useCustomSearchParams(SEARCH_PARAMS.LIMIT) || 50;
  const [openForm, setOpenForm] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const { isLoading, isError, data, error, isFetching, refetch } = useQuery({
    queryKey: [queryKey, pageSearchParam, limitSearchParam],
    queryFn: async () => {
      const response = await queryFn(
        pageSearchParam,
        limitSearchParam,
        // globalFilter,
        // columnFilters
      );
      if (response) {
        return response.data;
      }
    },
    // queryFn: () => {},
  });

  return (
    <>
      {/* {isError && <ErrorModal title={error?.message} />} */}
      {(isLoading || isFetching) && <Loading />}
      <Modal open={openForm} onClose={() => setOpenForm(false)}>
        <FormWrapper
          name={name}
          refetch={refetch}
          onClose={() => setOpenForm(false)}
          queryKey={queryKey}
        />
      </Modal>
      <div className="relative">
        <PaperHeader paperHeaderProps={paperHeaderProps} />
        <CustomTable
          columns={columns}
          data={!isLoading ? data : []}
          pageCount={pageCount} />
      </div>
    </>
  );
};

export default PaperLayout;
