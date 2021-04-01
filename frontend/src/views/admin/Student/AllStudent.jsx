import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Loader from "src/views/common/Loader/Loader";
import "./styles.scss";
import {
  getAllStudents,
  activateAccount,
  deleteStudent,
} from "src/actions/admin/student";
import { useHistory } from "react-router";

const AllTeachers = ({ loading, students }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllStudents);
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
        {students.map((user, index) => (
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
              <button type="button" className="btn btn-pill btn-primary ml-2">
                View
              </button>
              <button
                type="button"
                className="btn btn-pill btn-success mx-2"
                onClick={() =>
                  history.push({
                    pathname: `/students/edit/${user._id}`,
                    state: user,
                  })
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-pill btn-danger"
                onClick={() => dispatch(deleteStudent(user._id))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  loading: state.admin.student.loading,
  students: state.admin.student.data,
});

export default connect(mapStateToProps)(AllTeachers);
