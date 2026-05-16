import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@components/Table";
import Column from "@components/Table/columns/Column";
import { faker } from "@faker-js/faker";
import Button from "@components/ui/Button";

let TIME_START = 8;

const DUMMY_SCHEDULES = faker.helpers.multiple(
  () => ({
    id: faker.number.int(),
    day: faker.helpers.arrayElement([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
    subject: faker.helpers.arrayElement([
      "Mathematics",
      "English",
      "Science",
      "Filipino",
      "History",
      "PE",
      "Music",
    ]),
    time: `${TIME_START}:00 - ${(TIME_START += 1)}:00`,
  }),
  {
    count: 10,
  },
);

function SchedulesPageContent() {
  return (
    <div className="px-4 pt-2 pb-4">
      <Paper className="p-2">
        <div className="flex justify-center gradient bg-[#006666] rounded-t-sm py-2">
          <Typography variant="h6" className="capitalize text-white!">
            weekly class schedule
          </Typography>
        </div>
        <Grid
          container
          sx={{
            "--Grid-borderWidth": "1px",
            borderTop: "var(--Grid-borderWidth) solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
            },
            bgcolor: "white",
          }}
        >
          <Grid
            size={{
              lg: 4,
              md: 6,
              sm: 12,
            }}
          >
            <div className="flex flex-row px-4 py-2 gap-1">
              <Typography className="font-semibold! capitalize">
                student name:
              </Typography>
              <Typography className="uppercase">John Smith</Typography>
            </div>
          </Grid>
          <Grid
            size={{
              lg: 4,
              md: 6,
              sm: 12,
            }}
          >
            <div className="flex flex-row px-4 py-2 gap-1">
              <Typography className="font-semibold! capitalize">
                LRN:
              </Typography>
              <Typography className="uppercase">303000123456</Typography>
            </div>
          </Grid>
          <Grid
            size={{
              lg: 4,
              md: 6,
              sm: 12,
            }}
          >
            <div className="flex flex-row px-4 py-2 gap-1">
              <Typography className="font-semibold! capitalize">
                grade level:
              </Typography>
              <Typography className="uppercase">7</Typography>
            </div>
          </Grid>
        </Grid>
        <Table tableRows={DUMMY_SCHEDULES}>
          <Column header="Time" target="time" />
          <Column header="Monday" target="subject" />
          <Column header="Tuesday" target="subject" />
          <Column header="Wednesday" target="subject" />
          <Column header="Thursday" target="subject" />
          <Column header="Friday" target="subject" />
        </Table>
        <div className="flex flex-row-reverse gap-4 border-t border-gray-400 px-2 pt-2">
          <Button>print</Button>
        </div>
      </Paper>
    </div>
  );
}

export default SchedulesPageContent;
