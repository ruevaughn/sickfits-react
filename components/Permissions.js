import { Query } from "react-apollo";
import { ALL_USERS_QUERY } from "../graphql/queries";
import Table from "./styles/Table";
import { PERMISSIONS } from "../lib/constants";
import SickButton from "./styles/SickButton";
import PropTypes from "prop-types";

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <h2>Manage Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {PERMISSIONS.map(permission => (
                <th key={permission}>{permission}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <UserPermissions user={user} key={user.id} />
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };

  handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of the current permissions (otherwise it's passed by reference so it updates the value)
    let updatedPermissions = [...this.state.permissions];
    if (checkbox.checked) {
      // add the permission to the permissions
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }

    this.setState({ permissions: updatedPermissions });
  };

  state = {
    permissions: this.props.user.permissions
  };
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {PERMISSIONS.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                type="checkbox"
                value={permission}
                checked={this.state.permissions.includes(permission)}
                onChange={this.handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
