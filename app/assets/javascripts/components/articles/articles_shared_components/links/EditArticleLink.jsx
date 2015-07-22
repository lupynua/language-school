var EditArticleLink = React.createClass({
  render: function() {
    return (
      <Link
        to="edit_article"
        className="btn btn-danger col-md-1"
        {...this.props}>
        Edit article
      </Link>
    );
  }
});
