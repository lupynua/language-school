var PageView = React.createClass({
  getInitialState: function() {
    return {page: []};
  },

  componentDidMount: function() {
    (new Bb.Models.Page({id: this.props.params.pageId})).fetch({
      success: function(model) {
        this.setState({page: model.toJSON()});
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  componentWillReceiveProps: function(nextProps) {
    (new Bb.Models.Page({id: nextProps.params.pageId})).fetch({
      success: function(model) {
        this.setState({page: model.toJSON()});
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <div className="container-fluid pages_container">
        <div className="row">
        </div>
        <p> {this.state.page.body}</p>
      </div>
    );
  }
});
