import { StepsType } from "@components/Stepper";
import { lazy } from "react";
const PositionAndPersonalInformation = lazy(
  () => import("./PersonalInformation"),
);
import { Badge, LocationCity, People } from "@mui/icons-material";
import { UserType } from "../../_types";
const Address = lazy(() => import("./Address"));
// const FamilyBackground = lazy(() => import("./FamilyBackground"));

/**
 * Returns an array of steps for the teacher form.
 * Each step has a label, description, content, and icon.
 * The content is a function that takes a ContentProps<UserType> object as an argument and returns a JSX element.
 * The icon is a JSX element that is displayed in the stepper.
 * @returns {StepsType<UserType>[]} - An array of steps for the teacher form to be used in the Stepper component.
 */
export default function getFormSteps(): StepsType<UserType>[] {
  return [
    {
      label: "Position and Personal Information",
      description: "Provide your personal information.",
      fields: [
        "position",
        "licenseNumber",
        "licenseExpiryDate",
        "lastName",
        "firstName",
        "middleName",
        "nameExtension",
        "dateOfBirth",
        "placeOfBirth",
        "telephoneNumber",
        "contactNumber",
        "email",
        "gender",
        "civilStatus",
        "civilStatusOther",
        "citizenship.filipino",
        "citizenship.dualCitizenship",
        "citizenship.dualCitizenshipBy",
        "citizenship.countryOfDualCitizenship",
        "height",
        "weight",
        "bloodType",
        "benefits.agencyEmployeeNumber",
      ],
      content: () => <PositionAndPersonalInformation />,
      icon: <Badge />,
    },
    {
      label: "Address",
      description: "Provide your address information",
      content: () => <Address />,
      icon: <LocationCity />,
    },
    // {
    //   label: "Family Background",
    //   description: "Fill out your family/guardians information",
    //   content: (props: ContentProps<UserType>) => (
    //     <FamilyBackground {...props} />
    //   ),
    //   icon: <People />,
    // },
    // {
    //   label: "Education",
    //   description: "Provide your educational background",
    //   content: (props: ContentProps<UserType>) => (
    //     <EducationalBackground {...props} />
    //   ),
    //   icon: <CastForEducation />,
    // },
    // {
    //   label: "Experience",
    //   description: "Provide your teaching experience",
    //   content: (props: ContentProps<UserType>) => (
    //     <Experience {...props} />
    //   ),
    //   icon: <Work />,
    // },
    // {
    //   label: "Background Information",
    //   description: "Answer the following truthfully for background check",
    //   content: (props: ContentProps<UserType>) => (
    //     <BackgroundInformation {...props} />
    //   ),
    //   icon: <Security />,
    // },
  ];
}
