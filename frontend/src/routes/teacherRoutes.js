import React from "react";
const Dashboard = React.lazy(() =>
  import("../views/teacher/dashboard/Dashboard")
);

const teacherRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

export default teacherRoutes;
