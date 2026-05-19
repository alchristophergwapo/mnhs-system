"use client";

import PageWrapper from "@components/layouts/PageCardedWrapper";
import SubjectsPageHeader from "./SubjectsPageHeader";
import SubjectsPageContent from "./SubjectsPageContent";

function SubjectsPage() {
  return (
    <PageWrapper
      className="bg-gray-100 h-full"
      header={<SubjectsPageHeader />}
      content={<SubjectsPageContent />}
    />
  );
}

export default SubjectsPage;
