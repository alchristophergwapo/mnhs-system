import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { WcOutlined } from "@mui/icons-material";

type SectionCardContentProps = {
  _count: {
    students: number;
  };
  maxCapacity: number | null;
  isAlmostFull: boolean;
  maleCount: number;
  femaleCount: number;
};

/**
 * SectionCardContent component renders the content for a section card, displaying
 * capacity information, a progress bar, and gender distribution.
 *
 * @param {SectionCardContentProps} props - The properties object.
 * @param {object} props._count - The count object containing student details.
 * @param {number} props._count.students - The current number of enrolled students.
 * @param {number} props.maxCapacity - The maximum allowed capacity for the section.
 * @param {number} props.maleCount - The number of male students.
 * @param {number} props.femaleCount - The number of female students.
 * @param {boolean} props.isAlmostFull - Flag indicating if the section is nearing its maximum capacity.
 * @returns {JSX.Element} The rendered section card content.
 */
function SectionCardContent({
  _count,
  maxCapacity,
  maleCount,
  femaleCount,
  isAlmostFull,
}: SectionCardContentProps) {
  return (
    <CardContent sx={{ padding: 0 }} className="my-2">
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
  );
}

export default SectionCardContent;
