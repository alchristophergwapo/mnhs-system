import { TrendingDownOutlined, TrendingUpRounded } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import prisma from "@/src/lib/prisma";
import clsx from "clsx";
import { EnrollmentStatus } from "@/src/prisma/src/generated/prisma";

async function Students() {
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
    <Paper className="flex flex-col gap-2 p-3" elevation={4}>
      <Typography variant="h6" sx={{ fontSize: "15px" }}>
        Total Students Enrolled
      </Typography>
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
        <Typography variant="subtitle2">
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
        <Typography variant="subtitle2">
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
    </Paper>
  );
}

export default Students;
