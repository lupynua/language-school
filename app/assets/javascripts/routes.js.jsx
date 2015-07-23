var DefaultRoute = ReactRouter.DefaultRoute,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;

var Router = (
  <Route handler={App}>

    <Route name='albums' handler={Albums} path='/albums' />
    <Route name='albumNew' handler={AlbumNew} path='/albums/new' /> 
    <Route name='album' handler={Album} path='/albums/:albumId' />

    <Route path='/articles' name='articles' handler={Articles} />
    <Route path='/articles/new' name='new_article' handler={NewArticle} />
    <Route path='/articles/:articleId' name='article' handler={Article} />
    <Route path='/articles/:articleId/edit' name='edit_article' handler={EditArticle} />
    
    <Route path='/pages' name='pages' handler={Pages} />
    <Route path='/pages/new' name='new_page' handler={NewPage} />
    <Route path='/pages/:pageId' name='page' handler={Page} />
    <Route path='/pages/:pageId/edit' name='edit_page' handler={EditPage} />

  </Route>
);
