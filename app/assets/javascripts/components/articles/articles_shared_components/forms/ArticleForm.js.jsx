var ArticleForm = React.createClass({
  getInitialState: function() {
    return {article: {}};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({article: nextProps.article});
  },

  handleChange: function(e) {
    var newState = this.state.article;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },

  onSubmit: function(e) {
    e.preventDefault();

    var article = {};
    for (var field in this.refs) {
      article[field] = React.findDOMNode(this.refs[field]).value.trim()
    }

    this.props.handleSubmit(article);
  },

  render: function() {
    return (
      <form className="articleForm" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            ref="title"
            id="title"
            value={this.state.article.title}
            onChange={this.handleChange}
            className="form-control"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <textarea
           ref="body"
           id="body"
           value={this.state.article.body}
           onChange={this.handleChange}
           className="form-control"
           placeholder="Body"
           rows="3"
           />
        </div>
        <div className="form-group form-inline">
          <select
            ref="status"
            id="status"
            value={this.state.article.status}
            onChange={this.handleChange}
            className="form-control btn-info">
              <option value="shared">Public</option>
              <option value="restricted">Private</option>
          </select>
        </div>
        <input className="btn btn-primary" type="submit" value="Post" />
      </form>
    );
  }
});
