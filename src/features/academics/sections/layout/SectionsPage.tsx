"use client";

import PageWrapper from "@components/layouts/PageCardedWrapper";
import { useState } from "react";
import { useGetSectionsQuery } from "../api/sections.api";
import SectionsPageHeaders from "./SectionsPageHeader";
import SectionsPageContent from "./SectionsPageContent";
import { GetSectionsApiResponse } from "../api/sections.types";
import CreateSectionModal from "../components/CreateSectionModal";

/**
 * Renders the Sections page component.
 * This component manages the state for search parameters, handles the fetching of sections data,
 * and controls the visibility of the 'Create Section' dialog.
 * It wraps the main content within a PageWrapper, passing down necessary loading states,
 * data, and header configurations.
 * 
 * @returns {JSX.Element} The rendered Sections page component.
 */
function SectionsPage() {
  const [parameters, setParameters] = useState({
    q: "",
  });
  const { data, isFetching, isSuccess } = useGetSectionsQuery(parameters);
  const total = data?.totalSections;
  const [openCreateSection, setOpenCreateSection] = useState(false);

  return (
    <PageWrapper
      data={data as GetSectionsApiResponse}
      total={total || 0}
      isLoading={isFetching || !isSuccess}
      displayBreadcrumbs={false}
      header={<SectionsPageHeaders onAddSection={() => setOpenCreateSection(true)} />}
      content={<SectionsPageContent />}
    >
      <CreateSectionModal
        id={null}
        open={openCreateSection}
        handleClose={() => setOpenCreateSection(false)}
      />
    </PageWrapper>
  );
}

export default SectionsPage;
