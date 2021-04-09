import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  deleteTeacherProfile,
  getTeacherProfile,
} from "src/actions/admin/teachers";
import Failure from "src/views/common/failure/Failure";
import Loader from "src/views/common/Loader/Loader";
import StudentList from "./StudentList";
import "./styles.scss";

const TeacherProfile = ({ loading, profile, match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    params: { id },
  } = match;

  useEffect(() => {
    dispatch(getTeacherProfile(id));
  }, [id]);

  if (loading) return <Loader />;

  if (!loading && !profile)
    return (
      <Failure
        label="Profile doesn't exist!"
        path={{ to: `/teacher/profile/add/${id}`, name: "Create Profile" }}
      />
    );

  const { avatar, banner, user, address, dob, contact, bio } = profile;
  const { apartment, street, state, zip } = address;
  const { day, month, year } = dob;
  return (
    <div className="row profile">
      <div className="col-md-2">
        <div className="sidebar">
          <div className="avatar-wrapper">
            <img src={avatar.path} alt="" className="avatar" />
            <Link
              className="edit"
              to={{ pathname: `/teacher/profile/edit/${id}`, state: profile }}
            >
              <i className="fa fa-pencil icon"></i>
            </Link>
          </div>
          <div className="bottom">
            <h3 className="name">
              {user.firstname} {user.lastname}
            </h3>
            <ul className="list">
              <li>
                <i className="fa fa-user-circle-o icon"></i>
                {user.role.name}
              </li>
              <li>
                <i className="fa fa-map-marker icon"></i>
                {apartment} {street} {state}-{zip}
              </li>
              <li>
                <i className="fa fa-birthday-cake icon"></i>
                {day}-{month}-{year}
              </li>
              <li>
                <i className="fa fa-phone icon"></i>
                {contact}
              </li>
              <li>
                <i className="fa fa-asterisk icon"></i>
                {bio}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-10">
        <div className="main">
          <div className="banner-wrapper">
            <img src={banner.path} alt="" className="banner" />
            <i
              className="fa fa-trash delete-profile"
              onClick={() => dispatch(deleteTeacherProfile(id, history))}
            ></i>
          </div>
          <div className="bottom">
            <div className="row">
              <div className="col-md-6">
                <StudentList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.admin.teacher.profile.loading,
  profile: state.admin.teacher.profile.data,
});

export default connect(mapStateToProps)(TeacherProfile);
