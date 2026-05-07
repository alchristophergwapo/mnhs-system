import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import React, { memo, useState } from "react";

type TeacherTypeFilterProps = {
    type: string;
    onChangeType: (type: string) => void;
}

function TeacherTypeFilter({type, onChangeType}: TeacherTypeFilterProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const types = {
    advisory: "Advisory Teachers",
    "non-advisory": "Non-Advisory Teachers",
    ojt: "OJT Teachers",
  }

  const handleOpenTypeSelection = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSelectType = (ntype: string) => {
    onChangeType(ntype);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        aria-label="Filter for teacher type"
        ref={anchorRef}
        color="inherit"
        sx={{bgcolor: "white"}}
      >
        <Button sx={{bgcolor: "white"}}>{type ? types[type as keyof typeof types] : "Teacher Type"}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          sx={{bgcolor: "white"}}
          onClick={handleOpenTypeSelection}
        >
          <ArrowDropDownIcon />
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
