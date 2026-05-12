"use client";

import PageWrapper from "@components/PageCardedWrapper";
import GradesPageHeader from "./GradesPageHeader";
import GradesPageContent from "./GradesPageContent";

function GradesPage() {
  return (
    <PageWrapper
      header={<GradesPageHeader />}
      content={<GradesPageContent />}
    />
  );
}

export default GradesPage;
