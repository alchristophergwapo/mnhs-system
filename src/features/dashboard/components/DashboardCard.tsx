import Card, { CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import React from "react";

/**
 * A reusable dashboard card component that wraps content and optional actions
 * within a Material-UI Card.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the card.
 * @param {boolean} [raised=true] - If true, the card will use elevated styling. Defaults to true.
 * @param {string} [className] - Optional additional CSS class names to apply to the card.
 * @param {React.ReactNode} [actions] - Optional action elements to be displayed at the bottom of the card.
 * @param {CardProps} ...rest - Additional props spread to the underlying Material-UI Card component.
 * @returns {JSX.Element} The rendered dashboard card component.
 */
function DashboardCard({
  children,
  raised = true,
  className,
  actions,
  title,
  ...rest
}: CardProps & {
  actions?: React.ReactNode;
  title?: string;
}) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      raised={raised}
      className={clsx("w-full rounded-sm! ", className)}
      {...rest}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: "15px" }} color="textPrimary">
          {title}
        </Typography>
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
}

export default DashboardCard;
