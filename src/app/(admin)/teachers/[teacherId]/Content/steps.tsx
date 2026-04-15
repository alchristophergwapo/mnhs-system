import { ContentProps, StepsType } from "@/src/components/Stepper";
import PositionAndPersonalInformation from "./PersonalInformation";
import { Badge, CastForEducation, LocationCity, People, Security, Work } from "@mui/icons-material";
import { TeacherType } from "../../TeachersApi";
import { lazy } from "react";

/**
 * Returns an array of steps for the teacher form.
 * Each step has a label, description, content, and icon.
 * The content is a function that takes a ContentProps<TeacherType> object as an argument and returns a JSX element.
 * The icon is a JSX element that is displayed in the stepper.
 * @returns {StepsType<TeacherType>[]} - An array of steps for the teacher form to be used in the Stepper component.
 */
export default function getFormSteps(): StepsType<TeacherType>[] {
  return [
    {
      label: "Position and Personal Information",
      description: "Provide your personal information.",
      content: (props: ContentProps<TeacherType>) => (
        <PositionAndPersonalInformation {...props} />
      ),
      icon: <Badge />,
    },
    {
      label: "Address",
      description: "Provide your address information",
      content: (props: ContentProps<TeacherType>) => (
        <div>Address</div>
      ),
      icon: <LocationCity />,
    },
    {
      label: "Family Background",
      description: "Fill out your family/guardians information",
      content: (props: ContentProps<TeacherType>) => (
        <div>Family background</div>
      ),
      icon: <People />,
    },
    {
      label: "Education",
      description: "Provide your educational background",
      content: (props: ContentProps<TeacherType>) => (
        <div>Educational background</div>
      ),
      icon: <CastForEducation />,
    },
    {
      label: "Experience",
      description: "Provide your teaching experience",
      content: (props: ContentProps<TeacherType>) => (
        <div>Experience</div>
      ),
      icon: <Work />,
    },
    {
      label: "Background Information",
      description: "Answer the following truthfully for background check",
      content: (props: ContentProps<TeacherType>) => (
        <div>Background Information</div>
      ),
      icon: <Security />,
    },
  ];
}
