/**
 * Headers component for the Non-Advisory Teachers page.
 * @param props
 * @returns ReactNode
 */
function StudentPageHeader() {

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col text-white">
        <h1 className="text-2xl font-bold">New Student</h1>
      </div>
    </div>
  );
}

export default StudentPageHeader;
