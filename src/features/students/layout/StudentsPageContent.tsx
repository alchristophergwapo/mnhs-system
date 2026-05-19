import { Fragment, SetStateAction } from "react";
import { SharedPropsType } from "@components/layouts/PageCardedWrapper";
import { UserType } from "@types";
import { GetStudentsApiArg } from "@features/students/api/students.types";
import { useStudentsTable } from "../hooks/useStudentsTable";
import StudentsTable from "../components/StudentsTable";
import StudentsTableToolbar from "../components/StudentsTable/StudentsTableToolbar";

export type StudentPageContentProps = Partial<SharedPropsType<UserType>> & {
  parameters: GetStudentsApiArg;
  setParameters: (parameters: SetStateAction<GetStudentsApiArg>) => void;
};

/**
 * Renders a table component with columns for the teacher's avatar, name, email, contact number, and gender.
 * The component also includes a pagination component and an actions column with edit and delete buttons.
 * @param {StudentPageContentProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered MaterialTable component.
 */
function StudentsPageContent(props: StudentPageContentProps) {
  const { parameters, setParameters } = props;
  const { handleChangeOptions } = useStudentsTable(parameters, setParameters);

  return (
    <Fragment>
      <StudentsTableToolbar
        parameters={parameters}
        onChangeOptions={handleChangeOptions}
      />
      <StudentsTable {...props} />
    </Fragment>
  );
}

export default StudentsPageContent;
