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
  CForm,
} from "@coreui/react";
import { connect, useDispatch } from "react-redux";
import { getAllRoles } from "src/actions/admin/roles";
import { addUser } from "src/actions/admin/user";
import { useHistory } from "react-router";

const AddUser = ({ loadingRoles, roles }) => {
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();
  const {
    location: { state: userState },
  } = useHistory();

  useEffect(() => {
    dispatch(getAllRoles);
    if (userState) {
      const { firstname, lastname, username, email } = userState;

      setformData({ firstname, lastname, username, email });
    }
  }, []);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
  };

  console.log("formData :>> ", formData);
  return (
    <CContainer fluid>
      <CForm onSubmit={handleSubmit}>
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
                        onChange={handleChange}
                        defaultValue={formData.firstname}
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
                        onChange={handleChange}
                        defaultValue={formData.lastname}
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
                        onChange={handleChange}
                        defaultValue={formData.username}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput
                        id="email"
                        placeholder="Enter Email Id"
                        required
                        onChange={handleChange}
                        defaultValue={formData.email}
                      />
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
                        onChange={handleChange}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="role">Role</CLabel>
                      <CSelect
                        custom
                        name="role"
                        id="role"
                        onChange={handleChange}
                      >
                        {!loadingRoles &&
                          roles.map(({ _id, name }) => {
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
      </CForm>
    </CContainer>
  );
};

const mapStateToProps = (state) => ({
  loadingRoles: state.admin.role.loading,
  roles: state.admin.role.data,
});

export default connect(mapStateToProps)(AddUser);
