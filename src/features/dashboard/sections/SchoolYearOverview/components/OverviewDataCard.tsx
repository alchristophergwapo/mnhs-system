import React from "react";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import DashboardCard from "@features/dashboard/components/DashboardCard";

type OverviewDataProps = {
  total: number;
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

/**
 * A component that displays a circular progress bar with a label and a value.
 * The value is displayed in the center of the circular progress bar.
 * The label is displayed in the center of the circular progress bar.
 * The component accepts a value, title, and color as props.
 * The value is a number between 0 and 100 that represents the progress of the circular progress bar.
 * The title is a string that is displayed above the circular progress bar.
 * The color is a string that represents the color of the circular progress bar and the value text.
 * If no color is provided, the default color is "#1976d2".
 * @example
 * <OverviewData value={80} title=" Junior High" data="1280 total" />
 */
function OverviewDataCard(props: OverviewDataProps) {
  const { total, title, children, icon } = props;

  return (
    <DashboardCard title={title}>
      <div className="flex flex-row items-center gap-2 my-2">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {total}
        </Typography>
        {icon}
      </div>

      <div
        className={clsx(
          "w-full flex gap-1 p-1 rounded-sm mt-2",
          children ? "bg-[#70FFEA] dark:bg-teal-100" : "",
        )}
      >
        <Typography className="ml-1 text-md font-medium text-black! dark:text-inherit">
          {children}
        </Typography>
      </div>
    </DashboardCard>
  );
}

export default OverviewDataCard;
