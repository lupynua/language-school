var PagesView = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    (new Bb.Collections.Pages()).fetch({
      success: function(collection) {
        this.setState({data: collection.toJSON()});
      }.bind(this),
      error: function(collection, response) {
        console.error(response);
      }
    });
  },

  handleClick: function(e) {
    e.preventDefault();
    var pageId = e.target.attributes["data-page-id"].value;
    this.setState({current_page: pageId});
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="h3 col-md-11"
            data-current-page="1"
            >
          </div>
        </div>
        <PagesViewList data={this.state.data} handleClick={this.handleClick} />
        <PageView params={{pageId: this.state.current_page}} />
      </div>
    );
  }
});
