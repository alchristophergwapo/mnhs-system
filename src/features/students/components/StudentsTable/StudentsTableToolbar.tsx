import GradeLevelFilter from "@components/Filters/GradeLevelFilter";
import { GetStudentsApiArg } from "@features/students/api/students.types";

/**
 * A toolbar component for the Students table, providing filtering and parameter controls.
 * Renders a flexbox container with reverse row direction, aligning filter controls to the right.
 * Currently includes a GradeLevelFilter to filter students by their grade level.
 * @param {Object} props - The component props.
 * @param {GetStudentsApiArg} props.parameters - The current API query parameters, used to set the initial state of the filters.
 * @param {function(string, string | number): void} props.onChangeOptions - Callback function triggered when a filter option changes. 
 * It receives the parameter key and the new value to update the parent component's state.
 * @returns {JSX.Element} The rendered toolbar component.
 */
function StudentsTableToolbar({
  parameters,
  onChangeOptions,
}: {
  parameters: GetStudentsApiArg;
  onChangeOptions: (key: string, value: string | number) => void;
}) {
  return (
    <div className="flex flex-row-reverse px-2 mt-2 gap-4">
      <GradeLevelFilter
        gradeLvlId={parameters?.gradeLvl}
        onChange={(gradeLvlId: number) =>
          onChangeOptions("gradeLvl", gradeLvlId)
        }
      />
    </div>
  );
}

export default StudentsTableToolbar;
