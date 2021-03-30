import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CContainer,
  CFormGroup,
  CLabel,
  CInput,
  CCardBody,
  CCard,
  CForm,
  CButton,
} from "@coreui/react";
import { connect, useDispatch } from "react-redux";
import { addRoles } from "src/actions/admin/roles";
import { withRouter } from "react-router";

const AddRole = ({ history }) => {
  const [state, setstate] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setstate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRoles(state, history));
  };

  return (
    <CContainer fluid>
      <CForm onSubmit={(e) => handleSubmit(e)}>
        <CRow>
          <CCol xs="12" sm="6">
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="firstname">First Name</CLabel>
                      <CInput
                        id="firstname"
                        placeholder="Enter first name"
                        required
                        onChange={(e) => handleChange(e)}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="12" className="text-right">
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

export default withRouter(AddRole);
