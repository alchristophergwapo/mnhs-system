import Paper from "@mui/material/Paper";
import OverviewData from "./OverviewData";
import Students from "./Students";
import SchoolEvents from "./SchoolEvents";
import { People, SyncAltRounded } from "@mui/icons-material";
import prisma from "@/src/lib/prisma";

/**
 * SchoolYearOverview component.
 *
 * This component renders a school year overview page.
 * It consists of a header, a divider, and four OverviewData components.
 * The OverviewData components display the junior high school, senior high school, transfer students, and teachers data respectively.
 *
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default async function SchoolYearOverview() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  const [totalTransfereeStudents, totalTeachers, totalNewTeachers] = await Promise.all([
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(new Date().getFullYear(), 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(new Date().getFullYear() + 1, 4, 31), // May 31st of the next year
        student: {
          isTransferee: true,
        },
      },
    }),
    prisma.teacher.count(),
    prisma.teacher.count({
      where: {
        createdAt: {
          gte: weekAgo, // Teachers added in the last 7 days
        },
      }
    }),
  ]);

  return (
    <div className="z-10 grid grid-cols-3 gap-4">
      <Paper className="w-full mt-8 p-4 flex flex-col z-10 gap-2 bg-white col-span-2">
        <h4 className=" text-xl font-semibold tracking-tight dark:text-zinc-50 text-black">
          School Year Overview
        </h4>
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <Students />
          </div>
          <OverviewData
            total={totalTransfereeStudents}
            title="Transfer Students"
            icon={
              <People
                fontSize="large"
                color="inherit"
                sx={{ color: "#006666!important" }}
              />
            }
          />
          <OverviewData total={totalTeachers} title="Teachers" icon={
              <SyncAltRounded
                fontSize="large"
                color="inherit"
                sx={{ color: "#006666!important" }}
              />
            }>+{totalNewTeachers} new staff(s)</OverviewData>
        </div>
      </Paper>
      <Paper className="w-full mt-8 flex flex-col z-10 gap-6 col-span-1">
        <SchoolEvents />
      </Paper>
    </div>
  );
}
