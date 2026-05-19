"use client";

import PageWrapper from "@components/layouts/PageCardedWrapper";
import SchedulesPageHeader from "./SchedulesPageHeader";
import SchedulesPageContent from "./SchedulesPageContent";

function SchedulesPage() {
  return (
    <PageWrapper
      header={<SchedulesPageHeader />}
      content={<SchedulesPageContent />}
    />
  );
}

export default SchedulesPage;
