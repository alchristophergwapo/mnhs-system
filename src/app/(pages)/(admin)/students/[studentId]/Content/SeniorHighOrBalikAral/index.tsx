import { useFormContext } from "@/src/hooks/useTanstack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { memo, useRef, useState } from "react";
import RadioSelect from "@components/RadioSelect";
import Radio from "@mui/material/Radio";
import Select from "@components/Select";
import MenuItem from "@mui/material/MenuItem";
import { useGetCoursesQuery } from "@/src/app/(pages)/(admin)/academics/courses/CoursesApi";
import EntryType from "./EntryType";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";
import { CourseType } from "@/prisma/generated/prisma";

function SeniorHighOrBalikAral() {
  const form = useFormContext();
  const [isSeniorHigh, setIsSeniorHigh] = useState(false);
  const [isTransferee, setIsTransferee] = useState(false);
  const [track, setTrack] = useState("");
  const isTransfereeRef = useRef(isTransferee);
  isTransfereeRef.current = isTransferee;

  const isSeniorHighRef = useRef(isSeniorHigh);
  isSeniorHighRef.current = isSeniorHigh;

  const trackRef = useRef(track);
  trackRef.current = track;

  const {
    data: courses,
    isFetching,
    isError,
  } = useGetCoursesQuery(
    { track },
    {
      skip: track === "",
    },
  );

  return (
    <div className="h-full flex flex-col my-2 gap-4">
      <div className="text-[14px] text-gray-700">
        Skip this step if not applicable
      </div>
      <FormGroup row>
        <form.Field
          name={"isSeniorHigh" as never}
          children={(field) => (
            <FormControlLabel
              labelPlacement="end"
              control={
                <Checkbox
                  checked={field.state.value as boolean}
                  onChange={(e) => {
                    const checked: unknown = e.target.checked;
                    field.handleChange(checked as UpdaterFn<never, never>);
                  }}
                />
              }
              label="Applying for Senior High?"
            />
          )}
        />

        <form.Field
          name={"isTransferee" as never}
          children={(field) => (
            <FormControlLabel
              labelPlacement="end"
              control={
                <Checkbox
                  checked={field.state.value as boolean}
                  onChange={(e) => {
                    const checked: unknown = e.target.checked;
                    field.handleChange(checked as UpdaterFn<never, never>);
                  }}
                />
              }
              label="Applying as Transferee or Balik-Aral?"
            />
          )}
        />
      </FormGroup>
      <form.Field name={"isSeniorHigh" as never}>
        {(field) => {
          const isSeniorHigh = field.state.value as boolean;
          if (!isSeniorHigh) {
            return;
          }
          return (
            <div className="flex flex-col gap-4">
              <form.Field
                name={"enrollment.semester" as never}
                validators={{
                  onChangeAsyncDebounceMs: 300,
                  onChangeAsync: (isSeniorHigh
                    ? z.string().nonempty("Semester is required")
                    : z.string().nullish()) as FieldAsyncValidateOrFn<
                    Record<string, never>,
                    never,
                    never
                  >,
                }}
                children={(field) => (
                  <RadioSelect
                    name={field.name}
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value as any)}
                    label="Semester"
                    required={isSeniorHigh}
                    error={field.state.meta.errors.length > 0}
                    errors={field.state.meta.errors as { message: string }[]}
                  >
                    <FormControlLabel
                      label="1st Semester"
                      value="FIRST"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      label="2nd Semester"
                      value="SECOND"
                      control={<Radio />}
                    />
                  </RadioSelect>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <form.Field
                  name={"track" as never}
                  validators={{
                    onChangeAsyncDebounceMs: 300,
                    onChangeAsync: (isSeniorHigh
                      ? z
                          .string("Track is required")
                          .nonempty("Track is required")
                      : z.string().nullish()) as FieldAsyncValidateOrFn<
                      Record<string, never>,
                      never,
                      never
                    >,
                  }}
                  children={(field) => {
                    const track = field.state.value as string;
                    if (track) {
                      setTrack(track);
                    }
                    return (
                      <>
                        <Select
                          label="Track"
                          onChange={(e) => {
                            const value: unknown = e.target.value;
                            field.handleChange(
                              value as UpdaterFn<never, never>,
                            );
                          }}
                          value={field.state.value || ""}
                          required
                          error={field.state.meta.errors.length > 0}
                          errors={
                            field.state.meta.errors as { message: string }[]
                          }
                        >
                          {Object.keys(CourseType).map((key) => (
                            <MenuItem key={key} value={key}>
                              {key === "ACADEMIC_TRACK"
                                ? "Academic Track"
                                : key === "TVL_TRACK"
                                  ? "Technical-Vocational Track"
                                  : "Elective"}
                            </MenuItem>
                          ))}
                        </Select>
                        {track && (
                          <form.Field
                            name={"enrollment.courseId" as never}
                            validators={{
                              onChangeAsyncDebounceMs: 300,
                              onChangeAsync: (isSeniorHigh
                                ? z.coerce
                                    .number("Strand is required")
                                    .nonoptional("Strand is required")
                                : z.coerce
                                    .number()
                                    .nullish()) as FieldAsyncValidateOrFn<
                                Record<string, never>,
                                never,
                                never
                              >,
                            }}
                            children={(sfield) => (
                              <Select
                                label="Strand"
                                onChange={(e) =>
                                  sfield.handleChange(e.target.value as any)
                                }
                                value={sfield.state.value || ""}
                                required
                                error={sfield.state.meta.errors.length > 0}
                                errors={
                                  sfield.state.meta.errors as {
                                    message: string;
                                  }[]
                                }
                              >
                                {courses?.map((course) => (
                                  <MenuItem key={course.id} value={course.id}>
                                    {course.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        )}
                      </>
                    );
                  }}
                />
              </div>
            </div>
          );
        }}
      </form.Field>
      <form.Field name={"isTransferee" as never}>
        {(field) => {
          const isTransferee = field.state.value as boolean;
          if (!isTransferee) {
            return;
          }
          return <EntryType required={isTransferee} />;
        }}
      </form.Field>
    </div>
  );
}
