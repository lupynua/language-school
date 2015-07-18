var Album = React.createClass({
  getInitialState: function () {
    return {
      album: {}, 
      pictures: []
    };
  },
  componentDidMount: function () {
    this.album = new Bb.Models.Album({id: this.props.params.albumId});
    this.album.fetch({
      success: function(model, response, options) {
        this.setState({ album: model.toJSON(), pictures: model.toJSON().pictures});
         // console.log(model.toJSON().pictures);
      }.bind(this),
      error: function(model, response, options) {
        console.log(response.status);
      }
    });  
  },
  componentWillUnmount: function () {
    this.album.off('change');
  },

  render: function () {
    return (
      <div>
        <AlbumShow title = {this.state.album.title}
                   description = {this.state.album.description}
                   album = {this.state.album} /> 
                   {this.state.pictures.map(function(picture) {
                      return <div className='col-md-3' id='showAlbum'><img src='/uploads/picture/image/30/sample.jpg' key = {picture.id} /></div>;
                   })}      
      </div>
      );
  }
});

var AlbumNew = React.createClass({
  render: function() {
    return <h1>New album</h1>
  }
});

var NewAlbum = React.createClass({
  render: function() {
    return (
      <Link to={'new'}>New album</Link>
    );
  }
});

var AlbumShow = React.createClass({
  render: function () {
   // console.log(this.props.pictures);
    return (
      <div>
         <AlbumTitle title = {this.props.title} />
         <AlbumDescription description = {this.props.description} />
      </div>
    );
  }
});

var Pic = React.createClass({
  render: function() {
    return(
      <div className='row'>
      
      </div>
    );
  }
});
