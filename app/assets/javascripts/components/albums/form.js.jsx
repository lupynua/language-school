var AlbumForm = React.createClass({
  handleFormSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var user_id = React.findDOMNode(this.refs.author).value.trim();
    var album = {title: title, description: description, user_id: user_id};
    if (!title || !user_id) {
      return;
    }
    this.props.handleSubmit({album: album});
    return;
  },

  componentDidMount: function() {
    setTimeout(function() {
                React.findDOMNode(this.refs.title).value=this.props.title || '';
                React.findDOMNode(this.refs.description).value=this.props.description || '';
                React.findDOMNode(this.refs.author).value=this.props.user_id || '';
              }.bind(this), 50);
  },
  render: function() {
    return (
      <form role="form" onSubmit={this.handleFormSubmit} >
        <div className="col-md-6">
          <div className="form-group">
            <label for="title">Title</label>
            <input type="string" className="form-control" ref="title" />
          </div>
          <div className="form-group">
            <label for="title">Description:</label>
            <textarea type="text" className="form-control" ref="description" ></textarea>
          </div>
          <div className="form-group">
            <label for="user_id">Author</label>
            <input type="number" className="form-control" ref="author" />
          </div>
          <button type="submit" className="btn btn-default">{this.props.buttonRole}</button>
        </div>
      </form>
    );
  }
});
