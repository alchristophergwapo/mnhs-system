import { Suspense } from "react";
import { getUserById } from "@server/services/userService";
import { auth } from "@/auth";
import Typography from "@mui/material/Typography";
import SchoolYearOverview from "../sections/SchoolYearOverview";
import DashboardSchoolEvents from "../sections/DashboardSchoolEvents";
import Courses from "../sections/Courses";
import DashboardAssestSchoolNews from "../sections/DashboardPageAssest";
import DashboardSchoolNewsAndEvents from "../sections/DashboardPageSchoolNews";
import DashboardPageAdmissions from "../sections/DashboardPageAdmissions";
import DashboardFeaturedHighlights from "../sections/DashboardFeaturedHighlights";

/**
 * The dashboard page for the application.
 * It displays a welcome message and some other information.
 * It also includes a school year overview and a list of courses.
 * @returns {JSX.Element} - The JSX element for the component.
 */
async function DashboardPage() {
  const session = await auth();
  const user = await getUserById(Number(session?.user?.id));

  return (
    <div className="w-full flex flex-col flex-1 p-8 gap-8 bg-[#0B1416] dark:bg-zinc-200 font-sans">
      <Typography variant="h4" className="text-zinc-50 z-10 font-black!">
        Welcome back, {user?.firstName || "Admin"}!
      </Typography>
      <div className="z-10 grid grid-cols-3 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SchoolYearOverview />
        </Suspense>
        <DashboardSchoolEvents />
      </div>
      <div className="grid grid-cols-3 mt-8 gap-4">
        <div className="col-span-2">
          <Courses />
        </div>
        <div className="col-span-1">
          <DashboardAssestSchoolNews />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <DashboardSchoolNewsAndEvents />
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPageAdmissions />
        </Suspense>
        <DashboardFeaturedHighlights />
      </div>
    </div>
  );
}

export default DashboardPage;
