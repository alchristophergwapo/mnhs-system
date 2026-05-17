import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { blue, brown } from "@mui/material/colors";
import clsx from "clsx";

const DUMMY_STRANDS = [
  {
    id: "STEM",
    thumbnail: "/assets/images/academic/STEM.svg",
    label: "Science, Technology, Engineering, Mathematics",
    color: blue.A700,
  },
  {
    id: "ABM",
    thumbnail: "/assets/images/academic/ABM.svg",
    label: "Accountancy, Business, and Management",
    color: "teal",
  },
  {
    id: "HUMSS",
    thumbnail: "/assets/images/academic/HUMSS.svg",
    label: "Humanities and Social Sciences",
    color: "gray",
  },
  {
    id: "GAS",
    thumbnail: "/assets/images/academic/GAS.svg",
    label: "General Academic Strand",
    color: brown[500],
  },
];

/**
 * @component StrandsList
 * @description Renders a list of academic strands in a responsive grid layout.
 * Each strand displays a colored thumbnail, its ID, and a label. The label is 
 * clamped to a maximum of 2 lines using WebKit properties to handle text overflow.
 * 
 * @returns {JSX.Element} The StrandsList component UI.
 */
function StrandsList() {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Academic
      </Typography>
      <div className={clsx(`grid grid-cols-${DUMMY_STRANDS.length} gap-2`)}>
        {DUMMY_STRANDS.map((strand, index) => (
          <div className="col-span-1" key={`${strand.id}-${index}`}>
            <div className="w-full flex flex-col items-center gap-1">
              <Box className="p-2 rounded-sm" sx={{ bgcolor: strand.color }}>
                <img
                  src={strand.thumbnail}
                  alt={strand.id}
                  style={{ width: "40px", height: "40px", padding: 0.5 }}
                />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {strand.id}
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
                {strand.label}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StrandsList;
