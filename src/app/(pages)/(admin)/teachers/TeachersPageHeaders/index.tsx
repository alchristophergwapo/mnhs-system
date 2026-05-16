import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import { GetTeachersApiArg } from "../TeachersApi";
import SearchTeacher from "./SearchTeacher";
import { SharedPropsType } from "@components/PageCardedWrapper";
import useNavigate from "@hooks/useNavigate";
import { UserType } from "../_types";
import { PlusOne } from "@mui/icons-material";

/**
 * Properties for the Headers component, which displays the header section of the Non-Advisory Teachers page.
 */
type HeadersProps = Partial<SharedPropsType<UserType>> & {
  parameters: GetTeachersApiArg;
  setParameters: (parameters: GetTeachersApiArg) => void;
};

/**
 * Headers component for the Non-Advisory Teachers page.
 * @param props
 * @returns ReactNode
 */
export default function Headers(props: HeadersProps) {
  const { parameters, isLoading, setParameters } = props;
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col text-white">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <div>List of teachers</div>
      </div>
      <div className="flex items-center gap-4">
        <SearchTeacher
          query={parameters.q}
          onSearch={(query: string) => setParameters({...parameters, q: query})}
          isLoading={isLoading || false}
        />
        <Button
          variant="contained"
          className="bg-[#00F5D4] dark:bg-amber-400"
          sx={{
            color: teal[900],
          }}
          size="large"
          onClick={() => navigate('/teachers/new')}
          endIcon={<PlusOne fontSize="small" color="inherit" sx={{ color: theme => theme.palette.mode === 'dark' ? "black": "white" }} />}
        >
          Add Teacher
        </Button>
      </div>
    </div>
  );
}
