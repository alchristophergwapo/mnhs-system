import Input from "@/src/components/Input";
import RadioSelect from "@/src/components/RadioSelect";
import { useFormContext } from "@/src/hooks/useTanstack";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { memo } from "react";
import z from "zod";
import GradeLevel from "@/src/app/(admin)/academics/sections/CreateSection/GradeLevel";
import Citizenship from "./Citizenship";
import { format, parseISO } from "date-fns";

function PersonalInformation() {
  const form = useFormContext();

  return (
    <div className="flex flex-col my-2 gap-4">
      <div className="grid grid-cols-4">
        <GradeLevel />
      </div>
      <Typography variant="h6">Personal Information</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <form.Field
            name={"user.lastName" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .nonempty("Last name is required")
                .max(50, "Last name cannot be greater than 50 characters")
                .min(2, "Last name cannot be lesser than 2 characters")
                .regex(/^[a-zA-Z -]+$/, "Only letters are allowed") as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                required
                label="Last Name"
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <form.Field
            name={"user.firstName" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .nonempty("First name is required")
                .max(50, "First name cannot be greater than 50 characters")
                .min(2, "First name cannot be lesser than 2 characters")
                .regex(/^[a-zA-Z ]+$/, "Only letters are allowed") as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                required
                label="First Name"
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <form.Field
            name={"user.middleName" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .max(50, "Middle name cannot be greater than 50 characters")
                .regex(/^[- a-zA-Z ]*$/, "Only letters are allowed")
                .nullish() as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                label="Middle Name"
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <form.Field
            name={"user.nameExtension" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .max(3, "Name extension cannot be greater than 3 characters")
                .regex(/^[. a-zA-Z ]*$/, "Only letters are allowed")
                .nullish() as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                label="Name Extension"
                placeholder="e.g., Jr., II"
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <form.Field
            name={"user.dateOfBirth" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z.coerce
                .date("Date of birth must be a valid date")
                .min(
                  new Date(`${new Date().getFullYear() - 50}-01-01`),
                  "You must be at most 50 years old",
                )
                .max(
                  new Date(`${new Date().getFullYear() - 11}-01-01`),
                  "You must be at least 11 or 12 years old",
                )
                .nonoptional("Date of birth is required") as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value ? format(parseISO(field.state.value), "yyyy-MM-dd"): ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                required
                label="Birth Date"
                type="date"
                errors={field.state.meta?.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <form.Field
            name={"student.motherTongue" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .nonempty("Mother tongue is required")
                .max(20, "Mother tongue cannot be greater than 20 characters")
                .regex(/^[a-zA-Z ]+$/, "Only letters are allowed") as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                label="Mother Tongue"
                required
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <form.Field
            name={"user.religion" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .max(50, "Religion cannot be greater than 50 characters")
                .regex(/^[a-zA-Z ]+$/, "Only letters are allowed")
                .nullish() as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                label="Religion"
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <form.Field
            name={"user.placeOfBirth" as never}
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
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                label="Birth Place"
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <form.Field
            name={"user.contactNumber" as never}
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
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                required
                label="Contact Number"
                type="tel"
                errors={
                  (field.state.meta.errors || []) as { message: string }[]
                }
                error={field.state.meta.errors.length > 0}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-4">
        <form.Field
          name={"user.gender" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z.string().nonempty("Gender is required") as any,
          }}
          children={(field) => (
            <RadioSelect
              label="Gender at birth"
              onChange={(e) => field.handleChange(e.target.value as any)}
              value={field.state.value || ""}
              required
              name={field.name}
              errors={(field.state.meta.errors || []) as { message: string }[]}
              error={field.state.meta.errors.length > 0}
            >
              <FormControlLabel value="MALE" control={<Radio />} label="Male" />
              <FormControlLabel
                value="FEMALE"
                control={<Radio />}
                label="Female"
              />
            </RadioSelect>
          )}
        />
        <form.Field
          name={"student.belongsToIP" as never}
          children={(field) => {
            return (
              <div className="flex flex-col">
                <RadioSelect
                  label="Belonging to any Indigenous People (IP) Community/Indigenous Cultural Community?"
                  onChange={(e) =>
                    field.handleChange((e.target.value === "yes") as any)
                  }
                  value={field.state.value || false}
                  required
                  name={field.name}
                  errors={
                    (field.state.meta.errors || []) as { message: string }[]
                  }
                  error={field.state.meta.errors.length > 0}
                >
                  <FormControlLabel
                    value={"yes"}
                    control={<Radio checked={field.state.value} />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={"no"}
                    control={<Radio checked={!field.state.value} />}
                    label="No"
                  />
                </RadioSelect>
                {field.state.value && (
                  <form.Field
                    name={"student.IPCommunity" as never}
                    validators={{
                      onChangeAsyncDebounceMs: 300,
                      onChangeAsync: z
                        .string()
                        .nullish()
                        .superRefine((value, ctx) => {
                          if (field.state.value && !value) {
                            ctx.addIssue({
                              code: "custom",
                              message:
                                "This field is required when belongs to IP community is yes",
                            });
                          }
                        }) as any,
                    }}
                    children={(sfield) => (
                      <Input
                        name={sfield.name}
                        value={sfield.state.value || ""}
                        onChange={(e) =>
                          sfield.handleChange(e.target.value as any)
                        }
                        required={field.state.value}
                        label="IP Community"
                      />
                    )}
                  />
                )}
              </div>
            );
          }}
        />
        <Citizenship />
      </div>
    </div>
  );
}

export default memo(PersonalInformation);
