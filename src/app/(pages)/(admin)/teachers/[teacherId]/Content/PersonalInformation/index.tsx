import Position from "./Position";
import Gender from "./BirthRelatedInputs/Gender";
import CivilStatus from "./BirthRelatedInputs/CivilStatus";
import Citizenship from "./BirthRelatedInputs/Citizenship";
import NameInput from "../NameInput";
import { useFormContext } from "@hooks/useTanstack";
import Input from "@components/ui/Input";
import z from "zod";
import BloodType from "./BloodType";
import LicenseNumber from "./LicenseNumber";
import LicenseExpiryDate from "./LicenseExpiryDate";
import GradeLevel from "./GradeLevel";
import DateInput from "@components/ui/DateInput";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

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
              .nonoptional(
                "Date of birth is required",
              ) as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <DateInput
              name={field.name}
              value={field.state.value}
              onChange={(newValue) => {
                const value: unknown = newValue;
                field.handleChange(value as UpdaterFn<never, never>);
              }}
              label="Date of Birth"
              errors={field.state.meta.errors as { message: string }[]}
              error={field.state.meta.errors?.length > 0}
              required
            />
          )}
        </form.Field>
        <form.Field
          name={"placeOfBirth" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .max(100, "Address is too long")
              .nullish() as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) =>
                field.handleChange(
                  e.target.value as unknown as UpdaterFn<never, never>,
                )
              }
              label="Place of Birth"
            />
          )}
        </form.Field>
        <form.Field
          name={"telephoneNumer" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .nullish() as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) =>
                field.handleChange(
                  e.target.value as unknown as UpdaterFn<never, never>,
                )
              }
              label="Telephone No."
            />
          )}
        </form.Field>
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
              ) as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <Input
              name={field.name}
              value={
                field.state.value
                  ? String(field.state.value).replace(/[\s.\-\(\)]/g, "")
                  : ""
              }
              onChange={(e) =>
                field.handleChange(
                  e.target.value as unknown as UpdaterFn<never, never>,
                )
              }
              label="Mobile No."
              errors={field.state.meta.errors as { message: string }[]}
              error={field.state.meta.errors?.length > 0}
              placeholder="Example (+639xxxxxxxxx, 09xxxxxxxxx)"
              required
            />
          )}
        </form.Field>
        <form.Field
          name={"email" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .email()
              .or(z.literal("")) as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) =>
                field.handleChange(
                  e.target.value as unknown as UpdaterFn<never, never>,
                )
              }
              label="Email Address (Optional)"
              errors={field.state.meta.errors as { message: string }[]}
              error={field.state.meta.errors?.length > 0}
            />
          )}
        </form.Field>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <form.Field
          name={"gender" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .nonempty(
                "Gender is required",
              ) as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <Gender
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) =>
                field.handleChange(
                  e.target.value as unknown as UpdaterFn<never, never>,
                )
              }
              errors={field.state.meta.errors as { message: string }[]}
              error={field.state.meta.errors?.length > 0}
            />
          )}
        </form.Field>
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
              .nullish() as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              label="Height (cm)"
              onChange={(e) =>
                field.handleChange(
                  (Number(e.target.value)
                    ? e.target.value
                    : "") as unknown as UpdaterFn<never, never>,
                )
              }
              errors={field.state.meta.errors as { message: string }[]}
              error={field.state.meta.errors?.length > 0}
              sx={{ "& .MuiSvgIcon-root": { display: "none" } }}
            />
          )}
        </form.Field>
        <form.Field
          name={"weight" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z.coerce
              .number()
              .max(300, "Invalid weight")
              .nullish() as unknown as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
        >
          {(field) => (
            <Input
              name={field.name}
              value={field.state.value ?? ""}
              onChange={(e) =>
                field.handleChange(
                  (Number(e.target.value)
                    ? Number(e.target.value)
                    : "") as unknown as UpdaterFn<never, never>,
                )
              }
              label="Weight (kg)"
              errors={field.state.meta.errors as { message: string }[]}
              error={field.state.meta.errors?.length > 0}
            />
          )}
        </form.Field>
        <BloodType />
      </div>
    </div>
  );
}
