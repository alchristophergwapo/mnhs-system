"use client";

import PageWrapper from "@components/PageCardedWrapper";
import Headers from "./Headers";
import Content from "./Content";
import { useAppForm } from "@/src/hooks/useTanstack";
import {
  AddressType,
  CitizenshipType,
  EnrollmentBackgroundType,
  EnrollmentType,
  FamilyType,
  StudentType,
  UserType,
} from "@/src/types";
import { useCreateStudentMutation, useGetStudentDetailsQuery } from "../StudentsApi";
import { useSnackbar } from "notistack";
import useNavigate from "@/src/hooks/useNavigate";
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

function StudentPage() {
  const routeParams = useParams<{ studentId: string }>();
  const { studentId } = routeParams;
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
  const [createStudent] = useCreateStudentMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [studentData, setStudentData] =
    useState<StudentDataType>(defaultStudentData);

  const {data: student, isLoading, isFetching } = useGetStudentDetailsQuery(Number(studentId),{
    skip: studentId === "new",
  })

  useEffect(() => {
    if (studentId !== "new" && !isLoading && !isFetching) {
      setStudentData(student as StudentDataType);
    }
  }, [studentId, isLoading, isFetching, student]);

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
      data={[]}
      isLoading={isFetching}
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
