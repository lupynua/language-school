var Article = React.createClass({
  getInitialState: function() {
    return {article: {}};
  },

  componentDidMount: function() {
    var article = new Bb.Models.Article({id: this.props.params.articleId});
    article.fetch({
      success: function(model) {
        this.setState({article: model.toJSON()});
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <BackToArticlesLink className="h3 col-md-10"/>
          <EditArticleLink params={{articleId: this.props.params.articleId}} />
          <DestroyArticle id={this.state.article.id} />
        </div>
        <ArticleStatus status={this.state.article.status} />
        <h2>{this.state.article.title}</h2>
        <p dangerouslySetInnerHTML={{__html: this.state.article.body}} />
      </div>
    );
  }
});
