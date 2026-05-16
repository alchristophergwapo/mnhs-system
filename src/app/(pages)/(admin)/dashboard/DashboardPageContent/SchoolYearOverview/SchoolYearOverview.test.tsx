/**
 * @jest-environment jsdom
 */

jest.mock("@lib/prisma", () => ({
  __esModule: true,
  default: {
    enrollment: {
      count: jest.fn(),
    },
    teacher: {
      count: jest.fn(),
    },
  },
}));

import { render, screen } from "@testing-library/react";
import SchoolYearOverview from ".";
import prisma from "@lib/prisma";

describe("School Year Overview component", () => {
  const totalTransferStudents = 4;
  const totalTeachers = 10;
  const totalNewTeachers = 2;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should render title 'School Year Overview'", async () => {
    render(await SchoolYearOverview());

    // Check if the title is rendered
    expect(screen.getByText("School Year Overview")).toBeInTheDocument();
  });

  it("should render loading state for Suspense components", async () => {
    // Render the component
    render(await SchoolYearOverview());

    // Check if loading state is rendered
    const loadingElements = screen.getAllByText("Loading...");
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it("should render transfer students card", async () => {
    // Mock the prisma enrollment count function to return a value
    (prisma.enrollment.count as jest.Mock).mockResolvedValue(
      totalTransferStudents,
    );

    render(await SchoolYearOverview());

    // Check if the component renders transfer students title and the correct number of transfer students
    expect(screen.getByText("Transfer Students")).toBeInTheDocument();
    expect(
      screen.getByText(totalTransferStudents.toString()),
    ).toBeInTheDocument();
  });

  it("should render teachers card", async () => {
    render(await SchoolYearOverview());

    expect(screen.getByText("Teachers")).toBeInTheDocument();
  });

  it("should render teachers card", async () => {
    // Mock the prisma teacher count function to return a value
    (prisma.teacher.count as jest.Mock).mockResolvedValue(totalTeachers);

    render(await SchoolYearOverview());

    // Check if the component renders the correct number of teachers
    expect(screen.getByText(totalTeachers.toString())).toBeInTheDocument();
  });

  it("should render teachers card", async () => {
    // Mock the prisma teacher count function to return a value
    (prisma.teacher.count as jest.Mock).mockResolvedValue(totalNewTeachers);

    render(await SchoolYearOverview());

    // Check if the component renders the correct number of new teachers
    expect(
      screen.getByText(`+${totalNewTeachers.toString()} new staff(s)`),
    ).toBeInTheDocument();
  });

  it("should render upcoming school events card", async() => {
    render(await SchoolYearOverview());

    expect(screen.getByText("Upcoming School Events")).toBeInTheDocument();
  })
});
