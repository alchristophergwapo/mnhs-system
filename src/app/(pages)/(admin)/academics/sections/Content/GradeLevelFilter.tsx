import { memo } from "react";
import BaseGradeLevelFilter from "@components/Filters/GradeLevelFilter";

type GradeLevelFilterProps = {
  gradeLvlId?: number;
  onChange: (gradeLvlId: number) => void;
};

function GradeLevelFilter({ gradeLvlId, onChange }: GradeLevelFilterProps) {

  return (
    <BaseGradeLevelFilter
      gradeLvlId={gradeLvlId}
      onChange={onChange}
    />
  );
}

export default memo(GradeLevelFilter);
