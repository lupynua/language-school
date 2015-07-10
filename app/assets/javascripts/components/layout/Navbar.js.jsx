/** @jsx React.DOM */

var Navbar = React.createClass({
  render: function() {
    return (
<nav className="navbar navbar-fixed-top navbar-default navgreen">
  <div className="container-fluid">
    <div className="navbar-header">
     <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Language School</a>
    </div>
     <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">About us<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li>
              <a href="#">Our School</a>
            </li>
            <li>
              <a href="#">Our Teachers</a>
            </li>
            <li>
              <a href='#'>Photogallery</a>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Studying<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li>
              <a href='#'>Our Courses</a>
            </li>
            <li>
              <a href='#'>Prices</a>
            </li>
            <li>
              <a href='#'>Materials</a>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">News<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li>
              <a href='#'>Events</a>
            </li>
            <li>
              <a href='#'>Articles</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#'>Contacts</a>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
          <li>
            <a href='#'>Log In <span className="glyphicon glyphicon-log-in"></span></a>
          </li>
          <li>
            <a href='#'>Sign Up <span className="glyphicon glyphicon-user"></span></a>
          </li>
      </ul>
    </div>
  </div>
</nav>
 );
   }
});