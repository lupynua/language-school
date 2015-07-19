var PictureNew = React.createClass({
  mixins: [ReactRouter.Navigation],
  addPicture: function(picture) {
  var pic = new Bb.Models.Picture();
    pic.save(picture.picture,{
         success: function(data) {
           this.transitionTo('/albums/' + this.props.params.albumId);
           console.log(data);  
         }.bind(this),
         error: function(xhr, status, error) {
           console.log(error);
         }.bind(this)
       });
  },
  render: function() {
    return (
      <div className='pictureNew'>
        <h2>New Picture</h2>
        <PictureForm handleSubmit={this.addPicture} buttonRole='Create picture' id = {this.props.params.albumId}/>
        <ToAlbums />
      </div>
    );
  }
});
