import MaidenName from "./MaidenName";
import { FamilyProps } from "@features/admin/student/types/student.types";
import LastName from "./LastName";
import FirstName from "./FirstName";
import MiddleName from "./MiddleName";
import NameExtension from "./NameExtension";
import FamilyContactNumber from "./FamilyContactNumber";

/**
 * A React component that renders a form section for family member details.
 * It dynamically displays various input fields such as maiden name, last name,
 * first name, middle name, name extension, and contact number based on the
 * provided props. It utilizes `useFormContext` to integrate with a form
 * management library (like React Hook Form).
 *
 * @param {FamilyProps} props - The props for the Family component.
 * @param {boolean} [props.nameExtension] - Determines whether to render the name extension input field.
 * @param {boolean} [props.maidenName] - Determines whether to render the maiden name input field.
 * @param {string} props.title - The main title displayed at the top of the form section.
 * @param {string} [props.subtitle] - An optional subtitle displayed below the title.
 * @param {string} props.target - The target identifier used to namespace the form fields.
 * @param {boolean} [props.required=true] - Indicates whether the primary name fields (last, first) are required.
 * @returns {JSX.Element} The rendered family information form section.
 */
function Family({
  nameExtension,
  maidenName,
  title,
  subtitle,
  target,
  required = true,
}: FamilyProps) {
  return (
    <>
      <div className="text-[16px] font-bold uppercase">{title}</div>
      {subtitle && <div className="text-[12px] text-gray-500">{subtitle}</div>}
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
        {maidenName && <MaidenName target={target} />}
        <LastName target={target} required={required} />
        <FirstName target={target} required={required} />
        <MiddleName target={target} />
        {nameExtension && <NameExtension target={target} />}
        <FamilyContactNumber target={target} />
      </div>
    </>
  );
}

export default Family;
