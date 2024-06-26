import GlobalTable from "../../../ui/global-table";

const SitesPage = () => {
  return (
    <>

    <div className="mx-auto w-full max-w-[792px] mt-[30px] items-center">
    
      <GlobalTable
        fields={["text", "text"]}
        confirm={false}
        OnConfirm={() => console.log("ok")}
        show={true}
        update={true}
        ondelete={true}
      />
    </div>
    </>
  );
};

export default SitesPage;
