import { memo } from "react";
import BaseGradeLevelFilter from "@components/Filters/GradeLevelFilter";
import { useGetGradeLevelsQuery } from "../../GradeLevelApi";

type GradeLevelFilterProps = {
  gradeLvlId?: number;
  onChangeType: (gradeLvlId: number) => void;
};

function GradeLevelFilter({ gradeLvlId, onChangeType }: GradeLevelFilterProps) {
  const { data: gradelevels } = useGetGradeLevelsQuery({
    query: "",
  });

  return (
    <BaseGradeLevelFilter
      options={gradelevels as Record<string, any>[]}
      gradeLvlId={gradeLvlId}
      onChange={onChangeType}
    />
  );
}

export default memo(GradeLevelFilter);
