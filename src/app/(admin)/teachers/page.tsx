import { redirect } from "next/navigation";

/**
 * Redirects to /teachers/advisers
 * @returns {void} - Does not return anything
 */
export default function Teachers() {
  redirect("/teachers/advisers");
}
