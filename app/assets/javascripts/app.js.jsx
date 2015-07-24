//global object for storing Backbone entities
var Bb = {
  Models: {},
  Collections: {},
  Helpers: {}
};

var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

// main React component
var App = React.createClass({
  render: function () {
    return (
	        <RouteHandler />
    );
  }
});
