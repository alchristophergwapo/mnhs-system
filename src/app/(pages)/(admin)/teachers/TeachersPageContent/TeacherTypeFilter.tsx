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

type TeacherTypeFilterProps = {
  type: string;
  onChangeType: (type: string) => void;
};

/**
 * A React component that provides a dropdown filter for selecting teacher types.
 * Renders a split button group where the main section displays the currently
 * selected teacher type (or a default label), and the dropdown arrow opens
 * a popper menu to select a specific type.
 *
 * @param {TeacherTypeFilterProps} props - The component props.
 * @param {string} props.type - The currently selected teacher type key.
 * @param {function} props.onChangeType - Callback function invoked when a new teacher type is selected.
 * @returns {React.ReactElement} The rendered TeacherTypeFilter component.
 */
function TeacherTypeFilter({ type, onChangeType }: TeacherTypeFilterProps) {
  const [open, setOpen] = useState(false);
  const [anchorRef, setAnchorRef] = React.useState<HTMLDivElement>(null);
  const types = {
    advisory: "Advisory Teachers",
    "non-advisory": "Non-Advisory Teachers",
    ojt: "OJT Teachers",
  };

  /**
   * Toggles the open state of the type selection component.
   * This handler flips the current boolean state, opening the selection if it
   * is currently closed, and closing it if it is currently open.
   *
   * @returns {void}
   */
  const handleOpenTypeSelection = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  /**
   * Handles the selection of a type from a dropdown or list.
   *
   * @param {string} ntype - The newly selected type value.
   * @returns {void}
   */
  const handleSelectType = useCallback(
    (ntype: string) => {
      onChangeType(ntype);
      setOpen(false);
    },
    [onChangeType],
  );

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        aria-label="Filter for teacher type"
        ref={setAnchorRef}
        color="inherit"
        sx={{
          bgcolor: "white",
        }}
      >
        <Button sx={{ bgcolor: "inherit" }} className="text-black">
          {type ? types[type as keyof typeof types] : "Teacher Type"}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          sx={{ bgcolor: "inherit" }}
          onClick={handleOpenTypeSelection}
        >
          <ArrowDropDownIcon sx={{ color: "black" }} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 10 }}
        open={open}
        anchorEl={anchorRef}
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
                  {Object.keys(types).map((key) => (
                    <MenuItem
                      key={key}
                      selected={key === type}
                      onClick={() => handleSelectType(key)}
                    >
                      {types[key as keyof typeof types]}
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

export default memo(TeacherTypeFilter);
