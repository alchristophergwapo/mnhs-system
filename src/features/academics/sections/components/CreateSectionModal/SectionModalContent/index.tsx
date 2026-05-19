import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import GradeLevel from "./GradeLevel";
import SectionName from "./SectionName";
import SectionMaxCapacity from "./SectionMaxCapacity";
import AssignAdviser from "./AssignAdviser";
import SectionPreview from "./SectionPreview";

/**
 * Renders the content layout for the "Create Section" modal.
 * It organizes the form into a grid layout containing basic information inputs,
 * configuration details, and a section preview panel.
 * 
 * @returns {JSX.Element} The modal content component.
 */
function SectionModalContent() {
  return (
    <DialogContent>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div>
            <DialogContentText variant="subtitle1" sx={{ fontWeight: 600 }}>
              Basic Information
            </DialogContentText>
            <div className="mt-2 flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <GradeLevel />
                </div>
                <div className="col-span-2">
                  <SectionName />
                </div>
                <div className="col-span-1">
                  <SectionMaxCapacity />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 gap-2 flex flex-col">
            <DialogContentText variant="subtitle1" sx={{ fontWeight: 600 }}>
              Configuration & Details
            </DialogContentText>
            <AssignAdviser />
          </div>
        </div>
        <div className="col-span-2">
          <SectionPreview />
        </div>
      </div>
    </DialogContent>
  );
}

export default SectionModalContent;
