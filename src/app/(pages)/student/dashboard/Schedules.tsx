import { faker } from "@faker-js/faker";
import { CalendarToday } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
let hour = 8;

const DUMMY_SCHEDULES = faker.helpers.multiple(
  () => {
    const data = {
      subject: faker.helpers.uniqueArray(
        [
          "Math",
          "English",
          "Science",
          "History",
          "Geography",
          "Art",
          "Music",
          "Physical Education",
        ],
        1,
      ),
      teacher: faker.person.fullName(),
      time: `${hour === 12 ? hour + 1 : hour}:00 - ${hour === 12 ? hour + 2 : hour + 1}:00`,
    };
    hour += 1;

    return data;
  },
  {
    count: 7,
  },
);

/**
 * Schedules component displays a list of today's schedules
 * It uses Material-UI components for styling and layout
 * The component shows a paper container with schedule items
 */
function Schedules() {
  return (
    <Paper
      className="w-full p-4 flex flex-col justify-center gap-4" // Full width paper container with padding and flex layout
      elevation={2} // Paper elevation for shadow effect
    >
      {/* Title section for the schedules */}
      <div className="flex flex-row items-center gap-2">
        <CalendarToday />
        <div className="uppercase text-lg font-bold">today's schedules</div>
      </div>
      {/* Container for schedule items with vertical gap */}
      {DUMMY_SCHEDULES.map((schedule, index) => (
        <div
          key={`${schedule.subject}-${index}`}
          className="grid grid-cols-4 gap-2"
        >
          <div className="flex items-center col-span-1">
            <Typography variant="subtitle1" className="capitalize font-black!">
              {schedule.subject}
            </Typography>
          </div>
          <div className="col-span-3 flex flex-row justify-between items-center rounded-md border-l-4 border-l-teal-800 bg-gray-200 p-2">
            <Typography variant="subtitle1" className="capitalize">
              {schedule.teacher}
            </Typography>
            <Typography variant="caption">{schedule.time}</Typography>
          </div>
        </div>
      ))}
    </Paper>
  );
}

export default Schedules;
