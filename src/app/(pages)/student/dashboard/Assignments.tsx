import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { faker } from "@faker-js/faker";
import clsx from "clsx";
import { InfoOutlineRounded } from "@mui/icons-material";
let hour = 8; // 8am

const DUMMY_ASSIGNMENTS = faker.helpers.multiple(
  () => {
    const data = {
      title: faker.book.title(),
      description: faker.lorem.sentence(),
      time: hour === 12 ? hour + 1 : hour,
    };
    hour += 1;

    return data;
  },
  {
    count: 5,
  },
);

function Assignments() {
  return (
    <Paper className="w-full p-4 flex flex-col gap-4" elevation={2}>
      <div className="flex flex-row items-center gap-2">
        <InfoOutlineRounded />
        <div className="uppercase text-lg font-bold">assignment due</div>
      </div>
      {DUMMY_ASSIGNMENTS.map((assignment, index) => (
        <div
          key={`${assignment.title}-${index}`}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-row gap-2 col-span-3">
              <div
                className={clsx(
                  "p-1 rounded-full",
                  assignment.time <= 9
                    ? "bg-red-500"
                    : assignment.time > 9 && assignment.time < 12
                      ? "bg-orange-200"
                      : "bg-green-700",
                )}
              />
              <div className="flex flex-col">
                <div className="w-full flex flex-row justify-between items-center">
                  <Typography variant="subtitle1" className="font-semibold!">
                    {assignment.title}
                  </Typography>
                </div>
                <Typography variant="subtitle2" className="line-clamp-1!">
                  {assignment.description}
                </Typography>
              </div>
            </div>
            <div>
              <div className="flex flex-col text-right items-end justify-end">
                <Typography
                  variant="caption"
                  className={clsx(
                    "uppercase font-semibold! px-2 rounded-md w-fit",
                    assignment.time <= 9
                      ? "bg-red-300"
                      : assignment.time > 9 && assignment.time < 12
                        ? "bg-orange-300"
                        : "bg-green-200",
                  )}
                >
                  {assignment.time <= 9
                    ? "due"
                    : assignment.time > 9 && assignment.time < 12
                      ? "due soon"
                      : "almost due"}
                </Typography>
                <Typography variant="subtitle2" className="uppercase">
                  {assignment.time}:00
                </Typography>
              </div>
            </div>
          </div>
          {index < DUMMY_ASSIGNMENTS.length - 1 && <Divider />}
        </div>
      ))}
    </Paper>
  );
}

export default Assignments;
