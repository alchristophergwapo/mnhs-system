import Typography from "@mui/material/Typography";
import { blue, green, orange, red } from "@mui/material/colors";
import Box from "@mui/material/Box";

const DUMMY_TRACKS = [
  {
    id: "HE",
    label: "Home Economics",
    totalEnrolled: 40,
    max: 40,
    thumbnail: "/assets/images/vocational/HE.svg",
    color: orange[300],
  },
  {
    id: "ICT",
    thumbnail: "/assets/images/vocational/ICT.svg",
    label: "Information and Computer Technology",
    totalEnrolled: 35,
    max: 40,
    color: blue[300],
  },
  {
    id: "AFA",
    thumbnail: "/assets/images/vocational/AFA.svg",
    label: "Agri-Fishery Arts",
    totalEnrolled: 38,
    max: 40,
    color: green[300],
  },
  {
    id: "IA",
    thumbnail: "/assets/images/vocational/IA.svg",
    label: "Industrial Arts",
    totalEnrolled: 29,
    max: 40,
    color: red[300],
  },
];

/**
 * A React functional component that renders a grid of track items.
 * Displays a "TVL" header followed by a responsive grid of tracks,
 * where each track includes a colored thumbnail, an ID, and a label.
 * The label is clamped to a maximum of 2 lines to maintain layout consistency.
 * 
 * @returns {JSX.Element} The rendered TracksList component.
 */
function TracksList() {
  return (
    <div className="flex flex-col justify-evenly gap-2">
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        TVL
      </Typography>
      <div className={`grid grid-cols-${DUMMY_TRACKS.length} gap-2`}>
        {DUMMY_TRACKS.map((track, index) => (
          <div key={track.id} className="col-span-1">
            <div className="w-full flex flex-col items-center gap-1">
              <Box className="p-2 rounded-sm" sx={{ bgcolor: track.color }}>
                <img
                  src={track.thumbnail}
                  alt={track.id}
                  style={{ width: "40px", height: "40px" }}
                />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {track.id}
              </Typography>
              <Typography
                className="text-center"
                variant="subtitle2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
                color="textSecondary"
              >
                {track.label}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TracksList;
