var NewArticleLink = React.createClass({
  render: function() {
    return (
      <Link
        to="new_article"
        className="btn btn-primary col-md-1"
        {...this.props}>
        New Article
      </Link>
    );
  }
});
