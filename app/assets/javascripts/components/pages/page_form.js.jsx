var PageForm = React.createClass({

  getInitialState: function() {
    return {page: {}};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({page: nextProps.page});
  },

  handleChange: function(e) {
    var newState = this.state.page;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  componentDidMount: function() {
    // TODO Mount TinyMCE, unmount tinyMCE
    // tinyMCE.init 
  },
  
  onSubmit: function(e) {
    e.preventDefault();
    var page = {};
    for (var field in this.refs) {
      page[field] = React.findDOMNode(this.refs[field]).value.trim();
    }
    this.props.handleSubmit(page);
  },

  render: function() {
    return (
      <div className="pages_container">
        <form className="pageForm"  onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              ref="title"
              id="title"
              value={this.state.page.title}
              onChange={this.handleChange}
              className="form-control"
              type="text"
              placeholder="Title"
              required
            />
          </div>

          <div className="form-group">
           
            <textarea
             ref="body"
             id="body"
             value={this.state.page.body}
             onChange={this.handleChange}
             className="tinymce form-control"
             placeholder="Body"
             rows="10"
             cols="5"
             required
            />

          </div>

          <div className="form-group">

            <input
              ref="path"
              id="path"
              value={this.state.page.path}
              onChange={this.handleChange}
              className="form-control"
              type="text"
              placeholder="Path"
              required
            />

          </div>
          <input className="btn btn-primary" type="submit" value="Create" />
        </form>
      </div>
    );
  }
});
