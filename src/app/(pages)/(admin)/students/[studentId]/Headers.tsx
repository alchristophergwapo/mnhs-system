import { SharedPropsType } from "@components/PageCardedWrapper";
import { UserType } from "../../teachers/_types";

/**
 * Properties for the Headers component, which displays the header section of the Non-Advisory Teachers page.
 */
type HeadersProps = Partial<SharedPropsType<UserType>>;

/**
 * Headers component for the Non-Advisory Teachers page.
 * @param props
 * @returns ReactNode
 */
export default function Headers(props: HeadersProps) {

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col text-white">
        <h1 className="text-2xl font-bold">New Student</h1>
      </div>
    </div>
  );
}
