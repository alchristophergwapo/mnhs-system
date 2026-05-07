import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useParams } from "next/navigation";

/**
 * Header component for the teacher form page.
 * It displays the title of the page and a back button to go to the teachers list page.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function Header() {
  const { teacherId } = useParams();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <IconButton href="/teachers"><ArrowBack fontSize="large" sx={{ color: "white!important" }} /></IconButton>
          <h1 className="text-2xl font-bold">
            {teacherId !== "new" ? "Update Teacher" : "Add Teacher"}
          </h1>
        </div>
        <div className="ml-14">Fill up the required fields</div>
      </div>
    </div>
  );
}
