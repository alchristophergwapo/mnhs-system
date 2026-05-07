import { Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DateCalendar } from "@mui/x-date-pickers";

function StudentDashboard() {
  return (
    <div className="w-full flex flex-col items-center h-full gap-8 p-4 bg-gray-100">
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
            <div className="text-4xl font-bold uppercase">welcome, kryz</div>
          </div>
        </Paper>
        <Paper className="p-4 flex flex-col justify-center gap-4" elevation={2}>
          <div className="uppercase">current gpa</div>
          <div className="text-3xl font-bold leading-0 tracking-tight">95</div>
        </Paper>
        <Paper className="p-4 flex flex-col justify-center gap-4" elevation={2}>
          <div className="uppercase">subjects</div>
          <div className="text-3xl font-bold leading-0 tracking-tight">8</div>
        </Paper>
        <Paper className="p-4 flex flex-col justify-center gap-4" elevation={2}>
          <div className="uppercase">upcoming exams</div>
          <div className="text-3xl font-bold leading-0 tracking-tight">2</div>
        </Paper>
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
      <div className="w-full grid grid-cols-3 gap-4">
        <Paper className="p-4 flex flex-col justify-center gap-4" elevation={2}>
          <div className="uppercase text-lg font-bold">today's schedules</div>
          <div className="flex flex-col justify-center gap-2">
            <div className="grid grid-cols-4 gap-2">
              <div className="flex items-center col-span-1">
                <Typography
                  variant="subtitle1"
                  className="capitalize font-black!"
                >
                  math
                </Typography>
              </div>
              <div className="col-span-3 rounded-md border-l-4 border-l-teal-800 bg-gray-200 p-2">
                <Typography variant="subtitle1" className="capitalize">
                  mrs. jane doe
                </Typography>
                <Typography variant="caption">8:00 AM - 9:00 AM</Typography>
              </div>
              <div className="flex items-center col-span-1">
                <Typography
                  variant="subtitle1"
                  className="capitalize font-black!"
                >
                  math
                </Typography>
              </div>
              <div className="col-span-3 rounded-md border-l-4 border-l-teal-800 bg-gray-200 p-2">
                <Typography variant="subtitle1" className="capitalize">
                  mrs. jane doe
                </Typography>
                <Typography variant="caption">8:00 AM - 9:00 AM</Typography>
              </div>
              <div className="flex items-center col-span-1">
                <Typography
                  variant="subtitle1"
                  className="capitalize font-black!"
                >
                  math
                </Typography>
              </div>
              <div className="col-span-3 rounded-md border-l-4 border-l-teal-800 bg-gray-200 p-2">
                <Typography variant="subtitle1" className="capitalize">
                  mrs. jane doe
                </Typography>
                <Typography variant="caption">8:00 AM - 9:00 AM</Typography>
              </div>
              <div className="flex items-center col-span-1">
                <Typography
                  variant="subtitle1"
                  className="capitalize font-black!"
                >
                  math
                </Typography>
              </div>
              <div className="col-span-3 rounded-md border-l-4 border-l-teal-800 bg-gray-200 p-2">
                <Typography variant="subtitle1" className="capitalize">
                  mrs. jane doe
                </Typography>
                <Typography variant="caption">8:00 AM - 9:00 AM</Typography>
              </div>
              <div className="flex items-center col-span-1">
                <Typography
                  variant="subtitle1"
                  className="capitalize font-black!"
                >
                  math
                </Typography>
              </div>
              <div className="col-span-3 rounded-md border-l-4 border-l-teal-800 bg-gray-200 p-2">
                <Typography variant="subtitle1" className="capitalize">
                  mrs. jane doe
                </Typography>
                <Typography variant="caption">8:00 AM - 9:00 AM</Typography>
              </div>
              <div className="flex items-center col-span-1">
                <Typography
                  variant="subtitle1"
                  className="capitalize font-black!"
                >
                  math
                </Typography>
              </div>
              <div className="col-span-3 rounded-md border-l-4 border-l-teal-800 bg-gray-200 p-2">
                <Typography variant="subtitle1" className="capitalize">
                  mrs. jane doe
                </Typography>
                <Typography variant="caption">8:00 AM - 9:00 AM</Typography>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className="p-4 flex flex-col gap-3" elevation={2}>
          <div className="uppercase text-lg font-bold">recent anouncements</div>
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="subtitle1" className="font-semibold!">News title</Typography>
              <Typography variant="subtitle2">description</Typography>
            </div>
            <Typography variant="subtitle1">January 1, 2026</Typography>
          </div>
          <Divider />
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="subtitle1" className="font-semibold!">News title</Typography>
              <Typography variant="subtitle2">description</Typography>
            </div>
            <Typography variant="subtitle1">January 1, 2026</Typography>
          </div>
          <Divider />
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="subtitle1" className="font-semibold!">News title</Typography>
              <Typography variant="subtitle2">description</Typography>
            </div>
            <Typography variant="subtitle1">January 1, 2026</Typography>
          </div>
          <Divider />
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="subtitle1" className="font-semibold!">News title</Typography>
              <Typography variant="subtitle2">description</Typography>
            </div>
            <Typography variant="subtitle1">January 1, 2026</Typography>
          </div>
          <Divider />
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="subtitle1" className="font-semibold!">News title</Typography>
              <Typography variant="subtitle2">description</Typography>
            </div>
            <Typography variant="subtitle1">January 1, 2026</Typography>
          </div>
          <Divider />
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="subtitle1" className="font-semibold!">News title</Typography>
              <Typography variant="subtitle2">description</Typography>
            </div>
            <Typography variant="subtitle1">January 1, 2026</Typography>
          </div>
        </Paper>
        <Paper className="p-4 flex flex-col gap-4" elevation={2}>
          <div className="uppercase text-lg font-bold">assignment due</div>
        </Paper>
      </div>
    </div>
  );
}

export default StudentDashboard;
