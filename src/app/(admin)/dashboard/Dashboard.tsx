import Paper from "@mui/material/Paper";
import Image from "next/image";
import SchoolYearOverview from "./_schoolyearoverview/SchoolYearOverview";
import Courses from "./_courses/Courses";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col flex-1 p-8 bg-zinc-200 font-sans">
      <div className="text-zinc-50 z-10 text-2xl font-black">
        Welcome back, Kryzstof!
      </div>
      <div className="z-10 mt-4">
        <p className=" text-lg leading-8 text-zinc-200 ">
          Looking for a starting point or more instructions? Head over to{" "}
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="font-medium text-cyan-400 "
          >
            Templates
          </a>{" "}
          or the{" "}
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="font-medium text-cyan-400"
          >
            Learning
          </a>{" "}
          center.
        </p>
      </div>
      <SchoolYearOverview />
      <div className="h-full flex flex-row mt-8 space-x-8">
        <Courses />
        <Paper className="w-full h-full"></Paper>
      </div>
      <div className="h-full mt-8">
        <Paper className="w-full h-full"></Paper>
      </div>
      <div className="w-full flex flex-col gap-4 text-base items-center justify-center mt-8 font-medium sm:flex-row">
        <a
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={16}
            height={16}
          />
          Deploy Now
        </a>
        <a
          className="flex h-12 w-full items-center justify-center rounded-full border bg-gray-500 text-black border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:text-white hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-39.5"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </div>
    </div>
  );
}
