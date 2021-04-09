import React, { useState, useEffect } from "react";
import {
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CCardBody,
  CCard,
  CButton,
  CForm,
  CTextarea,
} from "@coreui/react";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import "./styles.scss";
import {
  addTeacherProfile,
  updateTeacherProfile,
} from "../../../../actions/admin/teachers";

const AddTeacherProfile = ({ loading, profile }) => {
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();

  const history = useHistory();
  const { id: userId } = useParams();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setformData({ ...formData, [e.target.id]: file });
    }
  };

  useEffect(() => {
    if (profile) {
      const {
        bio,
        contact,
        dob: { day, month, year },
        address: { apartment, street, state, zip },
      } = profile;
      setformData({
        bio,
        contact,
        day,
        month,
        year,
        apartment,
        street,
        state,
        zip,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    if (e.target.type === "date") {
      const [year, month, day] = e.target.value.split("-");
      return setformData({ ...formData, year, month, day });
    }
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var form_data = new FormData();
    for (var key in formData) {
      form_data.append(key, formData[key]);
    }

    if (profile)
      return dispatch(updateTeacherProfile(userId, form_data, history));

    dispatch(addTeacherProfile(userId, form_data, history));
  };

  return (
    <CForm onSubmit={handleSubmit} className="add-profile">
      <CRow>
        <CCol xs="12" sm="8">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <CRow>
                    <CCol xs="2">
                      <div className="file-w-preview">
                        <label
                          htmlFor="avatar"
                          className="label fa fa-plus"
                        ></label>
                        <CInput
                          id="avatar"
                          name="avatar"
                          required
                          type="file"
                          onChange={handleFile}
                        />
                      </div>
                    </CCol>
                    <CCol xs="2">
                      <div className="preview">
                        {formData.avatar ? (
                          <img
                            src={URL.createObjectURL(formData.avatar)}
                            alt=""
                          />
                        ) : null}

                        {/* {profile.avatar && <img src={profile?.avatar.path} />} */}
                      </div>
                    </CCol>
                    <CCol xs="2">
                      <div className="file-w-preview banner">
                        <label
                          htmlFor="banner"
                          className="label fa fa-plus"
                        ></label>
                        <CInput
                          id="banner"
                          name="banner"
                          required
                          type="file"
                          onChange={handleFile}
                        />
                      </div>
                    </CCol>
                    <CCol xs="6">
                      <div className="preview banner">
                        {formData.banner && (
                          <img
                            src={URL.createObjectURL(formData.banner)}
                            alt=""
                          />
                        )}
                        {/* {!formData.banner && profile.banner && (
                          <img src={profile.banner.path} />
                        )} */}
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="email">Bio</CLabel>
                    <CTextarea
                      id="bio"
                      name="bio"
                      placeholder="Enter Bio"
                      required
                      onChange={handleChange}
                      defaultValue={formData.bio}
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="firstname">Date of birth</CLabel>
                    <CInput
                      type="date"
                      id="date-input"
                      name="date-input"
                      placeholder="date"
                      onChange={handleChange}
                      defaultValue={new Date().toJSON().slice(0, 10)}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="contact">Contact Number</CLabel>
                    <CInput
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="8130519266"
                      onChange={handleChange}
                      defaultValue={formData.contact}
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="email">Apartment</CLabel>
                    <CInput
                      id="apartment"
                      name="apartment"
                      placeholder="Enter Appartment"
                      required
                      onChange={handleChange}
                      defaultValue={formData.apartment}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="email">Street</CLabel>
                    <CInput
                      id="street"
                      name="street"
                      placeholder="Enter Street"
                      required
                      onChange={handleChange}
                      defaultValue={formData.street}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="email">State</CLabel>
                    <CInput
                      id="state"
                      name="state"
                      placeholder="Enter State"
                      required
                      onChange={handleChange}
                      defaultValue={formData.state}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="email">Zip-code</CLabel>
                    <CInput
                      id="zip"
                      name="zip"
                      placeholder="Enter Zip-code"
                      required
                      onChange={handleChange}
                      defaultValue={formData.zip}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" className="text-right mt-3">
                  <CButton
                    type="submit"
                    color="primary"
                    className="px-4"
                    disabled={loading}
                  >
                    {loading ? "Updating" : !profile ? "Add" : "Update"}
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CForm>
  );
};

const mapStateToProps = (state) => ({
  loading: state.admin.teacher.profile.loading,
  profile: state.admin.teacher.profile.data,
});

export default connect(mapStateToProps)(AddTeacherProfile);
