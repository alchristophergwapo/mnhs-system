import { EducationType } from "../../../_types";
import InputField from "../InputField";

export default function Studies({
  title,
  education,
  onEducationDetailsChange,
}: {
  title: string;
  education?: EducationType;
  onEducationDetailsChange: (field: string, value?: string | any) => void;
}) {
  return (
    <>
      <div className="text-[16px] font-bold uppercase">{title}</div>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
        <InputField
          target="schoolName"
          label="School Name"
          value={education?.schoolName ?? ""}
          onValueChange={onEducationDetailsChange}
        />
        <InputField
          target="degree"
          label="Basic Education/Degree/Course"
          value={education?.degree ?? ""}
          onValueChange={onEducationDetailsChange}
          placeholder="Write in full"
        />
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <InputField
          target="from"
          label="From"
          value={education?.from ?? ""}
          onValueChange={onEducationDetailsChange}
          type="date"
        />
        <InputField
          target="to"
          label="To"
          value={education?.to ?? ""}
          onValueChange={onEducationDetailsChange}
          type="date"
        />
        <InputField
          target="highestLevel"
          label="Highest Level/Units Earned"
          value={education?.highestLevel ?? ""}
          onValueChange={onEducationDetailsChange}
          placeholder="If not graduated"
        />
        <InputField
          target="yearGraduated"
          label="Year Graduated"
          value={education?.yearGraduated ?? ""}
          onValueChange={onEducationDetailsChange}
          type="number"
        />
      </div>
    </>
  );
}
