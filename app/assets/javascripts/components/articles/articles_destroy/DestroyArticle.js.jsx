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
          <button className="btn btn-danger btn-sm" ref="destroy">
            <span className="glyphicon glyphicon-trash"> Delete</span>
          </button>
        </div>
      </form>
    );
  }
});
