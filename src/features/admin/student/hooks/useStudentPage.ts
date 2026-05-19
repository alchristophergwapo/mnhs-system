import { useCreateStudentMutation, useGetStudentDetailsQuery } from "@features/students/api/students.api";
import useNavigate from "@hooks/useNavigate";
import { useAppForm } from "@hooks/useTanstack";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { StudentDataType } from "../types/student.types";

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

function useStudentPage() {
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

    return {
        isFetching,
        form,
    }
}

export default useStudentPage;