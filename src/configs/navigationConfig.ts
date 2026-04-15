/**
 * Navigation configuration for the application
 * 
 * @type {Array}
 */
export const navigationConfig = [
  {
    id: "dashboard",
    title: "Dasboard",
    type: "item",
    url: "/dashboard",
    icon: "dashboard",
  },
  {
    id: "teachers",
    title: "Teachers",
    type: "group",
    children: [
      {
        id: "advisers",
        title: "Advisory Teachers",
        type: "item",
        icon: "group",
        url: "/teachers/advisers",
      },
      {
        id: "non-advisors",
        title: "Non-Advisory Teachers",
        type: "item",
        icon: "groups_2",
        url: "/teachers/non-advisory",
      },
      {
        id: "student-teachers",
        title: "Student Teachers",
        type: "item",
        icon: "co_present",
        url: "/teachers/ojt",
      },
    ],
  },
  {
    id: "students",
    title: "Students",
    type: "group",
    children: [
      {
        id: "grade7",
        title: "Grade VII",
        type: "item",
        url: "/students/grade7",
        icon: "groups_3"
      },
      {
        id: "grade8",
        title: "Grade VIII",
        type: "item",
        url: "/students/grade8",
        icon: "groups_3"
      },
      {
        id: "grade9",
        title: "Grade IX",
        type: "item",
        url: "/students/grade9",
        icon: "groups_3"
      },
      {
        id: "grade10",
        title: "Grade X",
        type: "item",
        url: "/students/grade10",
        icon: "school"
      },
      {
        id: "grade11",
        title: "Grade XI",
        type: "item",
        url: "/students/grade11",
        icon: "groups_3"
      },
      {
        id: "grade12",
        title: "Grade XII",
        type: "item",
        url: "/students/grade12",
        icon: "school"
      },
    ],
  },
];
