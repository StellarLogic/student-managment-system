import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import adminNav from "./navs/admin/_nav";
import teacherNav from "./navs/teacher/_nav";
import studentNav from "./navs/student/_nav";

const TheSidebar = ({ role }) => {
  const [navigation, setnavigation] = useState([]);
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);

  useEffect(() => {
    if (role === "admin") {
      setnavigation(adminNav);
    } else if (role === "teacher") {
      setnavigation(teacherNav);
    } else if (role === "student") {
      setnavigation(studentNav);
    } else {
      setnavigation([]);
    }
  }, [role]);
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
});

export default connect(mapStateToProps)(React.memo(TheSidebar));
