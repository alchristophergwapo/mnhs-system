import Paper from "@mui/material/Paper";
import { DateCalendar } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import prisma from "@lib/prisma";
import { Suspense } from "react";
import Loading from "@components/Loading";
import Schedules from "./Schedules";
import Announcements from "./Announcements";
import Assignments from "./Assignments";

async function StudentDashboard() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(session.user.id),
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  // const { user } = ;
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full flex flex-col items-center h-full gap-8 p-8 bg-gray-100">
        <div className="w-full grid grid-flow-col grid-rows-2 gap-4">
          <Paper
            className="flex flex-auto items-center row-span-1 col-span-3 px-4 text-white!"
            sx={{ bgcolor: "primary.dark" }}
          >
            <div className="flex flex-row gap-8 items-center">
              <img
                src={"/assets/images/school.png"}
                alt="Welcom back"
                className="h-20 w-20"
                loading="eager"
              />
              <div className="text-4xl font-bold uppercase">
                welcome, {user?.firstName}!
              </div>
            </div>
          </Paper>
          {[
            { title: "current gpa", value: 95 },
            { title: "subjects", value: 5 },
            { title: "upcoming exams", value: 2 },
          ].map((item, index) => (
            <Paper
              key={`${item.title}-${index}`}
              className="p-4 flex flex-col justify-center gap-4"
              elevation={2}
            >
              <div className="uppercase">{item.title}</div>
              <div className="text-3xl font-bold leading-0 tracking-tight">
                {item.value}
              </div>
            </Paper>
          ))}
          <Paper
            className="row-span-2 col-span-1 h-52 overflow-y-visible overflow-x-hidden"
            elevation={2}
          >
            <DateCalendar
              reduceAnimations
              sx={{
                height: "auto",
                width: "260px",
                "& .MuiPickersCalendarHeader-root": {
                  maxHeight: "30px",
                  minHeight: "30px",
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  maxHeight: "30px",
                  width: "30px",
                },
                "& .MuiPickerDay-root": {
                  height: "30px",
                  width: "30px",
                },
                "& .MuiPickersSlideTransition-root": {
                  minHeight: "180px",
                },
              }}
            />
          </Paper>
        </div>
        <div className="w-full">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Schedules />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Announcements />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Assignments />
            </Grid>
          </Grid>
        </div>
      </div>
    </Suspense>
  );
}

export default StudentDashboard;
