import StudentsOverview from "./components/StudentsOverview";
import { People, SyncAltRounded } from "@mui/icons-material";
import prisma from "@lib/prisma";
import { Suspense } from "react";
import OverviewDataCard from "./components/OverviewDataCard";
import DashboardPaper from "@features/dashboard/components/DashboardPaper";

const dateNow = Date.now();

/**
 * SchoolYearOverview component.
 *
 * This component renders a school year overview page.
 * It consists of a header, a divider, and four OverviewData components.
 * The OverviewData components display the junior high school, senior high school, transfer students, and teachers data respectively.
 *
 * @returns {JSX.Element} - The JSX element for the component.
 */
async function SchoolYearOverview() {
  const weekAgo = new Date(dateNow - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  const [totalTransfereeStudents, totalTeachers, totalNewTeachers] =
    await Promise.all([
      prisma.enrollment.count({
        where: {
          schoolYearStart: new Date(new Date().getFullYear(), 5, 1), // June 1st of the current year
          schoolYearEnd: new Date(new Date().getFullYear() + 1, 4, 31), // May 31st of the next year
          student: {
            enrollmentBackground: {
              entryType: "TRANSFER",
            },
          },
        },
      }),
      prisma.teacher.count(),
      prisma.teacher.count({
        where: {
          createdAt: {
            gte: weekAgo, // Teachers added in the last 7 days
          },
        },
      }),
    ]);

  return (
    <DashboardPaper
      className="mt-8 z-10 gap-2 bg-white col-span-2 w-full h-full flex flex-col p-4 "
      title="School Year Overview"
    >
      <div className="w-full grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <Suspense fallback={<div>Loading...</div>}>
            <StudentsOverview />
          </Suspense>
        </div>
        <OverviewDataCard
          total={totalTransfereeStudents}
          title="Transfer Students"
          icon={
            <People
              fontSize="large"
              color="inherit"
              className="text-[#00F5D4]! dark:text-[#006666]!"
            />
          }
        />
        <OverviewDataCard
          total={totalTeachers}
          title="Teachers"
          icon={
            <SyncAltRounded
              fontSize="large"
              color="inherit"
              className="text-[#00F5D4]! dark:text-[#006666]!"
            />
          }
        >
          +{totalNewTeachers} new staff(s)
        </OverviewDataCard>
      </div>
    </DashboardPaper>
  );
}

export default SchoolYearOverview;
