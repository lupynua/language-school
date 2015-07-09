var LatestArticles = React.createClass({
  getInitialState: function() {
    return {
      books: []
    };
  },

  componentDidMount: function() {
    (new Bb.Collections.Books({path: "/latest"})).fetch({
      success: function(collection) {
        this.setState({books: collection.toJSON().map(function(book, index) {
          return (
            <li>
              <h4>
                {/*ugly link making, but router's <Link /> doesn't work due to context issue */}
                <a className="h4"
                   href={"#articles/" + article[0]}>
                   {article[1]}
                </a>
              </h4>
            </li>
          );
        })});
      }.bind(this),
      error: function(collection, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    return (
      <ul className="list-unstyled">
        {this.state.books}
      </ul>
    );
  }
});
