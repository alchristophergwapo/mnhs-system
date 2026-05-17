import Table from "@components/table/BasicTable";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Column from "../../../../../components/table/BasicTable/columns/Column";
import Grid from "@mui/material/Grid";
import { faker } from "@faker-js/faker";
import Button from "@components/ui/Button";

const DUMMY_GRADES = faker.helpers.multiple(
  () => ({
    id: faker.number.int(),
    subject: faker.book.title(),
    firstQuarter: faker.number.int({ min: 60, max: 99 }),
    secondQuarter: faker.number.int({ min: 60, max: 99 }),
    thirdQuarter: faker.number.int({ min: 60, max: 99 }),
    fourthQuarter: faker.number.int({ min: 60, max: 99 }),
  }),
  {
    count: 8,
  },
);

function GradesPageContent() {
  return (
    <div className="p-4 w-full ">
      <Paper className="p-4">
        <div className="border border-gray-400 bg-gray-200 rounded-md p-4">
          <div className="border border-gray-400 w-full rounded-sm">
            <div className="text-center py-2 bg-teal-600">
              <Typography variant="h6" className="font-bold! capitalize">
                mantalongon national high school - student report card
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
            <Table tableRows={DUMMY_GRADES}>
              <Column header="Subject" target="subject" />
              <Column header="1st Quarter" target="firstQuarter" />
              <Column header="2nd Quarter" target="secondQuarter" />
              <Column header="3rd Quarter" target="thirdQuarter" />
              <Column header="4th Quarter" target="fourthQuarter" />
              <Column header="Final Grade" target="" />
              <Column header="Remarks" target="remarks" />
            </Table>
            <div className="flex flex-row-reverse px-4 py-2 gap-4 border-t border-gray-400">
              <div className="flex flex-row gap-1">
                <Typography className="font-semibold! capitalize">
                  General Average:
                </Typography>
                <Typography className="uppercase">95.00</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-4 mt-4">
            <Button>print</Button>
        </div>
      </Paper>
    </div>
  );
}

export default GradesPageContent;
