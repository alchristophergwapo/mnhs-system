"use client";

import PageWrapper from "@components/PageCardedWrapper";
import Content from "./Content";
import Header from "./TeacherHeader";
import { UserType } from "../_types";
import { useAppForm } from "@hooks/useTanstack";
import {
  useCreateTeacherMutation,
  useGetTeacherDetailsQuery,
  useUpdateTeacherMutation,
} from "../TeachersApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ObjectHelper from "@utils/objectHelper";
import { useSnackbar } from "notistack";

const defaultValues: Partial<UserType> = {
  firstName: "Chris",
  middleName: "",
  lastName: "Al",
  nameExtension: "",
  email: "",
  contactNumber: "09876543210",
  dateOfBirth: "2000-01-01",
  gender: "MALE",
  civilStatus: "SINGLE",
  civilStatusOther: "",
  dateHired: "",
  avatar: "",
  subjects: [],
  advisorySection: "",
  licenseNumber: "",
  licenseExpiryDate: "",
  isOjt: false,
  gradeLevelId: null,
  permanentAddress: {
    barangay: "",
    city: "",
    province: "",
    zipCode: "",
  },
  citizenship: {
    filipino: true,
  },
};

/**
 * Renders a page wrapper with a header and content components.
 * The page wrapper component has isLoading and displayBreadcrumbs props set to false.
 * The header component is passed as a prop to the page wrapper component.
 * The content component is passed as a prop to the page wrapper component.
 * @returns {JSX.Element} - The rendered TeacherForm component
 */
export default function TeacherForm() {
  const routeParams = useParams<{ teacherId: string }>();
  const { teacherId } = routeParams;
  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const { data: teacherDetails, isLoading } = useGetTeacherDetailsQuery(
    Number(teacherId),
    {
      skip: !teacherId || teacherId === "new",
    },
  );
  const { enqueueSnackbar } = useSnackbar();

  const [teacherData, setTeacherData] = useState(defaultValues);

  const isNew = teacherId === "new";
  const isReady = isNew || !!teacherDetails;

  useEffect(() => {
    if (!isNew && teacherDetails) {
      const restructuredData = ObjectHelper.restructure(
        teacherDetails,
        defaultValues,
      );
      setTeacherData(restructuredData);
    }
  }, [teacherDetails, isNew]);

  const form = useAppForm({
    defaultValues: teacherData as UserType,
    onSubmit: async ({ value }) => {
      // Make sure to validate form data before submitting the data to the database
      await form.validateAllFields("submit");

      // Check if data is an existing one
      if (!isNew) {
        // Update the existing data with the new values
        await updateTeacher({
          teacher: value as UserType,
          teacherId: Number(teacherId),
        })
          .unwrap()
          .then((teacher) => {
            enqueueSnackbar("Teacher updated successfully", {
              variant: "success",
            });
            setTeacherData(ObjectHelper.restructure(teacher, defaultValues));
          })
          .catch((err) => {
            enqueueSnackbar("An error occurred", { variant: "error" });
          });
      } else {
        // Add/Create new teacher data if teacherId from route params is equal to "new"
        await createTeacher(value as UserType)
          .unwrap()
          .then((teacher) => {
            enqueueSnackbar("Teacher added successfully", {
              variant: "success",
            });
            setTeacherData(ObjectHelper.restructure(teacher, defaultValues));
          })
          .catch((err) => {
            enqueueSnackbar("An error occurred", { variant: "error" });
          });
      }
    },
  });

  return (
    <PageWrapper
      isLoading={isLoading || !isReady}
      displayBreadcrumbs={true}
      header={<Header />}
      content={
        <form.AppForm>
          <Content />
        </form.AppForm>
      }
    />
  );
}
