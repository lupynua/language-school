LanguageSchool.Collections.Books = Backbone.Collection.extend({

  
  url: '/api/v1/books',
  model: LanguageSchool.Models.Book,
   // initialize: function(){
   //      alert("Books initialize")
   //   }

});
