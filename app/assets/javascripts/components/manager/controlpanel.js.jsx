var ControlPanel = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <i className="glyphicon glyphicon-dashboard"></i>
          <span> Control panel</span>
        </div>
        <div className="panel-body">
          <div className="list-group">
            <a className="list-group-item" href="#man_user">
              <i className="glyphicon glyphicon-user"></i>
              <span> Users</span>
            </a>
            <a className="list-group-item" href="#man_articles">
              <i className="glyphicon glyphicon-paperclip"></i>
              <span> Articles</span>
            </a>
            <a className="list-group-item" href="#courses">
              <i className="glyphicon glyphicon-education"></i>
              <span> Courses</span>
            </a>
            <a className="list-group-item" href="#materials">
              <i className="glyphicon glyphicon-book"></i>
              <span> Materials</span>
            </a>
            <a className="list-group-item" href="#events">
              <i className="glyphicon glyphicon-star"></i>
              <span> Events</span>
            </a>
            <a className="list-group-item" href="#exams">
              <i className="glyphicon glyphicon-edit"></i>
              <span> Exams</span>
            </a>
          </div>
        </div>
      </div>  
    );
  }
});
