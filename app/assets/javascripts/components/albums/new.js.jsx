var AlbumNew = React.createClass({
  render: function() {
    return (
      <div className='albumNew'>
        <h2>New Album</h2>
        <AlbumForm handleSubmit={this.addAlbum} buttonRole='Create album'/>
        <ToAlbums />
      </div>
    );
  }
});
