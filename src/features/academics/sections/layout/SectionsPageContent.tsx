import { SharedPropsType } from "@components/layouts/PageCardedWrapper";
import { useState } from "react";
import Loading from "@components/Loading";
import GradeLevelFilter from "@components/Filters/GradeLevelFilter";
import { GetSectionsApiResponse } from "../api/sections.types";
import SectionsStatsCard from "../components/SectionsStatsCard";
import SectionCard from "../components/SectionCard";
import CreateSectionModal from "../components/CreateSectionModal";

/**
 * Renders the main content for the Sections page, displaying section statistics,
 * a grade level filter, a grid of section cards, and a modal for creating/editing sections.
 * 
 * @param {Partial<SharedPropsType<GetSectionsApiResponse>>} props - The component props.
 * @param {GetSectionsApiResponse} [props.data] - The API response data containing sections and statistics.
 * @param {boolean} [props.isLoading] - Flag indicating if the data is currently loading.
 * @returns {JSX.Element} The rendered sections page content or a loading spinner.
 */
function SectionsPageContent({
  data,
  isLoading,
}: Partial<SharedPropsType<GetSectionsApiResponse>>) {
  const { sections, totalSections, totalStudents, totalAvailableSeats } = data || {};
  const [openCreateSection, setOpenCreateSection] = useState({
    open: false,
    id: null,
  } as { open: boolean; id: number | null });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-row gap-4">
          <SectionsStatsCard title="Total Sections" total={totalSections} />
          <SectionsStatsCard title="Total Students" total={totalStudents} />
          <SectionsStatsCard title="Available Seats" total={totalAvailableSeats} />
        </div>
        <div className="flex flex-row-reverse">
          <GradeLevelFilter onChange={() => {}} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {sections?.map((section) => (
          <SectionCard
            key={`section-${section.id}`}
            section={section}
            onEdit={() => setOpenCreateSection({ open: true, id: Number(section.id) })}
          />
        ))}
      </div>
      <CreateSectionModal
        {...openCreateSection}
        handleClose={() => setOpenCreateSection({ open: false, id: null })}
      />
    </div>
  );
}

export default SectionsPageContent;
