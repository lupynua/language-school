var Navbar = React.createClass({
  getInitialState: function() {
    return {data: []};
 },

  componentDidMount: function() {
    var menus = new Bb.Collections.Menus();
    menus.fetch({
    success: function(collection) {
      this.setState({data: collection.toJSON()});
      }.bind(this),
    error: function(collection, response) {
      console.error(response);
    }
  });
 },
  render: function() {
    var items = this.state.data.map(function(menu) {
    return (        
      <li>
        <a key={menu.id} href={menu.url}>{menu.name}</a>
     </li>
          );
        });
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
              {items}
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
