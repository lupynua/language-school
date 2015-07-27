Bb.Collections.Pages = Backbone.Collection.extend({
  url: "/api/v1/pages",
  model: Bb.Models.Page,

  initialize: function(props) {
    if (props && props.path) this.url += props.path;
  }
});
