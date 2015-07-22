var DefaultRoute = ReactRouter.DefaultRoute,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;

var Router = (
  <Route handler={App}>
    <Route name='albums' handler={Albums} path='/albums' />
    <Route name='albumNew' handler={AlbumNew} path='/albums/new' /> /*(!)write /albums/new before /albums/:albumId, otherwise new will be treated as id */
    <Route name='album' handler={Album} path='/albums/:albumId' />
    <Route path='/articles' name='articles' handler={Articles} />
    <Route path='/articles/new' name='new_article' handler={NewArticle} />
    <Route path='/articles/:articleId' name='article' handler={Article} />
    <Route path='/articles/:articleId/edit' name='edit_article' handler={EditArticle} />
  </Route>
);
