var Breadcrumbs = React.createClass({
  render: function() {
    var PageName = "Page";
    return (
      <div className="breadcrumb">
        <li>
          <a href="#">Home</a>
        </li>
        <li className="active">{PageName}</li>
      </div>
    );
  }
});
