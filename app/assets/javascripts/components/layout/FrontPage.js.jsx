/** @jsx React.DOM */

var FrontPage = React.createClass({
  render: function() {
    return (
<div className="container" id="index-page">
  <Carousel />
  <div className="row" id="presentation">
    <Presentation />
  </div>
  <div className="row" id="latest-news">
    <div className="col-md-4">
      <h3>Latest News</h3>
    </div>
    <div className="col-md-4"></div>
    <div className="col-md-4"></div>
  </div>
  <div className="row">
    <div className="col-md-3" id="events">
      <h3>Events</h3>
    </div>
    <div className="col-md-6">
      <div className="row" id="courses">
        <div className="col-md-6">
          <h3>Find Course</h3>
        </div>
      </div>
      <div className="row" id="materials">
        <div className="col-md-6">
          <h3>Materials</h3>
        </div>
      </div>
    </div>
    <div className="col-md-3" id="articles">
      <h3>Latest Articles</h3>
    </div>
  </div>
</div>
    );
   }
});