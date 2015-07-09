var Books = React.createClass({
  getInitialState: function () {
    return {
      books: []
    };
  },
  componentDidMount: function () {
    this._books = new LanguageSchool.Collections.Books;
    this._books.on('update', function () {
      this.setState({books: this._books.toJSON()});
    }, this);
    this._books.fetch();
    //console.log(this._books);
  },
  componentWillUnmount: function () {
    this._books.off('update');
  },
  render: function () {
    var booksList = this.state.books.map(function (book, index) {
      return (<Link to={'/books/' + book.id} className="list-group-item" key={index}>{book.title}</Link>);
//      <li><Link to={`/users/${users.id}`}>{user.name}</Link></li>
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div>Hello books</div>
            <div>{booksList}</div>
          </div>
        </div>
      </div>
      );
  }
});
var Books = React.createClass({
  getInitialState: function () {
    return {
      books: []
    };
  },
  componentDidMount: function () {
    debugger;
    this._books = new LanguageSchool.Collections.Books;
    this._books.on('update', function () {
      this.setState({books: this._books.toJSON()});
    }, this);
    this._books.fetch();
  },
  componentWillUnmount: function () {
    this._books.off('update');
  },
  render: function () {
    var booksList = this.state.books.map(function (book, index) {
      return (<Link to={'/books/' + book.id} className="list-group-item" key={index}>{book.title}</Link>);
//      <li><Link to={`/users/${users.id}`}>{user.name}</Link></li>
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div>Hello Books</div>
            <div className="list-group">{booksList}</div>
          </div>
        </div>
      </div>
      );
  }
});
