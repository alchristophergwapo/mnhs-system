import SchoolYearOverview from "./Content/SchoolYearOverview";
import Courses from "./Content/Courses";
import AssestSchoolNews from "./Content/Assest";
import SchoolNewsAndEvents from "./Content/SchoolNews";
import Admissions from "./Content/Admissions";
import FeaturedHighlights from "./Content/FeaturedHighlights";
import { Suspense } from "react";

/**
 * The dashboard page for the application.
 * It displays a welcome message and some other information.
 * It also includes a school year overview and a list of courses.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function Dashboard() {
  return (
    <div className="w-full flex flex-col flex-1 p-8 bg-zinc-200 font-sans">
      <div className="text-zinc-50 z-10 text-2xl font-black">
        Welcome back, Kryzstof!
      </div>
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
