var PictureForm= React.createClass({
  componentDidMount: function() {
    setTimeout(function() {
                React.findDOMNode(this.refs.title).value=this.props.title || '';
                React.findDOMNode(this.refs.description).value=this.props.description || '';
                React.findDOMNode(this.refs.image).value=this.props.image || '';
              }.bind(this), 50);
  },
  render: function() {
    return (
      <form role="form" encType = 'multipart/form-data' action='/api/v1/pictures' method='POST' >
        <div className="col-md-6">
          <div className="form-group">
            <input type="hidden" name='picture[album_id]' value = {this.props.id} />
            <label htmlFor="title">Title</label>
            <input type="string" name='picture[title]' className="form-control" ref="title" />
          </div>
          <div className="form-group">
            <label htmlFor="title">Description:</label>
            <textarea type="text" name='picture[description]' className="form-control" ref="description" ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" name='picture[image]' className="form-control" ref="image" />
          </div>
          <button type="submit" className="btn btn-default" >{this.props.buttonRole}</button>
        </div>
      </form>
    );
  }
});
