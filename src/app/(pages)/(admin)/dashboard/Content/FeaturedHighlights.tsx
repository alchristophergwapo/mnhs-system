import Box from "@mui/material/Box";
import { blue, blueGrey, green, grey, teal } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function FeaturedHighlights() {
  return (
    <Paper className="w-full h-full p-4">
      <Typography
        variant="h6"
        className=" tracking-tight dark:text-zinc-50 text-black"
      >
        Featured Campus Highlights
      </Typography>
      <div className="grid grid-cols-4 mt-2">
        {[
          {
            title: "Library",
            thumbnail: "/assets/images/academic/GAS.svg",
            color: blueGrey[900],
          },
          { title: "Modern Classroom", thumbnail: "/assets/images/teacher.svg", color: teal[700] },
          { title: "Sports Complex", thumbnail: "/assets/images/vocational/SPORTS.svg", color: green[500] },
          { title: "IT Lab", thumbnail: "/assets/images/vocational/ICT.svg", color: blue[700] },
        ].map((item, index) => (
          <div
            className="col-span-1 flex flex-col items-center text-center gap-1"
            key={`feature-${index}`}
          >
            <Box
              className="p-2 rounded-sm"
              sx={{ bgcolor: item?.color ? item.color : "transparent" }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: "40px", height: "40px", padding: 0.5 }}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>
          </div>
        ))}
      </div>
    </Paper>
  );
}

export default FeaturedHighlights;
