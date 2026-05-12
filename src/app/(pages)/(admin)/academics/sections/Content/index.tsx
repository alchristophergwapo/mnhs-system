import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import GradeLevelFilter from "./GradeLevelFilter";
import { GetSectionsApiResponse } from "../SectionsApi";
import { SharedPropsType } from "@components/PageCardedWrapper";
import Section from "./Section";
import CreateSection from "../CreateSection";
import { useState } from "react";
import Loading from "@components/Loading";

function Content({
  data,
  isLoading,
}: Partial<SharedPropsType<GetSectionsApiResponse>>) {
  const sections = data?.sections;
  const totalSections = data?.totalSections;
  const totalStudents = data?.totalStudents;
  const totalAvailableSeats = data?.totalAvailableSeats;
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
          <Paper className="p-4 flex flex-col items-center" elevation={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
              }}
            >
              Total Sections
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "",
              }}
            >
              {totalSections}
            </Typography>
          </Paper>
          <Paper className="p-4 flex flex-col items-center" elevation={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
              }}
            >
              Total Students
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "",
              }}
            >
              {totalStudents}
            </Typography>
          </Paper>
          <Paper className="p-4 flex flex-col items-center" elevation={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
              }}
            >
              Available Seats
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "",
              }}
            >
              {totalAvailableSeats}
            </Typography>
          </Paper>
        </div>
        <div className="flex flex-row-reverse">
          <GradeLevelFilter onChange={() => {}} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {sections?.map((section) => (
          <Section
            key={`section-${section.id}`}
            section={section}
            onEdit={() => setOpenCreateSection({ open: true, id: section.id })}
          />
        ))}
      </div>
      <CreateSection
        {...openCreateSection}
        handleClose={() => setOpenCreateSection({ open: false, id: null })}
      />
    </div>
  );
}

export default Content;
