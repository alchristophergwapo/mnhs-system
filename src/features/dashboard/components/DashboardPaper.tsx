import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import clsx from "clsx";

type DashboardPaperProps = PaperProps & {
  title?: string;
};

/**
 * A reusable wrapper component that provides a consistent layout for dashboard cards.
 * It utilizes the Material-UI `Paper` component along with Tailwind CSS for styling,
 * rendering an optional title and the provided children within a flexbox column layout.
 *
 * @param {DashboardPaperProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the paper container.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the root Paper component.
 * @param {string} [props.title] - Optional title text displayed at the top of the paper. If provided, it renders as an `h6` Typography.
 * @param {object} props.rest - Additional props spread onto the underlying Material-UI `Paper` component (e.g., `elevation`, `sx`).
 * @returns {JSX.Element} The rendered DashboardPaper component.
 */
function DashboardPaper({
  children,
  className,
  title,
  ...rest
}: DashboardPaperProps) {
  return (
    <Paper
      className={clsx("w-full h-full flex flex-col gap-1 p-4 ", className)}
      {...rest}
    >
      {title && (
        <Typography
          variant="h6"
          className=" text-xl font-semibold tracking-tight text-zinc-50! dark:text-black!"
        >
          {title}
        </Typography>
      )}
      <div className="w-full">
        {children}
      </div>
    </Paper>
  );
}

export default DashboardPaper;
