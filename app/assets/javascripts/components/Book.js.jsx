var Book = React.createClass({
  getInitialState: function () {
    debugger;
    return {
      bookId: 0,
      book: {}
    };
  },
  componentDidMount: function () {
    var id = this.props.params.bookId;
    debugger;

    this._book = new LanguageSchool.Models.Book;
    this._book.on('change', function () {
      this.setState({
        bookId: id,
        book: this._book.toJSON()
      });
    }, this);
    //this.init(id);
    this._book.fetch();
  },
  componentWillUnmount: function () {
    this._book.off('change');
  },
  componentWillReceiveProps: function (nextProps) {
    this.init(nextProps.bookId);
  },
  // init: function(id) {
  //   this._book.fetch();
  //   debugger;
  // },
  render: function () {
    return (
      <div>
        <h2>Book details</h2>
        <h2>{this.state.book.title}</h2>
        <p>{this.state.book.description}</p>
      </div>
      );
  }
});
