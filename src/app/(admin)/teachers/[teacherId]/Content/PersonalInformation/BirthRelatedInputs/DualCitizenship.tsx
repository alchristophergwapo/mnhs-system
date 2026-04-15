import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioSelect from "@/src/components/RadioSelect";
import InputField from "../../InputField";

type DualCitizenshipProps = {
  value: any;
  handleChangeCitizenshipBy: (t: string | any, v: string | any) => void;
  onValueChange: (t: string | any, v: string | any) => void;
};

/**
 * A component that renders a radio group with a label and children.
 * It accepts a label, a boolean indicating whether the radio group should be rendered in a row, a default value, a value, and an onChange function.
 * The children should be Radio components.
 * @param {DualCitizenshipProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * const target = "dualCitizenship";
 * const value = { dualCitizenshipBy: "By birth", countryOfDualCitizenship: "United States" };
 * const handleChangeCitizenshipBy = (t: string | any, v: string | any) => console.log(`${t}: ${v}`);
 * const handleValueChange = (t: string | any, v: string | any) => console.log(`${t}: ${v}`);
 * <DualCitizenship
 *   target={target}
 *   value={value}
 *   handleChangeCitizenshipBy={handleChangeCitizenshipBy}
 *   onValueChange={handleValueChange}
 * />
 */
export default function DualCitizenship(props: DualCitizenshipProps) {
  const { value, handleChangeCitizenshipBy, onValueChange } = props;

  return (
    <div className="ml-26">
      <RadioSelect
        label="Gender at birth"
        onChange={handleChangeCitizenshipBy}
        value={value.dualCitizenshipBy}
      >
        <FormControlLabel
          value="By birth"
          control={<Radio />}
          label="By birth"
        />
        <FormControlLabel
          value="By naturalization"
          control={<Radio />}
          label="By naturalization"
        />
      </RadioSelect>
      <InputField
        target="citizenship"
        value={value?.countryOfDualCitizenship}
        onValueChange={(t: string | any, v: string | any) =>
          onValueChange("countryOfDualCitizenship", v)
        }
        label="Please indicate the country"
      />
    </div>
  );
}
