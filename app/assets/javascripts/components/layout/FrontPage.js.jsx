var FrontPage = React.createClass({
  render: function() {
    return (
<div className="container" id="index-page">
  <Carousel />
  <div className="row" id="presentation">
    <Presentation />
  </div>
  <div className='row' id='static-pages'>
  </div>
  <div className="row">
    <div className="col-md-4" id="events">
      <h3>Events</h3>
    </div>
    <div className="col-md-4" id="materials">
      <h3>Materials</h3>
    </div>
    <div className="col-md-4" id="articles">
      <h3>Latest Articles</h3>
      <LatestArticles />
    </div>
  </div>
</div>
    );
   }
});
