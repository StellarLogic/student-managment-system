import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getAllRoles, deleteRoles } from "src/actions/admin/roles";
import Loader from "src/views/common/Loader/Loader";

const RoleList = ({ roles, loading }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllRoles);
  }, []);

  if (loading) return <Loader />;
  return (
    <table className="table text-center">
      <thead className="thead-dark">
        <tr style={{ verticalAlign: "middle" }}>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Created At</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map(({ _id, name, createdAt }, index) => (
          <tr key={_id}>
            <th scope="row">{index + 1}</th>
            <td>{name}</td>
            <td>{createdAt}</td>
            <td>
              <button
                type="button"
                className="btn btn-pill btn-success mx-2"
                onClick={() =>
                  history.push({
                    pathname: `/roles/edit/${_id}`,
                    state: { name },
                  })
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-pill btn-danger"
                onClick={() => dispatch(deleteRoles(_id))}
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
  loading: state.admin.role.loading,
  roles: state.admin.role.data,
});

export default connect(mapStateToProps)(RoleList);
