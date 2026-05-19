import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import { UserType } from "@types";

type SectionCardHeaderProps = {
  adviser: UserType | null;
  _count: {
    students: number;
  };
  maxCapacity: number | null;
  name: string;
  isAlmostFull: boolean;
};

/**
 * Renders the header section for a section card, displaying the section's name,
 * adviser details, and capacity status alerts.
 *
 * @param {SectionCardHeaderProps} props - The component props.
 * @param {Object} [props.adviser] - The adviser object for the section.
 * @param {string} [props.adviser.firstName] - The first name of the adviser.
 * @param {string} [props.adviser.lastName] - The last name of the adviser.
 * @param {Object} props._count - The count object containing student details.
 * @param {number} props._count.students - The current number of enrolled students.
 * @param {number} props.maxCapacity - The maximum student capacity for the section.
 * @param {string} props.name - The name of the section.
 * @param {boolean} props.isAlmostFull - Flag indicating if the section is almost at full capacity.
 * @returns {JSX.Element} The rendered CardHeader component.
 */
function SectionCardHeader({
  adviser,
  _count,
  maxCapacity,
  name,
  isAlmostFull,
}: SectionCardHeaderProps) {
  return (
    <CardHeader
      avatar={
        adviser ? (
          <Avatar
            src=""
            alt={"Remy Sharp"}
            sx={{ bgcolor: red[500], width: 30, height: 30 }}
            aria-label="recipe"
          >
            R
          </Avatar>
        ) : null
      }
      action={
        _count.students === maxCapacity && (
          <Alert icon={false} severity={isAlmostFull ? "warning" : "error"}>
            {isAlmostFull
              ? "ALMOST FULL"
              : _count.students === maxCapacity
                ? "FULL"
                : ""}
          </Alert>
        )
      }
      title={
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      }
      subheader={
        <Typography>
          {adviser ? `${adviser?.firstName} ${adviser?.lastName}` : "N/A"}
        </Typography>
      }
      sx={{ padding: 0 }}
    />
  );
}

export default SectionCardHeader;
