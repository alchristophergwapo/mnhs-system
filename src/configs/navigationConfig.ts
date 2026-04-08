export const navigationConfig = [
    {
        id: "dashboard",
        title: 'Dasboard',
        type: "item",
        url: "/dashboard",
        icon: "dashboard"
    },
    {
        id: "teachers",
        title: "Teachers",
        type: "group",
        children: [
            {
                id: "non-advisors",
                title: "Non-Advisory Teachers",
                type: "collapse",
                icon: "groups_2",
                children: [
                    {
                        id: "grade7",
                        title: "Grade VII",
                        type: "item",
                        url: "/teachers/grade7"
                    },
                    {
                        id: "grade8",
                        title: "Grade VIII",
                        type: "item",
                        url: "/teachers/grade8"
                    },
                    {
                        id: "grade9",
                        title: "Grade IX",
                        type: "item",
                        url: "/teachers/grade9"
                    },
                    {
                        id: "grade10",
                        title: "Grade X",
                        type: "item",
                        url: "/teachers/grade10"
                    },
                    {
                        id: "grade11",
                        title: "Grade XI",
                        type: "item",
                        url: "/teachers/grade11"
                    },
                    {
                        id: "grade12",
                        title: "Grade XII",
                        type: "item",
                        url: "/teachers/grade12"
                    },
                ]
            }
        ]
    }
]