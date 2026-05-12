/**
 * Navigation configuration for the application
 * for students
 * @type {Array}
 */
export const studentNavigationConfig = [
  {
    id: "dashboard",
    title: "Dasboard",
    type: "item",
    url: "/student/dashboard",
    icon: "dashboard",
  },
  {
    id: "academics",
    title: "Academics",
    type: "group",
    children: [
      {
        id: "courses",
        title: "Subjects",
        type: "item",
        icon: "menu_book",
        url: "/student/academics/subjects",
      },
      {
        id: "grades",
        title: "Grades",
        type: "item",
        icon: "quiz",
        url: "/student/academics/grades",
      },
      {
        id: "schedules",
        title: "Schedules",
        type: "item",
        url: "/student/academics/schedules",
        icon: "schedule",
      },
    ],
  },
];
