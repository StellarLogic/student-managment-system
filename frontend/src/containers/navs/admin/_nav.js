import React from "react";
import CIcon from "@coreui/icons-react";

const adminNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Role",
    route: "/roles",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Roles",
        to: "/roles/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Role",
        to: "/roles/add",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Teacher",
    route: "/teacher",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Teachers",
        to: "/teachers/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Teacher",
        to: "/teachers/add",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Student",
    route: "/students",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Students",
        to: "/students/list",
      },
    ],
  },
];

export default adminNav;
