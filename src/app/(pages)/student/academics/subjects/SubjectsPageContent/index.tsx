import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { teal } from "@mui/material/colors";
import { CheckCircleOutlineOutlined, Mail, Message } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { colors, Container } from "@mui/material";

function SubjectsPageContent() {
  return (
    <div className="grid grid-cols-2 p-4 gap-4">
      {["teal", "blue"].map((item) => (
        <Paper elevation={3} key={item}>
          <AppBar position="static" className="rounded-t-sm" color="inherit" sx={{
            bgcolor: item,
          }}>
            <Toolbar sx={{ height: "40px", color: "white" }}>
              <div className="flex flex-1 items-center space-x-2">
                <Typography className="capitalize font-semibold! text-lg!">
                  information and computer technology basics
                </Typography>
              </div>
              <div className="flex items-center overflow-x-auto">
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <div className="relative">
            <Box
              sx={{
                ":before": {
                  backgroundColor: (colors as any)[item][200],
                  height: "60px",
                  content: "''",
                  display: "block",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                },
              }}
            />
            <CardHeader
              avatar={
                <Avatar
                  aria-label="teacher avatar"
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: item,
                  }}
                >
                  R
                </Avatar>
              }
              action={
                <div className="flex flex-col justify-end py-2 text-center">
                  <Typography className="uppercase">current grade</Typography>
                  <Typography className="font-semibold!" variant="h5">
                    92
                  </Typography>
                </div>
              }
              title={
                <Typography variant="subtitle1" className="font-semibold!">
                  Dr. John Doe
                </Typography>
              }
              subheader={
                <div className="flex flex-row gap-2 items-center">
                  <Mail />
                  <Message />
                </div>
              }
              sx={{ position: "relative", py: 0.5 }}
            />
            <div className="w-full flex flex-row gap-2 p-2">
              <div className="w-1/2 flex flex-col">
                <Container className={`flex flex-col p-2 rounded-md`} sx={{
                  bgcolor: (colors as any)[item][50]
                }}>
                  <Typography className="uppercase! font-semibold!">
                    class schedule
                  </Typography>
                  <Typography>Monday & Wednesday</Typography>
                  <Typography variant="caption" className="uppercase">
                    9:00 - 10:00 am
                  </Typography>
                </Container>
              </div>
              <div className="w-1/2 border-l border-l-gray-300 flex flex-col px-2">
                {[1, 2].map((_, index) => (
                  <div key={index} className="flex flex-col">
                    <Typography className="uppercase! font-semibold!">
                      assignments and projects
                    </Typography>
                    <div className="flex flex-row justify-between">
                      <Typography>Assignment 1</Typography>
                      <Typography>Due: 12/12/2022</Typography>
                    </div>
                    <div className="flex flex-row-reverse">
                      <Typography sx={{ color: "#10B981" }}>
                        <CheckCircleOutlineOutlined sx={{ color: "#10B981" }} />{" "}
                        Completed
                      </Typography>
                    </div>
                    {index !== 1 && <Divider />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default SubjectsPageContent;
