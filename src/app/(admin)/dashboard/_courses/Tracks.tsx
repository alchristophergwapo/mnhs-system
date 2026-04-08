import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const DUMMY_TRACKS = [
  {
    id: "HE",
    thumbnail: "",
    label: "Home Economics",
    totalEnrolled: 40,
    max: 40,
  },
  {
    id: "ICT",
    thumbnail: "",
    label: "Information and Computer Technology",
    totalEnrolled: 35,
    max: 40,
  },
  {
    id: "AFA",
    thumbnail: "",
    label: "Agri-Fishery Arts",
    totalEnrolled: 38,
    max: 40,
  },
  {
    id: "IA",
    thumbnail: "",
    label: "Industrial Arts",
    totalEnrolled: 29,
    max: 40,
  },
];

export default function Tracks() {
  return (
    <div className="flex flex-col gap-2">
      {DUMMY_TRACKS.map((track, index) => (
        <div key={track.id} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-x-4">
              <Avatar src="/globe.svg" sx={{ width: "50px", height: "50px" }} />
              <div>
                <div className="text-[16px] font-semibold">{track.id}</div>
                <div>{track.label}</div>
              </div>
            </div>
            <div>{track.totalEnrolled}</div>
          </div>
          {index !== DUMMY_TRACKS.length - 1 && (
            <Divider
              flexItem
              orientation="horizontal"
              className="border-gray-400"
            />
          )}
        </div>
      ))}
    </div>
  );
}
