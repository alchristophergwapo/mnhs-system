import { redirect } from "next/navigation";

/**
 * Redirects the user to the dashboard page.
 * This function acts as a default route handler for the admin page,
 * immediately navigating users to the '/dashboard' route.
 *
 * @returns {never} This function never reaches the caller as it throws a redirect response.
 */
export default function AdminPage() {
    return redirect('/dashboard')
}
