import { memo } from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { SectionsType } from "../../api/sections.types";
import SectionCardHeader from "./SectionCardHeader";
import SectionCardContent from "./SectionCardContent";
import SectionCardActions from "./SectionCardActions";

/**
 * A React component that renders a card displaying detailed information about a specific section.
 * It shows the section's header, content (including student counts and capacity), and action buttons.
 *
 * @param {Object} props - The component props.
 * @param {SectionsType} props.section - The section data object containing details like name, adviser, and student counts.
 * @param {() => void} props.onEdit - The callback function triggered when the edit action is invoked.
 * @returns {JSX.Element} The rendered section card component.
 */
function SectionCard({
  section,
  onEdit,
}: {
  section: SectionsType;
  onEdit: () => void;
}) {
  const { name, _count, maxCapacity, adviser, femaleCount, maleCount } =
    section;
  const isAlmostFull = maxCapacity ? maxCapacity - _count?.students < 4 : false;

  return (
    <Paper elevation={3} className="px-4 pt-4">
      <SectionCardHeader
        adviser={adviser}
        _count={_count}
        maxCapacity={maxCapacity}
        name={name}
        isAlmostFull={isAlmostFull}
      />
      <Divider />
      <SectionCardContent
        _count={_count}
        maxCapacity={maxCapacity}
        maleCount={maleCount}
        femaleCount={femaleCount}
        isAlmostFull={isAlmostFull}
      />
      <Divider />
      <SectionCardActions onEdit={onEdit} />
    </Paper>
  );
}

export default memo(SectionCard);
