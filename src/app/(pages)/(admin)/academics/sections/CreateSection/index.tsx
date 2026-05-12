import { memo } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import GradeLevel from "./GradeLevel";
import Input from "@components/Input";
import AssignAdviser from "./AssignAdviser";
import {
  SectionsType,
  useCreateSectionMutation,
  useGetSectionByIdQuery,
} from "../SectionsApi";
import { useAppForm } from "@/src/hooks/useTanstack";
import z from "zod";
import SectionPreview from "./SectionPreview";
import { useSnackbar } from "notistack";
import Button from "@components/Button";
import Loading from "@components/Loading";

function CreateSection({
  open,
  id,
  handleClose,
}: {
  open: boolean;
  id: number | null;
  handleClose: () => void;
}) {
  const [createSection] = useCreateSectionMutation();
  const { enqueueSnackbar } = useSnackbar();
  const defaultSectionDetails: Partial<SectionsType> = {
    gradeLevel: { id: null, name: "", gradeLevelNumber: null },
    name: "",
    maxCapacity: null,
    adviser: null,
  };
  const {
    data: sectionData,
    isFetching,
    isSuccess,
  } = useGetSectionByIdQuery(id as number, {
    skip: !id,
  });

  console.log("Section data for editing:", {
    sectionData,
    isFetching,
    isSuccess,
  });
  const form = useAppForm({
    defaultValues: id ? sectionData : defaultSectionDetails,
    onSubmit: async (values) => {
      createSection(values.value)
        .unwrap()
        .then(() => {
          form.reset();
          enqueueSnackbar("Section created successfully!", {
            variant: "success",
          });
        })
        .catch(() => {
          enqueueSnackbar("An error occurred while creating the section.", {
            variant: "error",
          });
        });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {id && (isFetching || !isSuccess) ? (
        <Loading />
      ) : (
        <form.AppForm>
          <DialogTitle>Create Section</DialogTitle>
          <Divider />
          <DialogContent>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <div>
                  <DialogContentText
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    Basic Information
                  </DialogContentText>
                  <div className="mt-2 flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <GradeLevel />
                      </div>
                      <div className="col-span-2">
                        <form.Field
                          name={"name" as never}
                          validators={{
                            onChangeAsyncDebounceMs: 300,
                            onChangeAsync: z
                              .string()
                              .nonempty("Section name is required")
                              .max(
                                20,
                                "Section name must be no more than 20 characters",
                              ) as any,
                          }}
                          children={(field) => (
                            <Input
                              label="Section Name"
                              placeholder="e.g., Jasmine, Rose"
                              name={field.name}
                              required
                              value={field.state.value || ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value as any)
                              }
                              error={field.state.meta.errors.length > 0}
                              errors={field.state.meta.errors}
                            />
                          )}
                        />
                      </div>
                      <div className="col-span-1">
                        <form.Field
                          name={"maxCapacity" as never}
                          validators={{
                            onChangeAsyncDebounceMs: 300,
                            onChangeAsync: z.coerce
                              .number()
                              .min(1, "Max capacity must be a positive number")
                              .max(50, "Max capacity must be no more than 50")
                              .nonoptional("Max capacity is required") as any,
                          }}
                          children={(field) => (
                            <Input
                              label="Max capacity"
                              placeholder="e.g., 30"
                              required
                              value={field.state.value || ""}
                              onChange={(e) =>
                                field.handleChange(
                                  Number(e.target.value) as any,
                                )
                              }
                              error={field.state.meta.errors.length > 0}
                              errors={field.state.meta.errors}
                            />
                          )}
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 gap-2 flex flex-col">
                  <DialogContentText
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    Configuration & Details
                  </DialogContentText>
                  <AssignAdviser />
                </div>
              </div>
              <div className="col-span-2">
                <SectionPreview />
              </div>
            </div>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ color: "black" }}
              onClick={handleClose}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={form.handleSubmit}
            >
              create section
            </Button>
          </DialogActions>
        </form.AppForm>
      )}
    </Dialog>
  );
}

export default memo(CreateSection);
