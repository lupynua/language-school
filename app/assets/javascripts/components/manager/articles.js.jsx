var Articles = React.createClass({
  getInitialState: function(){
    return {checked: 'display', pagetitle: 'Articles'};
  },
  render: function() {
    var swicher;
      if (this.state.checked == 'display') {
        swicher = <ArticlesDisplay />;
      } else {
        swicher = <ArticlesAdd />;
      }
      return (
        <div>
          <Title pagetitle={this.state.pagetitle}  onTitleLinkClick={this.handleTitleLinkClick} />
          <hr/>
          {swicher}
        </div>
    );
  },
  handleTitleLinkClick: function(number) {
    this.setState({checked: number});
  },
});
