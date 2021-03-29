import React, { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { getDashboardDetails } from "../../../actions/admin/dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardDetails);
  }, []);

  return <p>Admin </p>;
};

export default Dashboard;
