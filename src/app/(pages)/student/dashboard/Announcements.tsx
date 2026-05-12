import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { faker } from "@faker-js/faker";
import { format, parseISO } from "date-fns";
import CampaignOutlined from "@mui/icons-material/CampaignOutlined";

const DUMMY_ANOUNCEMENTS = faker.helpers.multiple(
  () => ({
    title: faker.book.title(),
    description: faker.lorem.paragraph(),
    datePosted: faker.date.recent({
      days: 7,
    }),
  }),
  { count: 6 },
);

/**
 * Announcements component that displays a list of announcements
 * Uses Material-UI components for styling and layout
 */
function Announcements() {
  return (
    <Paper className="w-full p-4 flex flex-col gap-3 pb-6" elevation={2}>
      {/* Header section with icon and title */}
      <div className="flex flex-row items-center gap-2">
        <CampaignOutlined />
        <div className="uppercase text-lg font-bold">recent anouncements</div>
      </div>
      {/* Map through announcements array to display each announcement */}
      {DUMMY_ANOUNCEMENTS.map((announcement, index) => (
        <div key={`${announcement.title}-${index}`} className="flex flex-col gap-3">
          {/* Announcement content section */}
          <div className="flex flex-col">
            {/* Title and date row */}
            <div className="flex flex-row justify-between">
              <Typography variant="subtitle1" className="font-semibold!">
                {announcement?.title}
              </Typography>
              <Typography variant="subtitle1">
                {format(
                  typeof announcement.datePosted === "string"
                    ? parseISO(announcement.datePosted)
                    : announcement.datePosted,
                  "MMMM dd, yyyy",
                )}
              </Typography>
            </div>
            {/* Description text */}
            <Typography variant="subtitle2" className="line-clamp-1!">
              {announcement?.description}
            </Typography>
          </div>
          {/* Add divider between announcements except for the last one */}
          {index < (DUMMY_ANOUNCEMENTS.length - 1) && <Divider />}
        </div>
      ))}
    </Paper>
  );
}

export default Announcements;
