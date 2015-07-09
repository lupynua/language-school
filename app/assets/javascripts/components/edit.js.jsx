var BookEdit = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function () {
    return {
      book: {}, 
    };
  },
  componentDidMount: function () {
    this.book = new LanguageSchool.Models.Book({id: this.props.params.bookId});
    this.book.fetch({
      success: function(model, response, options) {
        this.setState({ book: model.toJSON()});
      }.bind(this),
      error: function(model, response, options) {
        console.log(response.status);
      }.bind(this)
    });  
  },
  componentWillUnmount: function () {
    this.book.off('change');
  },
	editAlbum: function(album) {
    var bk = new LanguageSchool.Models.Album({id: this.props.params.bookId});
    var temp = book.book;
    bk.save(temp, {
      success: function(model, response, options) {
        this.setState({ book: model.toJSON()});
        this.transitionTo('/books/' + this.props.params.bookId);
      }.bind(this),
      error: function(model, response, options) {
        console.log(response.status);
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className='bookEdit'>
        <h2>Edit Book</h2>
        <BookForm handleSubmit={this.editBook}
                   buttonRole='Edit book'
                   title={this.state.album.title}
                   description={this.state.album.description}
                   attachment={this.state.album.attachment} />
        <BackToBooks />
      </div>
    );
  }
});