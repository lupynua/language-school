var ArticleStatus = React.createClass({
  render: function() {
    return (
      <kbd {...this.props}>
        {this.props.status == "priv" ? "Private article" : "Public article"}
      </kbd>
    );
  }
})
