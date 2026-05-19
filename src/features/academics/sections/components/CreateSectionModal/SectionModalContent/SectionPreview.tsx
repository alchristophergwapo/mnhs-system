import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import { InfoOutlineRounded } from "@mui/icons-material";
import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { SectionsType } from "../../../api/sections.types";
import { UserType } from "@types";

function SectionPreview() {
  const form = useFormContext();

  return (
    <div className="bg-gray-100 h-full rounded-md p-4">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Section Preview</h3>
          <p className="text-gray-600">
            This is a preview of the section you are creating.
          </p>
        </div>
      </div>
      <form.Subscribe>
        {(state) => {
          const values = state.values as Partial<SectionsType>;
          const gradeLevel = values.gradeLevel;
          const name = values.name;
          const maxCapacity = values.maxCapacity;
          const adviser = values.adviser as UserType;

          return (
            <Paper elevation={3} className="flex flex-col gap-2 p-4">
              <div className="flex flex-row gap-2">
                <div className="flex items-center justify-center w-10 h-8 text-2xl text-white rounded-md bg-teal-700">
                  {gradeLevel?.gradeLevelNumber || "?"}
                </div>
                <Typography variant="h6" className="ml-2">
                  {name || "Section name"}
                </Typography>
              </div>
              <Typography variant="body1" className="text-gray-600 mt-2">
                Capacity:{" "}
                {maxCapacity !== null ? `${maxCapacity} students` : "Not set"}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={0}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <div className="flex flex-row items-center gap-2">
                <Avatar
                  sx={{ bgcolor: "grey", width: 32, height: 32, fontSize: 16 }}
                  src={adviser?.avatar}
                >
                  {adviser?.lastName?.charAt(0)}
                </Avatar>
                <Typography variant="body2">
                  Adviser:{" "}
                  {adviser?.firstName && adviser?.lastName
                    ? `${adviser.firstName} ${adviser.lastName}`
                    : "Not assigned"}
                </Typography>
              </div>
            </Paper>
          );
        }}
      </form.Subscribe>
      <div className="mt-4">
        <Typography variant="body2">
          Tip: Ensure a unique name to avoid conflicts.
        </Typography>
        <div className="flex flex-row items-center gap-1 mt-2">
          <InfoOutlineRounded />
          <Typography variant="body2">
            You can assign an adviser later if you don&apos;t have one in mind
            right now.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default memo(SectionPreview);
