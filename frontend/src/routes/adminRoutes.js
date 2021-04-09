import React from "react";
import AddRole from "src/views/admin/roles/AddRole";
import RoleList from "src/views/admin/roles/RoleList";
import AddTeacherProfile from "src/views/admin/Teachers/add-profile/AddTeacherProfile";
import TeacherProfile from "src/views/admin/Teachers/profile/TeacherProfile";
const AllStudent = React.lazy(() =>
  import("src/views/admin/Student/AllStudent")
);
const AddUser = React.lazy(() => import("src/views/admin/Teachers/AddUser"));
const AllTeachers = React.lazy(() =>
  import("src/views/admin/Teachers/AllTeachers")
);
const Dashboard = React.lazy(() =>
  import("../views/admin/dashboard/Dashboard")
);

const adminRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/roles/list", name: "Role", component: RoleList },
  { path: "/roles/add", name: "Add Role", component: AddRole },
  { path: "/roles/edit/:id", name: "Edit Role", component: AddRole },
  { path: "/teachers/list", name: "Teacher", component: AllTeachers },
  { path: "/teachers/add", name: "Add Teacher", component: AddUser },
  { path: "/teachers/edit/:id", name: "Edit Teacher", component: AddUser },
  {
    path: "/teacher/profile/:id",
    name: "Teacher Profile",
    component: TeacherProfile,
    exact: true,
  },
  {
    path: "/teacher/profile/add/:id",
    name: "Add Teacher Profile",
    component: AddTeacherProfile,
    exact: true,
  },
  {
    path: "/teacher/profile/edit/:id",
    name: "Edit Teacher Profile",
    component: AddTeacherProfile,
    exact: true,
  },
  { path: "/students/list", name: "Student", component: AllStudent },
  { path: "/students/add", name: "Add Student", component: AddUser },
  { path: "/students/edit/:id", name: "Edit Student", component: AddUser },
];

export default adminRoutes;
