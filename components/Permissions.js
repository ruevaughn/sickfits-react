import { Query } from "react-apollo";
import { ALL_USERS_QUERY } from "../graphql/queries";
import Table from "./styles/Table";
import { PERMISSIONS } from "../lib/constants";
import SickButton from "./styles/SickButton";

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) =>
      console.log(data) || (
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {PERMISSIONS.map(permission => (
                  <th>{permission}</th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <User user={user} key={user.id} />
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  </Query>
);

class User extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {PERMISSIONS.map(permission => (
          <td>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <SickButton>Update</SickButton>
      </tr>
    );
  }
}

export default Permissions;
