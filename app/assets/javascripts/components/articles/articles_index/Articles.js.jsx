var Articles = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    var articles = new Bb.Collections.Articles();
    articles.fetch({
      success: function(collection) {
        this.setState({data: collection.toJSON()});
      }.bind(this),
      error: function(collection, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="h1 col-md-11">Articles</div>
          <NewArticleLink />
        </div>
        <ArticlesList data={this.state.data} />
      </div>
    );
  }
});
