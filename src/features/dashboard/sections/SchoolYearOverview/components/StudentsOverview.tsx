import { TrendingDownOutlined, TrendingUpRounded } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import prisma from "@lib/prisma";
import clsx from "clsx";
import { EnrollmentStatus } from "@/prisma/generated";
import DashboardCard from "@features/dashboard/components/DashboardCard";

/**
 * Asynchronously fetches student enrollment data for the current school years
 * and renders a dashboard component displaying the total number of enrolled students,
 * the year-over-year percentage change, and a breakdown of Junior High vs. Senior High enrollments.
 *
 * @returns {Promise<JSX.Element>} A Promise that resolves to a Material-UI Paper component
 * containing the student enrollment statistics and visual progress bars.
 */
async function StudentsOverview() {
  const [
    totalStudentsThisY,
    totalJuniorHigh,
    totalSeniorHigh,
    totalStudentsPrevY,
  ] = await Promise.all([
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(new Date().getFullYear(), 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(new Date().getFullYear() + 1, 4, 31), // May 31st of the next year
      },
    }),
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(new Date().getFullYear(), 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(new Date().getFullYear() + 1, 4, 31), // May 31st of the next year
        gradeLevel: {
          gradeLevelNumber: {
            in: [7, 8, 9, 10],
          },
        },
      },
    }),
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(new Date().getFullYear(), 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(new Date().getFullYear() + 1, 4, 31), // May 31st of the next year
        gradeLevel: {
          gradeLevelNumber: {
            in: [11, 12],
          },
        },
        enrollmentStatus: EnrollmentStatus.ENROLLED,
      },
    }),
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(new Date().getFullYear() - 1, 5, 1), // June 1st of the previous year
        schoolYearEnd: new Date(new Date().getFullYear(), 4, 31), // May 31st of the current year
      },
    }),
  ]);

  const difference = totalStudentsThisY - totalStudentsPrevY;
  const percentageChange =
    totalStudentsPrevY > 0
      ? ((difference / totalStudentsPrevY) * 100).toFixed(1)
      : null;

  return (
    <DashboardCard title="Total Students Enrolled">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {totalStudentsThisY}
        </Typography>
        {percentageChange !== null && (
          <div
            className={clsx(
              "flex gap-1 p-1 rounded-sm",
              difference < 0 ? "bg-red-100" : "bg-teal-100",
            )}
          >
            {difference < 0 ? (
              <TrendingDownOutlined sx={{ color: "red!important" }} />
            ) : (
              <TrendingUpRounded
                sx={{ color: "lab(70.5521% -66.5147 45.8072)!important" }}
              />
            )}
            <Typography
              className={clsx(
                "ml-1 text-md font-medium",
                difference < 0 ? "text-red-500" : "text-teal-500",
              )}
            >
              {percentageChange}%
            </Typography>
          </div>
        )}
      </div>
      <div>
        <Typography variant="subtitle2" color="textPrimary">
          {totalJuniorHigh} Junior High (
          {Math.round((totalJuniorHigh / totalStudentsThisY) * 100) || 0}%)
        </Typography>
        <LinearProgress
          sx={{
            height: 10,
            borderRadius: 5,
          }}
          variant="determinate"
          value={(totalJuniorHigh / totalStudentsThisY) * 100 || 0}
        />
      </div>
      <div>
        <Typography variant="subtitle2" color="textPrimary">
          {totalSeniorHigh} Senior High (
          {Math.round((totalSeniorHigh / totalStudentsThisY) * 100) || 0}%)
        </Typography>
        <LinearProgress
          sx={{
            height: 10,
            borderRadius: 5,
          }}
          variant="determinate"
          value={(totalSeniorHigh / totalStudentsThisY) * 100 || 0}
        />
      </div>
    </DashboardCard>
  );
}

export default StudentsOverview;
