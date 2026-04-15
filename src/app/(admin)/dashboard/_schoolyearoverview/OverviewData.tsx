import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Box from "@mui/material/Box";

type OverviewDataProps = {
  value: number;
  title: string;
  data: string | React.ReactNode;
  color?: string;
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
export default function OverviewData(props: OverviewDataProps) {
  const { data, title, value, color = "#1976d2" } = props;

  return (
    <div className="flex flex-row items-center space-x-8">
      <div>
        <div className="text-[13px]">{title}</div>
        <div className="text-[22px] mt-2 font-medium" style={{color}}>{data}</div>
      </div>
      <div>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={value}
            sx={{
              color: color,
            }}
            size="84px"
            thickness={2}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
              fontWeight: "bold"
            }}
          >
            <div className="text-xl">{value}</div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
