var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;

LanguageSchool.Router = (
    <Route handler={LanguageSchool.App}>
        <Route name='books' handler={Books} path='/books' />
        <Route name='book' path="/books/:bookId" handler={Book} />
    </Route>
    );
