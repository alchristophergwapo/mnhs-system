import Button from "@mui/material/Button";
import { amber, teal } from "@mui/material/colors";
import { GetTeachersApiArg, TeacherType } from "../../TeachersApi";
import SearchTeacher from "./SearchTeacher";
import { SharedPropsType } from "@/src/components/PageWrapper";
import useNavigate from "@/src/hooks/useNavigate";

/**
 * Properties for the Headers component, which displays the header section of the Non-Advisory Teachers page.
 */
type HeadersProps = Partial<SharedPropsType<TeacherType>> & {
  options: GetTeachersApiArg;
  setOptions: (options: GetTeachersApiArg) => void;
};

/**
 * Headers component for the Non-Advisory Teachers page.
 * @param props
 * @returns ReactNode
 */
export default function Headers(props: HeadersProps) {
  const { options, isLoading, setOptions } = props;
  const navigate = useNavigate();
  console.log("Rendering Headers");

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Non-Advisory Teachers</h1>
        <div>Teachers with no advisory responsibilities</div>
      </div>
      <div className="flex items-center gap-4">
        <SearchTeacher
          query={options.q}
          onSearch={(query: string) => setOptions({...options, q: query})}
          isLoading={isLoading || false}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: amber[400],
            color: teal[900],
          }}
          size="large"
          onClick={() => navigate('/teachers/new')}
        >
          Add Teacher
        </Button>
      </div>
    </div>
  );
}
