var Users = React.createClass({
  getInitialState: function(){
    return {checked: 'display', pagetitle: 'Users'};
  },
  render: function() {
    var swicher;
      if (this.state.checked == 'display') {
        swicher = <UsersDisplay />;
      } else {
        swicher = <UserAdd />;
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
