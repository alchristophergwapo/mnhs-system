import Button from "@components/Button";
import { ExperienceType } from "../../../_types";
import InputField from "../InputField";
import { Delete } from "@mui/icons-material";

export default function ExperienceDetails({
  experience,
  index,
  onExperienceChange,
  onRemoveExperience,
}: {
  experience: ExperienceType;
  onExperienceChange: (
    field?: keyof ExperienceType,
    value?: string | any,
  ) => void;
  onRemoveExperience: (index: number) => void;
  index: number;
}) {
  const experienceOrder = index + 1;

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="text-[16px] font-bold uppercase">
          {experienceOrder === 1
            ? `${experienceOrder}st`
            : index + 1 === 2
              ? `${experienceOrder}nd`
              : index + 1 === 3
                ? `${experienceOrder}rd`
                : `${experienceOrder}th`}{" "}
          most recent experience
        </div>
        {index !== 0 && (
          <Button
            startIcon={<Delete />}
            onClick={() => onRemoveExperience(index)}
            color="error"
          >
            remove experience
          </Button>
        )}
      </div>
      <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 gap-4">
        <InputField
          target="employerName"
          label="Employer Name"
          value={experience.employerName ?? ""}
          onValueChange={(field: string, value: string | any) =>
            onExperienceChange(field as keyof ExperienceType, value)
          }
        />
        <InputField
          target="employerContactNumber"
          label="Employer Contact Number"
          value={experience.employerContactNumber ?? ""}
          onValueChange={(field: string, value: string | any) =>
            onExperienceChange(field as keyof ExperienceType, value)
          }
        />
        <InputField
          target="supervisorName"
          label="Supervisor Name"
          value={experience.supervisorName ?? ""}
          onValueChange={(field: string, value: string | any) =>
            onExperienceChange(field as keyof ExperienceType, value)
          }
        />
        <InputField
          target="supervisorContactNumber"
          label="Supervisor Contact Number"
          value={experience.supervisorContactNumber ?? ""}
          onValueChange={(field: string, value: string | any) =>
            onExperienceChange(field as keyof ExperienceType, value)
          }
        />
      </div>
      <div className="grid  grid-cols-4 gap-4 gap-x-2 lg:gap-x-4">
        <div className="col-span-4 xl:col-span-2">
          <InputField
            target="position"
            label="Position"
            value={experience.position ?? ""}
            onValueChange={(field: string, value: string | any) =>
              onExperienceChange(field as keyof ExperienceType, value)
            }
          />
        </div>
        <div className="col-span-4 md:col-span-2 xl:col-span-1">
          <InputField
            target="from"
            label="Start Date"
            value={experience.from ?? ""}
            onValueChange={(field: string, value: string | any) =>
              onExperienceChange(field as keyof ExperienceType, value)
            }
            type="date"
          />
        </div>
        <div className="col-span-4 md:col-span-2 xl:col-span-1">
          <InputField
            target="to"
            label="End Date"
            value={experience.to ?? ""}
            onValueChange={(field: string, value: string | any) =>
              onExperienceChange(field as keyof ExperienceType, value)
            }
            type="date"
          />
        </div>
        <div className="col-span-2">
          <InputField
            target="salary"
            label="Salary"
            value={experience.salary ?? ""}
            onValueChange={(field: string, value: string | any) =>
              onExperienceChange(field as keyof ExperienceType, value)
            }
            type="number"
          />
        </div>
      </div>
      <InputField
        target="reasonForLeaving"
        label="Reason for leaving"
        value={experience.reasonForLeaving ?? ""}
        onValueChange={(field: string, value: string | any) =>
          onExperienceChange(field as keyof ExperienceType, value)
        }
        multiline
        minRows={3}
        maxRows={6}
      />
    </>
  );
}
