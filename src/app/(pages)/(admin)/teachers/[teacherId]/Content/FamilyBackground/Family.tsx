import { FamilyType, NameInputType } from "../../../_types";
import NameInput from "../NameInput";

export default function Family({
  title,
  family,
  onChange,
}: {
  title: string;
  family: NameInputType;
  onChange: (field: string, value?: string | any) => void;
}) {
  return (
    <>
      <div className="text-[16px] font-bold uppercase">{title}</div>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
        <NameInput
          value={family}
          onValueChange={onChange}
          nameExtension
        />
      </div>
    </>
  );
}
