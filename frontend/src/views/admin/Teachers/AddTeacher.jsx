import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CContainer,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CCardBody,
  CCard,
  CButton,
} from "@coreui/react";
import { connect, useDispatch } from "react-redux";
import { getAllRoles } from "src/actions/admin/roles";

const AddTeacher = ({ loadingRoles, roles }) => {
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoles);
  }, []);

  console.log("roles :>> ", roles);
  return (
    <CContainer fluid>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="firstname">First Name</CLabel>
                    <CInput
                      id="firstname"
                      placeholder="Enter first name"
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="lastname">Last Name</CLabel>
                    <CInput
                      id="lastname"
                      placeholder="Enter fast name"
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="username">Username</CLabel>
                    <CInput
                      id="username"
                      placeholder="Enter username"
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="email">Email</CLabel>
                    <CInput id="email" placeholder="Enter Email Id" required />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="password">Password</CLabel>
                    <CInput
                      id="password"
                      placeholder="Enter Password"
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="role">Role</CLabel>
                    <CSelect custom name="role" id="role">
                      {!loadingRoles &&
                        roles.map(({ _id, name }) => {
                          console.log(_id);
                          return (
                            <option value={_id} key={_id}>
                              {name}
                            </option>
                          );
                        })}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" className="text-right mt-3">
                  <CButton type="submit" color="primary" className="px-4">
                    Add
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

const mapStateToProps = (state) => ({
  loadingRoles: state.admin.role.loading,
  roles: state.admin.role.data,
});

export default connect(mapStateToProps)(AddTeacher);
