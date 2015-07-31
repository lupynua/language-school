var PagesView = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    (new Bb.Collections.Pages()).fetch({
      success: function(collection) {
        this.setState({data: collection.toJSON()});
      }.bind(this)});
  },

  handleClick: function(e) {
    e.preventDefault();
    this.setState({current_page: e.target.attributes["data-page-id"].value});
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <PagesViewList data={this.state.data} handleClick={this.handleClick} />
        </div>
        <div className="rendered_page">
         <PageView params={{pageId: this.state.current_page}} />
        </div>
      </div>
    );
  }
});
