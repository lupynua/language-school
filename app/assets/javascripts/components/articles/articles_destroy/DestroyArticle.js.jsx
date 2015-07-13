var DestroyArticle = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleSubmit: function(e) {
    e.preventDefault();
    var article = new Bb.Models.Article({id: this.props.id});
    article.destroy({
      success: function() {
        this.transitionTo("articles");
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      },
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="col-md-1">
        <div className="form-group">
          <button className="btn btn-danger" ref="destroy">Delete article</button>
        </div>
      </form>
    );
  }
});
