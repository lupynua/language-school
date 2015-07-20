var Menus = React.createClass({
mixins: [ReactRouter.Navigation],
  
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
  <tbody>
      <tr key={menu.id} >
        <td>{menu.id}</td>
        <td>{menu.name}</td>
        <td>{menu.url}</td>
        <td><Link to="menu_item" params={{menuId: menu.id}}className="btn btn-danger">{'Delete menu item'}</Link></td>
        <td><Link to="edit" params={{menuId: menu.id}}className="btn btn-warning">{'Edit menu item'}</Link></td>
      </tr>
  </tbody>     
  );
});
  return (
<div className='menu-wrapper'>
<h2> List of menu items </h2>
<table className='table table-striped'> 
  <thead>
    <tr>
      <th>ID</th>
        <th>Name</th>
        <th>URL</th>
      <th colSpan="4"></th>
    </tr>
  </thead>
{items}
</table>

<Link to='new_menu' className="btn btn-success">
      {'Create new menu item'}
    </Link>
</div>
    );
  }
});
