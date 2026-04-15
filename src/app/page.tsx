import { redirect } from "next/navigation";

/**
 * Redirects to the dashboard page if the route is /.
 * @returns {void} - Does not return anything
 */
export default function Home() {
  redirect ('/dashboard')
}
