import Position from "./Position";
import Gender from "./BirthRelatedInputs/Gender";
import CivilStatus from "./BirthRelatedInputs/CivilStatus";
import Citizenship from "./BirthRelatedInputs/Citizenship";
import NameInput from "../NameInput";
import { useFormContext } from "@/src/hooks/useTanstack";
import Input from "@components/ui/Input";
import z from "zod";
import BloodType from "./BloodType";
import LicenseNumber from "./LicenseNumber";
import LicenseExpiryDate from "./LicenseExpiryDate";
import GradeLevel from "./GradeLevel";
import DateInput from "@components/ui/DateInput";
import { UpdaterFn } from "@tanstack/react-form";

/**
 * Component for the personal information section of the teacher form.
 * It includes fields for the teacher's position, last name, first name, middle name, name extension, date of birth, place of birth, gender, civil status, citizenship, height, weight, blood type, and benefits.
 * @param {ContentProps<UserType>} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function PositionAndPersonalInformation() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 gap-4">
        <Position />
        <GradeLevel />
        <LicenseNumber />
        <LicenseExpiryDate />
      </div>
      <div className="text-[15px] font-bold uppercase">
        Personal Information
      </div>
      <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 gap-4">
        <NameInput nameExtension />
        <form.Field
          name={"dateOfBirth" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z.coerce
              .date("Date of birth must be a valid date")
              .min(
                new Date(`${new Date().getFullYear() - 80}-01-01`),
                "You must be at most 80 years old",
              )
              .max(
                new Date(`${new Date().getFullYear() - 17}-01-01`),
                "You must be at least 17 or 18 years old",
              )
              .nonoptional("Date of birth is required") as any,
          }}
          children={(field) => (
            <DateInput
              name={field.name}
              value={field.state.value}
              onChange={(newValue) => {
                const value: unknown = newValue;
                field.handleChange(value as UpdaterFn<never, never>);
              }}
              label="Date of Birth"
              errors={field.state.meta.errors || []}
              error={field.state.meta.errors?.length > 0}
              required
            />
          )}
        />
        <form.Field
          name={"placeOfBirth" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .max(100, "Address is too long")
              .nullish() as any,
          }}
          children={(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value as any)}
              label="Place of Birth"
            />
          )}
        />
        <form.Field
          name={"telephoneNumer" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z.string().nullish() as any,
          }}
          children={(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value as any)}
              label="Telephone No."
            />
          )}
        />
        <form.Field
          name={"contactNumber" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .nonempty("Contact number is required")
              .regex(/^(\+639|09)\d{9}$/, "Invalid contact number format")
              .min(11, "Contact number cannot be lesser than 11 characters")
              .max(13, "Contact number cannot be greater than 13 characters")
              .refine(
                (value) => (/^(\+639|09)\d{9}$/.test(value) ? true : false),
                "Invalid contact number format",
              ) as any,
          }}
          children={(field) => (
            <Input
              name={field.name}
              value={
                field.state.value
                  ? String(field.state.value).replace(/[\s.\-\(\)]/g, "")
                  : ""
              }
              onChange={(e) => field.handleChange(e.target.value as any)}
              label="Mobile No."
              errors={field.state.meta.errors || []}
              error={field.state.meta.errors?.length > 0}
              placeholder="Example (+639xxxxxxxxx, 09xxxxxxxxx)"
              required
            />
          )}
        />
        <form.Field
          name={"email" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z.email().or(z.literal("")) as any,
          }}
          children={(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value as any)}
              label="Email Address (Optional)"
              errors={field.state.meta.errors || []}
              error={field.state.meta.errors?.length > 0}
            />
          )}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <form.Field
          name={"gender" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z.string().nonempty("Gender is required") as any,
          }}
          children={(field) => (
            <Gender
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value as any)}
              errors={field.state.meta.errors || []}
              error={field.state.meta.errors?.length > 0}
            />
          )}
        />
        <CivilStatus />
      </div>
      <Citizenship />
      <div className="flex flex-row gap-4 mb-2">
        <form.Field
          name={"height" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .regex(/^[0-9]+$/, "Only numbers are allowed")
              .max(3, "Invalid height")
              .nullish() as any,
          }}
          children={(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              label="Height (cm)"
              onChange={(e) =>
                field.handleChange(
                  (Number(e.target.value) ? e.target.value : "") as any,
                )
              }
              errors={field.state.meta.errors || []}
              error={field.state.meta.errors?.length > 0}
              sx={{ "& .MuiSvgIcon-root": { display: "none" } }}
            />
          )}
        />
        <form.Field
          name={"weight" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z.coerce
              .number()
              .max(300, "Invalid weight")
              .nullish() as any,
          }}
          children={(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) =>
                field.handleChange(
                  Number(e.target.value) ? Number(e.target.value) : ("" as any),
                )
              }
              label="Weight (kg)"
              errors={field.state.meta.errors || []}
              error={field.state.meta.errors?.length > 0}
            />
          )}
        />
        <BloodType />
      </div>
    </div>
  );
}
