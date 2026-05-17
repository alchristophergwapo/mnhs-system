/**
 * @jest-environment jsdom
 */

jest.mock("next-auth", () => ({
  __esModule: true,
  auth: jest.fn(),
  default: jest.fn(),
}));

jest.mock("next-auth/jwt", () => ({
  __esModule: true,
  getToken: jest.fn(),
}));

jest.mock("@/auth", () => ({
  __esModule: true,
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock the getUserById function
jest.mock("@server/services/userService", () => ({
  getUserById: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import DashboardPage from "./layout/DashboardPage";
import { auth } from "@/auth";
import { getUserById } from "@server/services/userService";

describe("Dasboard page", () => {
  const mockUser = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should render welcome message with user first name", async () => {
    // Mock auth to return a session
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "1" },
    });

    // Mock getUserById to return a user
    (getUserById as jest.Mock).mockResolvedValue(mockUser);

    // Render the component
    render(await DashboardPage());

    // Check if welcome message is rendered with correct first name
    expect(
      screen.getByText(`Welcome back, ${mockUser.firstName}!`),
    ).toBeInTheDocument();
  });

  it("should render loading state for Suspense components", async () => {
    // Mock auth to return a session
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "1" },
    });

    // Mock getUserById to return a user
    (getUserById as jest.Mock).mockResolvedValue(mockUser);

    // Render the component
    render(await DashboardPage());

    // Check if loading state is rendered
    const loadingElements = screen.getAllByText("Loading...");
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it("should handle missing session gracefully", async () => {
    // Mock auth to return null (no session)
    (auth as jest.Mock).mockResolvedValue(null);

    // Mock getUserById to return null
    (getUserById as jest.Mock).mockResolvedValue(null);

    // Render the component
    render(await DashboardPage());

    // Check if it renders without crashing
    expect(screen.getByText("Welcome back, Admin!")).toBeInTheDocument();
  });

  it("should handle user with no first name", async () => {
    // Mock auth to return a session
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "1" },
    });

    // Mock getUserById to return a user without first name
    (getUserById as jest.Mock).mockResolvedValue({
      ...mockUser,
      firstName: undefined,
    });

    // Render the component
    render(await DashboardPage());

    // Check if it renders with empty first name
    expect(screen.getByText("Welcome back, Admin!")).toBeInTheDocument();
  });
});
