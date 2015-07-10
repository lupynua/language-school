var NewPage = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleSubmit: function(page) {
    (new Bb.Models.Page({page})).save({}, {
      success: function(model, response) {
        this.transitionTo("page", {pageId: response.id});
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div>
        <BackToPages />
        <h2>New Page:</h2>
        <PageForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
});

