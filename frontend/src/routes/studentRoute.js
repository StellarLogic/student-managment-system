import React from "react";
const Dashboard = React.lazy(() =>
  import("../views/student/dashboard/Dashboard")
);

const studentRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

export default studentRoutes;
