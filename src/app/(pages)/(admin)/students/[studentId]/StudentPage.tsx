"use client";

import PageWrapper from "@components/layouts/PageCardedWrapper";
import Headers from "./Headers";
import Content from "./Content";
import { useAppForm } from "@hooks/useTanstack";
import {
  AddressType,
  CitizenshipType,
  EnrollmentBackgroundType,
  EnrollmentType,
  FamilyType,
  StudentType,
  UserType,
} from "@types";
import {
  useCreateStudentMutation,
  useGetStudentDetailsQuery,
} from "../../../../../features/students/api/students.api";
import { useSnackbar } from "notistack";
import useNavigate from "@hooks/useNavigate";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export type StudentDataType = {
  user: UserType;
  permanentAddress: AddressType;
  residentialAddress?: AddressType;
  student: StudentType;
  citizenship: CitizenshipType;
  father: FamilyType;
  mother: FamilyType;
  guardian?: FamilyType;
  enrollment: EnrollmentType;
  enrollmentBackground?: EnrollmentBackgroundType;
  isSeniorHigh: boolean;
  isTransferee: boolean;
};

const defaultStudentData: StudentDataType = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    role: "STUDENT",
    dateOfBirth: "",
    gender: undefined,
  },
  permanentAddress: {
    barangay: "",
    city: "",
    province: "",
    zipCode: "",
  },
  citizenship: {
    filipino: true,
  },
  enrollment: {
    enrollmentStatus: "ENROLLED",
    cardImage: "",
    schoolYearStart: "",
    schoolYearEnd: "",
    gradeLevelId: undefined,
  },
  student: {
    belongsToIP: false,
  },
  father: {
    lastName: "",
    firstName: "",
    contactNumber: "",
    relationship: "FATHER",
  },
  mother: {
    maidenName: "",
    lastName: "",
    firstName: "",
    contactNumber: "",
    relationship: "MOTHER",
  },
  isSeniorHigh: false,
  isTransferee: false,
};

/**
 * @component StudentPage
 * @description A React functional component that serves as the student details page.
 * It handles both creating a new student and viewing/editing an existing student's details,
 * determined by the `studentId` route parameter ("new" for creation, or an existing ID).
 * It manages form state, data fetching, and submission using custom hooks and mutations.
 *
 * @returns {JSX.Element} The rendered student page component wrapped in a PageWrapper,
 * including a form for student data, a header, and breadcrumbs.
 */
function StudentPage() {
  const routeParams = useParams<{ studentId: string }>();
  const { studentId } = routeParams;
  const [createStudent] = useCreateStudentMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [updatedStudentData, setUpdatedStudentData] =
    useState<StudentDataType>(defaultStudentData);

  const {
    data: student,
    isLoading,
    isFetching,
  } = useGetStudentDetailsQuery(Number(studentId), {
    skip: studentId === "new",
  });

  const studentData =
    studentId !== "new" && !isLoading && !isFetching
      ? (student as StudentDataType)
      : updatedStudentData;

  const form = useAppForm({
    defaultValues: studentData,
    onSubmit: async ({ value }) => {
      await form.validateAllFields("submit");

      await createStudent(value as StudentDataType)
        .unwrap()
        .then((student) => {
          enqueueSnackbar("Student added successfully", {
            variant: "success",
          });
          setUpdatedStudentData(student as unknown as StudentDataType);
          navigate(`/students/${student.id}`);
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("An error occurred", { variant: "error" });
        });
    },
  });

  return (
    <PageWrapper
      isLoading={isFetching}
      displayBreadcrumbs={true}
      content={
        <form.AppForm>
          <Content />
        </form.AppForm>
      }
      header={<Headers />}
    />
  );
}

export default StudentPage;
