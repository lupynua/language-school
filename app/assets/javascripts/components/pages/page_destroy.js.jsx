var DestroyPage = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleDestroy: function(e) {
    (new Bb.Models.Page({id: this.props.id})).destroy({
        success: function() {
          this.transitionTo('pages');
        }.bind(this),
        error: function(model, response) {
          console.error(response);
        }
    });
  },
  
  deleteConfirmation: function() {
    bootbox.confirm("Are you sure?", this.handleDestroy);
  },

  render: function() {
    return (
      <form onSubmit={this.deleteConfirmation} className="col-md-1">
        <div className="form-group">
          <button className="btn btn-danger" ref="destroy"> Delete page </button>
        </div>
      </form>
    );
  }
});
