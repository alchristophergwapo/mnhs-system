import prisma from "@lib/prisma";
import { EnrollmentStatus } from "@/prisma/generated/prisma";
import {
  AddHomeWorkOutlined,
  AssuredWorkloadOutlined,
  BadgeOutlined,
  FactCheckOutlined,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import DashboardPaper from "../components/DashboardPaper";

/**
 * Asynchronous React component that renders the Admissions Pipeline dashboard.
 * It fetches and displays the total and weekly new counts for various enrollment
 * statuses (Received, Verified, Enrolled, Assigned) for the current school year.
 *
 * @returns {Promise<JSX.Element>} A Promise resolving to the admissions dashboard Paper component.
 */
async function DashboardPageAdmissions() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  const year = new Date().getFullYear();
  const [
    totalApplicants,
    totalVerified,
    totalEnrolled,
    totalAssigned,
    totalNewApplicants,
    totalNewVerified,
    totalNewEnrolled,
    totalNewAssigned,
  ] = await Promise.all([
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(year, 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(year + 1, 4, 31), // May 31st of the next year
        enrollmentStatus: EnrollmentStatus.ENROLLED,
      },
    }),
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(year, 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(year + 1, 4, 31), // May 31st of the next year
        enrollmentStatus: EnrollmentStatus.VERIFIED,
      },
    }),
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(year, 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(year + 1, 4, 31), // May 31st of the next year
        enrollmentStatus: EnrollmentStatus.ENROLLED,
      },
    }),
    prisma.enrollment.count({
      where: {
        schoolYearStart: new Date(year, 5, 1), // June 1st of the current year
        schoolYearEnd: new Date(year + 1, 4, 31), // May 31st of the next year
        enrollmentStatus: EnrollmentStatus.ASSIGNED,
      },
    }),
    prisma.enrollment.count({
      where: {
        createdAt: weekAgo,
        enrollmentStatus: EnrollmentStatus.RECEIVED,
      },
    }),
    prisma.enrollment.count({
      where: {
        updatedAt: weekAgo,
        enrollmentStatus: EnrollmentStatus.VERIFIED,
      },
    }),
    prisma.enrollment.count({
      where: {
        updatedAt: weekAgo,
        enrollmentStatus: EnrollmentStatus.ENROLLED,
      },
    }),
    prisma.enrollment.count({
      where: {
        updatedAt: weekAgo,
        enrollmentStatus: EnrollmentStatus.ASSIGNED,
      },
    }),
  ]);

  return (
    <DashboardPaper
      title={`Admissions Pipeline SY ${year} - ${year + 1}`}
    >
      <div className="grid grid-cols-2 gap-4 mt-1">
        <div className="col-span-1 flex flex-row items-center gap-2">
          <BadgeOutlined
            sx={{
              fontSize: 44,
            }}
          />
          <div className="flex flex-col">
            <Typography variant="subtitle1">Application Received</Typography>
            <div className="flex flex-row items-center justify-center gap-2">
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {totalApplicants}
              </Typography>
              <div className="flex bg-[#00F5D4] dark:bg-green-200 px-2 py-0.5 items-center rounded-sm">
                <Typography
                  variant="body2"
                  className="text-[#006666] dark:text-green-600"
                >
                  +{totalNewApplicants} this week
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-row items-center gap-2">
          <FactCheckOutlined
            sx={{
              fontSize: "44px!important",
            }}
          />
          <div className="flex flex-col">
            <Typography variant="subtitle1">Documents Verified</Typography>
            <div className="flex flex-row items-center justify-center gap-2">
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {totalVerified}
              </Typography>
              <div className="flex bg-[#00F5D4] dark:bg-green-200 px-2 py-0.5 items-center rounded-sm">
                <Typography
                  variant="body2"
                  className="text-[#006666] dark:text-green-600"
                >
                  +{totalNewVerified} this week
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-row items-center gap-2">
          <AddHomeWorkOutlined
            sx={{
              fontSize: "44px!important",
            }}
          />
          <div className="flex flex-col">
            <Typography variant="subtitle1">Enrollment Confirmed</Typography>
            <div className="flex flex-row items-center justify-center gap-2">
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {totalEnrolled}
              </Typography>
              <div className="flex bg-[#00F5D4] dark:bg-green-200 px-2 py-0.5 items-center rounded-sm">
                <Typography
                  variant="body2"
                  className="text-[#006666] dark:text-green-600"
                >
                  +{totalNewEnrolled} this week
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-row items-center gap-2">
          <AssuredWorkloadOutlined
            sx={{
              fontSize: "44px!important",
            }}
          />
          <div className="flex flex-col">
            <Typography variant="subtitle1">Class Section Assigned</Typography>
            <div className="flex flex-row px-2 items-center gap-2">
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {totalAssigned}
              </Typography>
              <div className="flex bg-[#00F5D4] dark:bg-green-200 px-2 py-0.5 items-center rounded-sm">
                <Typography
                  variant="body2"
                  className="text-[#006666] dark:text-green-600"
                >
                  +{totalNewAssigned} this week
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPaper>
  );
}

export default DashboardPageAdmissions;
