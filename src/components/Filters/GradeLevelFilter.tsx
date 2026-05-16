import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import React, { memo, useCallback, useState } from "react";
import { useGetGradeLevelsQuery } from "@app/(pages)/(admin)/GradeLevelApi";

type GradeLevelFilterProps<T> = {
  gradeLvlId?: number | null;
  onChange: (gradeLvlId: number) => void;
};

/**
 * A React component that provides a dropdown filter for selecting a grade level.
 * It renders a button group where the main button displays the currently selected
 * grade level's name (or a default placeholder), and an arrow button that toggles
 * a dropdown menu (Popper) to allow the user to select a different grade level.
 *
 * @template T - A generic type extending `Record<string, any>`, representing the option objects. Must include at least `id` and `name` properties.
 * @param {GradeLevelFilterProps<T>} props - The props for the component.
 * @param {number} [props.gradeLvlId] - The ID of the currently selected grade level.
 * @param {function} props.onChange - Callback function triggered when a new grade level is selected. Receives the ID of the selected option.
 * @returns {React.ReactElement} The rendered GradeLevelFilter component.
 */
function GradeLevelFilter<T extends Record<string, any>>({
  gradeLvlId,
  onChange,
}: GradeLevelFilterProps<T>) {
  const { data: options } = useGetGradeLevelsQuery({
      query: "",
    });
  /**
   * Finds and stores the currently selected grade level object from the options array
   * by matching its `id` against the provided `gradeLvlId`.
   */
  const selectedGradeLevel = options?.find(
    (option) => option?.id === gradeLvlId,
  );
  
  /** 
   * State variable controlling the open/close visibility of the dropdown menu. 
   * @type {boolean}
   */
  const [open, setOpen] = useState(false);
  
  /** 
   * A ref attached to the ButtonGroup, used as the anchor element for the Popper dropdown.
   * @type {React.RefObject<HTMLDivElement>}
   */
  const anchorRef = React.useRef<HTMLDivElement>(null);

  /**
   * Toggles the open state of the type selection component.
   * Uses the previous state value to ensure a reliable state update.
   */
  const handleOpenTypeSelection = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

/**
 * Handles the selection of a type/item
 * @param ngLvlId - The ID of the selected item/type
 */
  const handleSelectType = useCallback((ngLvlId: number) => {
    onChange(ngLvlId); // Call the onChange callback with the selected ID
    setOpen(false);
  }, [onChange]); // Empty dependency array means this callback is memoized and won't change between renders

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        aria-label="Filter for teacher type"
        ref={anchorRef}
        color="inherit"
        sx={{ bgcolor: "white" }}
      >
        <Button sx={{ bgcolor: "white" }}>
          {gradeLvlId && selectedGradeLevel
            ? selectedGradeLevel?.name
            : "Grade level"}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          sx={{ bgcolor: "white" }}
          onClick={handleOpenTypeSelection}
        >
          <ArrowDropDownIcon sx={{ color: "black" }} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 10 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
              zIndex: 10,
            }}
          >
            <Paper elevation={2}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList id="split-button-menu">
                  {options?.map((option) => (
                    <MenuItem
                      key={option.id}
                      selected={option.id === gradeLvlId}
                      onClick={() => handleSelectType(option.id)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default memo(GradeLevelFilter);
