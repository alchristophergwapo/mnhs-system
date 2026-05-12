import { memo } from "react";
import BaseGradeLevelFilter from "@components/Filters/GradeLevelFilter";
import { useGetGradeLevelsQuery } from "../../../GradeLevelApi";

type GradeLevelFilterProps = {
  gradeLvlId?: number;
  onChange: (gradeLvlId: number) => void;
};

function GradeLevelFilter({ gradeLvlId, onChange }: GradeLevelFilterProps) {
  const { data: gradelevels } = useGetGradeLevelsQuery({
    query: "",
  });

  return (
    <BaseGradeLevelFilter
      options={gradelevels as Record<string, any>[]}
      gradeLvlId={gradeLvlId}
      onChange={onChange}
    />
  );
}

export default memo(GradeLevelFilter);
