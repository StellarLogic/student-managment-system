import React, { useEffect, lazy } from "react";
import { connect, useDispatch } from "react-redux";
import { getDashboardDetails } from "../../../actions/admin/dashboard";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../../common/charts/ChartLineSimple";
import ChartBarSimple from "../../common/charts/ChartBarSimple";
import Loader from "src/views/common/Loader/Loader";

const Dashboard = ({
  loading,
  dashboard: { teachers, students, semesters, branchs },
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardDetails);
  }, []);

  if (loading) return <Loader />;

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={`${teachers.count}`}
          text="Teachers"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Teachers"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={`${students.count}`}
          text="Students"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={`${semesters.count}`}
          text="Semesters"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={`${branchs.count}`}
          text="Branchs"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => ({
  loading: state.admin.dashboard.loading,
  dashboard: state.admin.dashboard.data,
});

export default connect(mapStateToProps)(Dashboard);
