import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Loader from "src/views/common/Loader/Loader";
import "./styles.scss";
import {
  getAllTeachers,
  activateAccount,
  deleteTeacher,
} from "src/actions/admin/teachers";

const AllTeachers = ({ loading, teachers }) => {
  const dispatch = useDispatch();

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
        {teachers.map(
          (
            {
              _id,
              firstname,
              lastname,
              username,
              email,
              createdAt,
              updatedAt,
              isActivated,
            },
            index
          ) => (
            <tr key={_id}>
              <th scope="row">{index + 1}</th>
              <td>
                {firstname} {lastname}
              </td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{createdAt}</td>
              <td>{updatedAt}</td>
              <td>
                {isActivated ? (
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
                {!isActivated ? (
                  <button
                    type="button"
                    className="btn btn-pill btn-info"
                    onClick={() => dispatch(activateAccount(_id))}
                  >
                    Activate
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-pill btn-danger"
                    onClick={() => dispatch(activateAccount(_id))}
                  >
                    DeActivate
                  </button>
                )}
                <button type="button" className="btn btn-pill btn-primary ml-2">
                  View
                </button>
                <button type="button" className="btn btn-pill btn-success mx-2">
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-pill btn-danger"
                  onClick={() => dispatch(deleteTeacher(_id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  loading: state.admin.teacher.loading,
  teachers: state.admin.teacher.data,
});

export default connect(mapStateToProps)(AllTeachers);
