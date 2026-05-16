import { memo, useState } from "react";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import { red, teal } from "@mui/material/colors";
import Button from "@components/ui/Button";
import Icon from "@mui/material/Icon";
import { Edit, ListOutlined, WcOutlined } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { SectionsType } from "../SectionsApi";
import CreateSection from "../CreateSection";

function Section({ section, onEdit }: { section: SectionsType; onEdit: () => void }) {
  const { name, _count, maxCapacity, adviser, femaleCount, maleCount } =
    section;
  const isAlmostFull = maxCapacity ? maxCapacity - _count?.students < 4 : false;
  console.log(section);

  return (
    <Paper elevation={3} className="px-4 pt-4">
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
      <Divider />
      <CardContent sx={{ padding: 0 }} className="mt-2">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Capacity {_count?.students}/{maxCapacity}
        </Typography>
        <LinearProgress
          sx={{
            height: 10,
            borderRadius: 5,
          }}
          variant="determinate"
          color={
            isAlmostFull
              ? "warning"
              : _count.students === maxCapacity
                ? "error"
                : "primary"
          }
          value={maxCapacity ? (_count?.students / maxCapacity) * 100 : 0}
        />
        <div className="flex flex-row mt-2 gap-2">
          <WcOutlined />
          <Typography>Male/Female</Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {maleCount}:{femaleCount}
          </Typography>
        </div>
      </CardContent>
      <CardActions
        sx={{
          paddingX: 0,
        }}
      >
        <Button
          variant="text"
          startIcon={<ListOutlined />}
          sx={{
            ":hover": {
              backgroundColor: teal[100],
            },
            "& .MuiSvgIcon-root": { color: "#006666!important" },
          }}
        >
          view list
        </Button>
        <Button
          variant="text"
          startIcon={<Edit />}
          sx={{
            ":hover": {
              backgroundColor: teal[100],
            },
            "& .MuiSvgIcon-root": { color: "#006666!important" },
          }}
          onClick={onEdit}
        >
          edit
        </Button>
        <Button
          variant="text"
          startIcon={<Icon>how_to_reg</Icon>}
          sx={{
            ":hover": {
              backgroundColor: teal[100],
            },
            "& .MuiSvgIcon-root": { color: "#006666!important" },
          }}
        >
          assign adviser
        </Button>
      </CardActions>
    </Paper>
  );
}

export default memo(Section);
