import {
  useCreateSectionMutation,
  useGetSectionByIdQuery,
} from "@features/academics/sections/api/sections.api";
import { SectionsType } from "@features/academics/sections/api/sections.types";
import { useAppForm } from "@hooks/useTanstack";
import { useSnackbar } from "notistack";

/**
 * A custom hook to manage the creation and initialization of a section modal.
 * Handles form state, data fetching for existing sections, and the mutation
 * for creating a new section, along with success/error notifications.
 *
 * @param {number | null} id - The ID of the section to fetch for editing. 
 *                             If null, the form initializes with default empty values.
 * @returns {object} An object containing:
 *  - createSection {Function} - The mutation function to create a new section.
 *  - form {object} - The form instance managed by useAppForm, handling state and submission.
 *  - sectionData {SectionsType | undefined} - The fetched section data based on the provided ID.
 *  - isFetching {boolean} - Indicates if the section data is currently being fetched.
 *  - isSuccess {boolean} - Indicates if the section data was fetched successfully.
 */
function useCreateSectionModal(id: number | null) {
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
    isLoading,
    isSuccess,
  } = useGetSectionByIdQuery(id as number, {
    skip: !id,
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

  return { form, isLoading, isSuccess };
}

export default useCreateSectionModal;
