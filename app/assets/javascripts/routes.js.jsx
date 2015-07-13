var DefaultRoute = ReactRouter.DefaultRoute,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;

var Router = (
  <Route handler={App}>
    <Route name='albums' handler={Albums} path='/albums' />
    <Route name='albumNew' handler={AlbumNew} path='/albums/new' /> /*(!)write /albums/new before /albums/:albumId, otherwise new will be treated as id */
    <Route name='album' handler={Album} path='/albums/:albumId' />
  </Route>
);
