import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Box from "@mui/material/Box";

type OverviewDataProps = {
  value: number;
  title: string;
  data: string | React.ReactNode;
  color?: string;
};

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
