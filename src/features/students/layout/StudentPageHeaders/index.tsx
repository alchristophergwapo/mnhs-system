import { amber, teal } from "@mui/material/colors";
import { SharedPropsType } from "@components/layouts/PageCardedWrapper";
import useNavigate from "@hooks/useNavigate";
import { PlusOne } from "@mui/icons-material";
import { UserType } from "../../../../app/(pages)/(admin)/teachers/_types";
import SearchStudent from "./components/SearchStudent";
import Button from "@components/ui/Button";
import { GetStudentsApiArg } from "@features/students/api/students.types";

/**
 * Properties for the Headers component, which displays the header section of the Non-Advisory Teachers page.
 */
type HeadersProps = Partial<SharedPropsType<UserType>> & {
  parameters: GetStudentsApiArg;
  setParameters: (parameters: GetStudentsApiArg) => void;
};

/**
 * Headers component for the Non-Advisory Teachers page.
 * @param props
 * @returns ReactNode
 */
function StudentsPageHeaders(props: HeadersProps) {
  const { total, parameters, isLoading = false, setParameters } = props;
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col text-white">
        <h1 className="text-2xl font-bold">Students</h1>
        <div>{total} students currently enrolled</div>
      </div>
      <div className="flex items-center gap-4">
        <SearchStudent
          query={parameters.q}
          onSearch={(q) => setParameters({ ...parameters, q })}
          isLoading={isLoading}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: amber[400],
            color: teal[900],
          }}
          size="large"
          onClick={() => navigate('/students/new')}
          endIcon={<PlusOne fontSize="small" />}
        >
          add student
        </Button>
      </div>
    </div>
  );
}

export default StudentsPageHeaders;
