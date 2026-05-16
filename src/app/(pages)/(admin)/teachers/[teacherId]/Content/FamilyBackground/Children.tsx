import Button from "@components/ui/Button";
import InputField from "../InputField";
import { Delete, PlusOne } from "@mui/icons-material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export type Child = {
  name?: string;
  birthDate?: Date | string;
};

/**
 * Component for inputting the teacher's children
 * @param {Child[]} value - The current value of the children
 * @param {(children: Child[]) => void} handleValueChange - The function to call when the value of the children changes
 */
function Children({
  value = [{ name: "", birthDate: "" }],
  handleValueChange,
}: {
  value?: Child[];
  handleValueChange: (children: Child[]) => void;
}) {
  // We use a state variable to store the children.
  // This is because we want to debounce the update of the children to avoid too many re-renders when the user is typing and the parents state are changing.
  const [children, setChildren] = useState(value);

  // Debounce the update of the children
  const handleUpdateChildren = useMemo(
    () => debounce((children: Child[]) => handleValueChange(children), 500),
    [],
  );

  /** 
   * Handle the update of the children
   * @param {number} index - The index of the child to update
   * @param {Child} child - The new or existing child
   */
  const handleUpdateChild = useCallback(
    (index?: number, child?: Child) => {
      const newChild: Child = child ?? { name: "", birthDate: "" };

      const updatedChildren =
        index === undefined
          ? [...children, newChild]
          : [
              ...children.slice(0, index),
              newChild,
              ...children.slice(index + 1),
            ];

      setChildren(updatedChildren);
      handleUpdateChildren(updatedChildren);
    },
    [children, handleUpdateChildren, setChildren],
  );

  /**
   * Removes a child from the children list at the given index
   * @param {number} index - The index of the child to remove
   */
  const handleRemoveChild = (index: number) => {
    const updatedChildren = [...children];
    updatedChildren.splice(index, 1);
    setChildren(updatedChildren);
    handleUpdateChildren(updatedChildren);
  };

  // Clean up the debounced function on unmount
  useEffect(() => {
    return () => handleUpdateChildren.cancel();
  }, [handleUpdateChildren]);

  return (
    <>
      <div className="text-[16px] font-bold uppercase">Children</div>
      {children.map((child: Child, index: number) => (
        <div key={index} className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <InputField
              target="name"
              value={child?.name}
              onValueChange={(field: string, value: string | any) =>
                handleUpdateChild(index, { ...child, [field]: value })
              }
              label="Name"
            />
          </div>
          <div className="col-span-2">
            <InputField
              target="birthDate"
              value={child?.birthDate}
              onValueChange={(field: string, value: string | any) =>
                handleUpdateChild(index, { ...child, [field]: value })
              }
              label="Birth Date"
              type="date"
            />
          </div>
          <div className="col-span-1">
            <Button
              startIcon={<Delete />}
              onClick={() => handleRemoveChild(index)}
              color="error"
            >
              remove child
            </Button>
          </div>
        </div>
      ))}
      <div className="flex flex-row-reverse">
        <Button startIcon={<PlusOne />} onClick={() => handleUpdateChild()}>
          add
        </Button>
      </div>
    </>
  );
}

export default memo(Children);
