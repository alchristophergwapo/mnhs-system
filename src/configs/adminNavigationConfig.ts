/**
 * Navigation configuration for the application
 * for admin users
 * @type {Array}
 */
export const adminNavigationConfig = [
  {
    id: "dashboard",
    title: "Dasboard",
    type: "item",
    url: "/dashboard",
    icon: "dashboard",
  },
  {
    id: "students",
    title: "Students",
    type: "item",
    url: "/students",
    icon: "groups_3"
  },
  {
    id: "teachers",
    title: "Faculty",
    type: "item",
    icon: "group",
    url: "/teachers",
  },
  {
    id: "academics",
    title: "Academics",
    type: "group",
    icon: "group",
    children: [
      {
        id: "sections",
        title: "Sections",
        type: "item",
        url: "/academics/sections",
        icon: "group",
      },
    ]
  },
];
