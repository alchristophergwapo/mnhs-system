import Barangay from "./Barangay";
import City from "./City";
import HouseNumber from "./HouseNumber";
import Province from "./Province";
import Street from "./Street";
import Subdivision from "./Subdivision";
import ZipCode from "./ZipCode";

export type AddressInputProps = {
  required?: boolean;
  target: "permanentAddress" | "temporaryAddress";
};

/**
 * Component for displaying and editing the addresses of a teacher.
 * It includes fields for the residential and permanent addresses.
 * @param {ContentProps<UserType>} props - The props for the component.
 * @example
 * <Address />
 */
export default function Address() {
  return (
    <div className="flex flex-col gap-4 my-2">
      <div className="text-[16px] font-bold uppercase">Permanent Address</div>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
        <HouseNumber target="permanentAddress" />
        <Street target="permanentAddress" />
        <Subdivision target="permanentAddress" />
        <Barangay target="permanentAddress" required />
        <City target="permanentAddress" required />
        <Province target="permanentAddress" required />
        <ZipCode target="permanentAddress" required />
      </div>
      <div className="text-[16px] font-bold uppercase">Residential Address</div>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
        <HouseNumber target="temporaryAddress" />
        <Street target="temporaryAddress" />
        <Subdivision target="temporaryAddress" />
        <Barangay target="temporaryAddress" />
        <City target="temporaryAddress" />
        <Province target="temporaryAddress" />
        <ZipCode target="temporaryAddress" />
      </div>
    </div>
  );
}
