import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
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
    name: "Buttons",
    route: "/buttons",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Buttons",
        to: "/buttons/buttons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Brand buttons",
        to: "/buttons/brand-buttons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Buttons groups",
        to: "/buttons/button-groups",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Dropdowns",
        to: "/buttons/button-dropdowns",
      },
    ],
  },
];

export default _nav;
