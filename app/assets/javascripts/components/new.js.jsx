var BookNew = React.createClass({
  mixins: [ReactRouter.Navigation],

  handleSubmit: function(article) {
    var newArticle = new LanguageSchool.Models.Book({book});
    BookNew.save({}, {
      success: function(model, response) {
        this.transitionTo("book", {bookId: response.id});
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },
  render: function() {
    return (
      <div className='bookNew'>
        <h2>New Book</h2>
        <BookForm handleSubmit={this.handleSubmit} buttonRole='Create book'/>
        <BackToBooks />
      </div>
    );
  }
});