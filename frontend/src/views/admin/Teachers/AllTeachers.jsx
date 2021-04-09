import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Loader from "src/views/common/Loader/Loader";
import "./styles.scss";
import {
  getAllTeachers,
  activateAccount,
  deleteTeacher,
} from "src/actions/admin/teachers";
import { useHistory } from "react-router";

const AllTeachers = ({ loading, teachers }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllTeachers);
  }, []);

  if (loading) return <Loader />;

  return (
    <table className="table text-center">
      <thead className="thead-dark">
        <tr style={{ verticalAlign: "middle" }}>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">username</th>
          <th scope="col">Email</th>
          <th scope="col">Created At</th>
          <th scope="col">Updated At</th>
          <th scope="col">Activated</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((user, index) => {
          return (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>
                {user.firstname} {user.lastname}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
              <td>
                {user.isActivated ? (
                  <span className="badge rounded-pill bg-success text-white">
                    Activated
                  </span>
                ) : (
                  <span className="badge rounded-pill bg-danger text-white">
                    Not Activated
                  </span>
                )}
              </td>
              <td>
                {!user.isActivated ? (
                  <button
                    type="button"
                    className="btn btn-pill btn-info"
                    onClick={() => dispatch(activateAccount(user._id))}
                  >
                    Activate
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-pill btn-danger"
                    onClick={() => dispatch(activateAccount(user._id))}
                  >
                    DeActivate
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-pill btn-primary ml-2"
                  onClick={() => history.push(`/teacher/profile/${user._id}`)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-pill btn-success mx-2"
                  onClick={() =>
                    history.push({
                      pathname: `/teachers/edit/${user._id}`,
                      state: user,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-pill btn-danger"
                  onClick={() => dispatch(deleteTeacher(user._id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  loading: state.admin.teacher.loading,
  teachers: state.admin.teacher.data,
});

export default connect(mapStateToProps)(AllTeachers);
