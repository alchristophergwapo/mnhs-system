import Barangay from "./Barangay";
import City from "./City";
import HouseNumber from "./HouseNumber";
import Province from "./Province";
import Street from "./Street";
import Subdivision from "./Subdivision";
import ZipCode from "./ZipCode";

/**
 * A React functional component that renders a form layout for collecting
 * permanent and residential addresses. It utilizes a responsive grid
 * system to display various address-related input fields (House Number,
 * Street, Subdivision, Barangay, City, Province, and Zip Code) grouped
 * under "Permanent Address" and "Residential Address" sections.
 *
 * @returns {JSX.Element} The rendered address form component.
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
