
var Notifications = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <i className="glyphicon glyphicon-tasks"></i>
          <span> Notifications</span>
        </div>
        <div className="panel-body">
          <div className="list-group">
            <a className="list-group-item" href="#">
              New Comments
              <span className="badge">14</span>
            </a>
            <a className="list-group-item" href="#">
              New Users
              <span className="badge">14</span>
            </a>
            <a className="list-group-item" href="#">
              New Events
              <span className="badge">14</span>
            </a>
            <a className="list-group-item" href="#">
              New Tasks
              <span className="pull-right text-muted small">
                <em>43 minutes ago</em>
              </span>
            </a>
          </div>
          <a className="btn btn-default btn-block" href="#">View All Alerts</a>
        </div>
      </div>
    );
  }
});
