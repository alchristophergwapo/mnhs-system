import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import clsx from "clsx";

type SectionsStatsCardProps = PaperProps & {
    title: string;
    total: number;
};

/**
 * A React functional component that displays a statistics card for a section.
 * It renders a title and a total value inside a Paper container, 
 * typically used to show summary metrics or counts in a dashboard layout.
 *
 * @param {SectionsStatsCardProps} props - The properties passed to the component.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the card's root element.
 * @param {number} [props.elevation] - Optional shadow depth for the Material UI Paper component. Defaults to 4 if not provided.
 * @param {string} props.title - The title or label describing the statistic being displayed.
 * @param {string | number} props.total - The main statistical value or count to be displayed prominently.
 * @returns {JSX.Element} The rendered SectionsStatsCard component.
 */
function SectionsStatsCard({
  className,
  elevation,
  title,
  total,
}: SectionsStatsCardProps) {
  return (
    <Paper
      className={clsx("p-4 flex flex-col items-center ", className)}
      elevation={elevation || 4}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: "",
        }}
      >
        {total}
      </Typography>
    </Paper>
  );
}

export default SectionsStatsCard;
