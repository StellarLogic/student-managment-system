import React from "react";
import {
  CButton,
  CCardBody,
  CDataTable,
  CBadge,
  CCollapse,
} from "@coreui/react";
import { connect } from "react-redux";

const fields = [
  { key: "Name", _style: { width: "40%" } },
  { key: "Branch", _style: { width: "20%" } },
  { key: "status", _style: { width: "20%" } },
  { key: "Email", _style: { width: "20%" } },
  { key: "Username", _style: { width: "20%" } },
];

const StudentList = ({ students }) => {
  return (
    <CDataTable
      items={students}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        status: (item) => (
          <td>
            <CBadge>{item.status}</CBadge>
          </td>
        ),
        show_details: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
              >
                {item.email}
              </CButton>
            </td>
          );
        },
        details: (item, index) => {
          console.log(item);
          return (
            <CCollapse>
              <CCardBody>
                <h4>
                  {item.firstname}
                  {item.lastname}
                </h4>
                <p className="text-muted">User since: {item.email}</p>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  students: state.admin.student.data,
});

export default connect(mapStateToProps)(StudentList);
