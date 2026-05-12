import { memo } from "react";
import { useGetGradeLevelsQuery } from "../../GradeLevelApi";
import BaseGradeLevelFilter from "@components/Filters/GradeLevelFilter";

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
      onChangeType={onChangeType}
    />
  );
}

export default memo(GradeLevelFilter);
