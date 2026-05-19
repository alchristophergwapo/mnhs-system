'use client';

import PageWrapper from "@components/layouts/PageCardedWrapper";
import Headers from "./Headers";
import Content from "./Content";
import { GetSectionsApiResponse, useGetSectionsQuery } from "./SectionsApi";
import { useState } from "react";
import CreateSection from "./CreateSection";

function Sections() {
    const [parameters, setParameters] = useState({
        q: "",
    });
    const {data, isFetching, isSuccess} = useGetSectionsQuery(parameters);
    const total = data?.totalSections;
    const [openCreateSection, setOpenCreateSection] = useState(false);

  return (
    <PageWrapper
      data={data as GetSectionsApiResponse}
      total={total || 0}
      isLoading={isFetching || !isSuccess}
      displayBreadcrumbs={false}
      header={<Headers onAddSection={() => setOpenCreateSection(true)} />}
      content={<Content />}
    >
        <CreateSection id={null} open={openCreateSection} handleClose={() => setOpenCreateSection(false)} />
    </PageWrapper>
  );
}

export default Sections;
