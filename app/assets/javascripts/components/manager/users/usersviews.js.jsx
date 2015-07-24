var UsersDisplay = React.createClass({
  render: function() {
    return (
      <div className='panel-item'>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>lolpop32@giraffe.com</td>
              <td>Sasha</td>
              <td>admin</td>
              <td className='btn-group'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>and@giraffe.com</td>
              <td>Andrew</td>
              <td>user</td>
              <td className='btn-group'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>pet@giraffe.com</td>
              <td>Peter</td>
              <td>editor</td>
              <td className='btn-group'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

var UserAdd = React.createClass({
  render: function() {
    return (
      <form className="new_user" action="/users">
          <div className="field">
            <label htmlFor="user_email">Email</label><br />
            <input className='form-control' type="email" name="user[email]" />
          </div>
          <div className="field">
            <label htmlFor="user_password">Password</label>
            <em>(8 characters minimum)</em>
            <br />
            <input className='form-control' autoComplete="off" type="password" name="user[password]" id="user_password" />
          </div>
          <div className="field">
            <label htmlFor="user_password_confirmation">Password confirmation</label><br />
            <input className='form-control' autoComplete="off" type="password" name="user[password_confirmation]" id="user_password_confirmation" />
          </div>
          <br />
          <div className="actions">
            <input className='btn btn-default btn-submit' type="submit" name="commit" value="Sign up" />
          </div>
        </form>
    );
  }
});
