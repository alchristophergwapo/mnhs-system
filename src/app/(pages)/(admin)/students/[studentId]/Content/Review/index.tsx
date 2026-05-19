import { JSX, useState } from "react";
import Typography from "@mui/material/Typography";
import { useFormContext } from "@hooks/useTanstack";
import DetailField from "./DetailField";
import {
  AddressType,
  CitizenshipType,
  EnrollmentBackgroundType,
  EnrollmentType,
  FamilyType,
  GradeLevelType,
  StudentType,
  UserType,
} from "@types";
import {
  AttachFileOutlined,
  CalendarViewDaySharp,
  CloseOutlined,
  Group,
  LocationPin,
  Person,
  VisibilityOutlined,
} from "@mui/icons-material";
import ImagePreview from "../Documents/ImagePreview";

function Review(): JSX.Element {
  const form = useFormContext();
  const values = form.state.values;

  const user = values.user as UserType;
  const student = values.student as StudentType;
  const mother = values.mother as FamilyType;
  const father = values.father as FamilyType;
  const guardian = values.guardian as FamilyType;
  const citizenship = values.citizenship as CitizenshipType;
  const enrollment = values.enrollment as EnrollmentType;
  const enrollmentBackground =
    values.enrollmentBackground as EnrollmentBackgroundType;
  const permanentAddress = values.permanentAddress as AddressType;
  const residentialAddress = values.residentialAddress as AddressType;
  const gradeLevel = values.gradeLevel as GradeLevelType;
  const [selectedDocUrl, setSelectedDocUrl] = useState<string | null>(null);
  const schoolYear = new Date().getFullYear() + "-" + (new Date().getFullYear() + 1);

  const openDoc = (url: string) => {
    setSelectedDocUrl(url);
    document.body.style.overflow = "hidden"; // Prevent scrolling bg
  };

  const closeDoc = () => {
    setSelectedDocUrl(null);
    document.body.style.overflow = "unset";
  };

  const getResidentialAddress = () => {
    const {
      houseNumber,
      street,
      subdivision,
      barangay,
      city,
      province,
      zipCode,
    } = residentialAddress || {};
    if (
      !houseNumber &&
      !street &&
      !subdivision &&
      !barangay &&
      !city &&
      !province &&
      !zipCode
    ) {
      return null;
    }
    return `${residentialAddress?.houseNumber || ""} ${residentialAddress?.street || ""} ${residentialAddress?.subdivision || ""} ${residentialAddress?.barangay || ""}, ${residentialAddress?.city || ""}, ${residentialAddress?.province || ""} ${residentialAddress?.zipCode || ""}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-8 border-b pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">
            Review Enrollment Details
          </h1>
          <Typography className="text-gray-600 mt-1">
            Please verify all student information and uploaded documents before
            finalized submission.
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            Pending Final Review
          </span>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 shadow-xl rounded-xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <span className="text-[15rem] font-serif font-black">CFA</span>
        </div>

        <div className="text-center mb-10 pb-6 border-b-2 border-dashed border-gray-200">
          <Typography className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Registry of Admissions
          </Typography>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">
            Enrollment Record
          </h2>
          <Typography className="text-lg text-gray-700 mt-1 font-medium">
            School Name
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Section I: Student Information */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                <Person className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  I. Student Information
                </h3>
              </div>
              <dl className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                <DetailField
                  label="Full Name"
                  value={`${user?.lastName}, ${user?.firstName} ${user?.middleName || ""} ${user?.nameExtension || ""}`}
                />
                <DetailField
                  label="Date of Birth"
                  value={user.dateOfBirth as string}
                  icon={<CalendarViewDaySharp className="w-4 h-4" />}
                />
                <DetailField label="Sex" value={user.gender} />
                <DetailField
                  label="Place of Birth"
                  value={user.placeOfBirth}
                  icon={<LocationPin className="w-4 h-4" />}
                />
                <DetailField
                  label="Mother Tongue"
                  value={(student.motherTongue as string) || ""}
                />
                <DetailField label="Religion" value={user.religion as string} />
                <DetailField
                  label="Contact number"
                  value={user.contactNumber}
                />
                <DetailField
                  label="Nationality"
                  value={
                    citizenship.filipino
                      ? "Filipino"
                      : citizenship.dualCitizenship
                        ? citizenship.countryOfDualCitizenship
                        : null
                  }
                />
              </dl>
            </section>

            {/* Section II: Student Address */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                <LocationPin className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  II. Student Address
                </h3>
              </div>
              <dl className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                <DetailField
                  label="Permanent Address"
                  value={`${permanentAddress.houseNumber || ""} ${permanentAddress.street || ""} ${permanentAddress.subdivision || ""} ${permanentAddress.barangay}, ${permanentAddress.city}, ${permanentAddress.province} ${permanentAddress.zipCode}`}
                  icon={<LocationPin className="w-4 h-4" />}
                />
                <DetailField
                  label="Residential Address"
                  value={getResidentialAddress()}
                  icon={<LocationPin className="w-4 h-4" />}
                />
              </dl>
            </section>

            {/* Section III: Parent/Guardian */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                <Group className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  III. Parent / Guardian Details
                </h3>
              </div>
              <dl className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <DetailField
                  label="Mother's Name (Maiden)"
                  value={`${mother.maidenName || ""}-${mother.lastName}, ${mother.firstName} ${mother.middleName || ""}`}
                />
                <DetailField
                  label="Father's Full Name"
                  value={`${father.lastName}, ${father.firstName} ${father.middleName || ""}`}
                />
                <DetailField
                  label="Guardian"
                  value={
                    guardian
                      ? `${guardian?.lastName || ""}, ${guardian?.firstName || ""} ${guardian?.middleName || ""}`
                      : null
                  }
                />
              </dl>
            </section>

            {/* Section IV: Academic Status */}
            {(values.isSeniorHigh || values.isTransferee) && (
              <section>
                <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                  <Group className="w-5 h-5 text-sky-700" />
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    IV. Senior High / Balik-Aral Details
                  </h3>
                </div>
                <dl className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <DetailField label="Semester" value={enrollment.semester} />
                  <DetailField
                    label="Strand"
                    value={String(enrollment.courseId)}
                  />
                  {values.isTransferee && (
                    <>
                      <DetailField
                        label="Last Grade Level Finished"
                        value={String(enrollmentBackground.lastGradeLevel)}
                      />
                      <DetailField
                        label="Last School Year Attended"
                        value={enrollmentBackground.lastSchoolYear}
                      />
                      <DetailField
                        label="Last School ID"
                        value={enrollmentBackground.lastSchoolID}
                      />
                      <DetailField
                        label="Last School Attended"
                        value={enrollmentBackground.lastSchoolName}
                      />
                      <DetailField
                        label="Last School Address"
                        value={enrollmentBackground.lastSchoolAddress}
                      />
                    </>
                  )}
                </dl>
              </section>
            )}
          </div>

          {/* Column 2: Status & Academic (30% width on large screens) */}
          <div className="space-y-8">
            <section className="bg-gray-900 text-white p-6 rounded-xl shadow-inner">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-bold">
                Academic Status
              </h4>
              <div className="space-y-4">
                <div>
                  <Typography className="text-sm text-gray-400">
                    School Year
                  </Typography>
                  <p className="text-xl font-bold">{schoolYear}</p>
                </div>
                <div>
                  <Typography className="text-sm text-gray-400">
                    Incoming Grade Level
                  </Typography>
                  <p className="text-xl font-bold">{gradeLevel.gradeLevelNumber}</p>
                </div>
              </div>
            </section>

            {/* Verification Footer (Certificate Style) */}
            <section className="border-t-2 border-gray-100 pt-6 mt-6">
              <div className="text-center space-y-4">
                <Typography className="text-sm text-gray-600 italic">
                  I, the Admin Registrar, have verified the above details
                  against submitted legal documents.
                </Typography>
                <div className="w-40 h-1 bg-gray-200 mx-auto rounded"></div>
                <Typography className="text-sm font-semibold text-gray-800">
                  CFA Academy Registrar
                </Typography>
                <Typography className="text-xs text-gray-500">
                  Date Verified:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* --- END OF "CERTIFICATE" --- */}

      {/* DOCUMENT REVIEW SECTION (Separate from the certificate layout) */}
      <div className="mt-12 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
          <AttachFileOutlined className="w-6 h-6 text-sky-700" />
          <h3 className="text-xl font-bold text-gray-950 tracking-tight">
            Required Documents Review
          </h3>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition hover:shadow-md hover:border-sky-300">
            {/* Document Preview (Image Thumb) */}
            {typeof enrollment.cardImage === "string" ? (
              <div className="aspect-4/3 overflow-hidden bg-gray-200">
                <img
                  src={enrollment.cardImage}
                  alt="Card image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="aspect-4/3 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
                <ImagePreview file={enrollment.cardImage} />
              </div>
            )}

            {/* Document Details Overlay/Footer */}
            <div className="p-4 flex items-center justify-between bg-white border-t border-gray-100">
              <div>
                <Typography className="text-sm font-semibold text-gray-900 truncate group-hover:text-sky-800">
                  Card image
                </Typography>
              </div>
              <button
                onClick={() => {
                  if (typeof enrollment.cardImage === "string")
                    openDoc(enrollment.cardImage);
                }}
                className="p-2 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 transition"
                title={`View Card image`}
              >
                <VisibilityOutlined className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY STEPPER FOOTER (Navigation) */}
      {/* <div className="sticky bottom-0 left-0 right-0 mt-12 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-5 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-2xl z-40">
        <div className="flex justify-end items-center max-w-7xl mx-auto">
          <div className="flex gap-3">
            <button className="px-6 py-2.5 text-sm font-semibold text-sky-800 bg-sky-50 rounded-lg hover:bg-sky-100 transition">
              Save as Draft
            </button>
          </div>
        </div>
      </div> */}

      {/* --- DOCUMENT IMAGE MODAL --- */}
      {selectedDocUrl && (
        <div
          className="fixed inset-0 bg-black/80 z-100 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeDoc}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-2xl p-2 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDoc}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/70 text-gray-800 hover:bg-white z-10"
            >
              <CloseOutlined className="w-6 h-6" />
            </button>
            <img
              src={selectedDocUrl}
              alt="Document Full View"
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
