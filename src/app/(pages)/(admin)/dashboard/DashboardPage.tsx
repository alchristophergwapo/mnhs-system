import SchoolYearOverview from "./DashboardPageContent/SchoolYearOverview";
import Courses from "./DashboardPageContent/Courses";
import AssestSchoolNews from "./DashboardPageContent/Assest";
import SchoolNewsAndEvents from "./DashboardPageContent/SchoolNews";
import Admissions from "./DashboardPageContent/Admissions";
import FeaturedHighlights from "./DashboardPageContent/FeaturedHighlights";
import { Suspense } from "react";
import { getUserById } from "@server/services/userService";
import { auth } from "@/auth";
import Typography from "@mui/material/Typography";

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
    <div className="w-full flex flex-col flex-1 p-8 bg-zinc-200 font-sans">
      <Typography variant="h4" className="text-zinc-50 z-10 font-black!">
        Welcome back, {user?.firstName || "Admin"}!
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <SchoolYearOverview />
      </Suspense>
      <div className="grid grid-cols-3 mt-8 gap-4">
        <div className="col-span-2">
          <Courses />
        </div>
        <div className="col-span-1">
          <AssestSchoolNews />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <SchoolNewsAndEvents />
        <Suspense fallback={<div>Loading...</div>}>
          <Admissions />
        </Suspense>
        <FeaturedHighlights />
      </div>
    </div>
  );
}

export default DashboardPage;
