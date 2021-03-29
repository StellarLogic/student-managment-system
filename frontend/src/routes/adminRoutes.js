import React from "react";
import AllTeachers from "src/views/admin/Teachers/AllTeachers";
const Dashboard = React.lazy(() =>
  import("../views/admin/dashboard/Dashboard")
);

const adminRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/teachers/list", name: "Teacher", component: AllTeachers },
];

export default adminRoutes;
