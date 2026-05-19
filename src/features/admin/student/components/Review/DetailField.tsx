interface DetailFieldProps {
  label: string;
  value: string | undefined | null;
  icon?: React.ReactNode;
}

// --- Helper component for data rows ---
function DetailField({ label, value, icon }: DetailFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-b-0">
      <dt className="flex items-center text-sm font-medium text-gray-500 w-full sm:w-1/3 mb-1 sm:mb-0">
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}
        {label}
      </dt>
      <dd className="text-sm font-semibold text-gray-900 w-full sm:w-2/3 wrap-break-word">
        {value || <span className="text-gray-400 italic">Not Provided</span>}
      </dd>
    </div>
  );
}

export default DetailField;
