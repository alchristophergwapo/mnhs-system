import { StepsType } from "@components/ui/Stepper";
import EscalatorWarning from "@mui/icons-material/EscalatorWarning";
import HistoryEduOutlined from "@mui/icons-material/HistoryEduOutlined";
import LocationCity from "@mui/icons-material/LocationCity";
import { lazy } from "react";
import { UserType } from "../../../teachers/_types";
import DocumentScanner from "@mui/icons-material/DocumentScanner";
import FindInPageOutlined from "@mui/icons-material/FindInPageOutlined";
const PersonalInformation = lazy(() => import("./PersonalInformation"));
const Address = lazy(() => import("./Address"));
const ParentOrGuardian = lazy(() => import("./ParentOrGuardian"));
const SeniorHighOrBalikAral = lazy(() => import("./SeniorHighOrBalikAral"));
const Documents = lazy(() => import("./Documents"));
const Review = lazy(() => import("./Review"));

export function getSteps(): StepsType<UserType>[] {
  return [
    {
      label: "Student Information",
      description: "",
      fields: [
        "gradeLevel",
        "user.lastName",
        "user.firstName",
        "user.middleName",
        "user.nameExtension",
        "user.dateOfBirth",
        "student.motherTongue",
        "user.religion",
        "user.placeOfBirth",
        "user.contactNumber",
        "user.gender",
        "student.belongsToIP",
        "student.IPCommunity",
      ],
      content: () => <PersonalInformation />,
      icon: <HistoryEduOutlined />,
    },
    {
      label: "Address",
      description: "",
      fields: [
        "permanentAddress.houseNumber",
        "permanentAddress.street",
        "permanentAddress.subdivision",
        "permanentAddress.barangay",
        "permanentAddress.city",
        "permanentAddress.province",
        "permanentAddress.zipCode",
        "residentialAddress.houseNumber",
        "residentialAddress.street",
        "residentialAddress.subdivision",
        "residentialAddress.barangay",
        "residentialAddress.city",
        "residentialAddress.province",
        "residentialAddress.zipCode",
      ],
      content: () => <Address />,
      icon: <LocationCity />,
    },
    {
      label: "Parent/Guardian",
      description: "",
      fields: [
        "father.lastName",
        "father.firstName",
        "father.middleName",
        "father.nameExtension",
        "father.contactNumber",
        "mother.maidenName",
        "mother.lastName",
        "mother.firstName",
        "mother.middleName",
        "mother.contactNumber",
        "guardian.lastName",
        "guardian.firstName",
        "guardian.middleName",
        "guardian.contactNumber",
      ],
      content: () => <ParentOrGuardian />,
      icon: <EscalatorWarning />,
    },
    {
      label: "Senior High or Balik Aral",
      description: "",
      fields: [
        "enrollment.semester",
        "track",
        "enrollment.courseId",
        "enrollment.gradeLevelId",
        "enrollmentBackground.entryType",
        "enrollmentBackground.lastGradeLevel",
        "enrollmentBackground.lastSchoolYear",
        "enrollmentBackground.lastSchoolID",
        "enrollmentBackground.lastSchoolName",
        "enrollmentBackground.lastSchoolAddress",
      ],
      content: () => <SeniorHighOrBalikAral />,
      icon: <HistoryEduOutlined />,
    },
    {
      label: "Documents",
      description: "",
      fields: ["enrollment.cardImage"],
      content: () => <Documents />,
      icon: <DocumentScanner />,
    },
    {
      label: "Review",
      description: "",
      content: () => <Review />,
      icon: <FindInPageOutlined />,
    },
  ];
}
