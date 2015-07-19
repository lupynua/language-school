var Album = React.createClass({
  mixins: [ReactRouter.Navigation],
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
      }.bind(this),
      error: function(model, response, options) {
        console.log(response.status);
      }
    });
  },
  componentWillUnmount: function () {
    this.album.off('change');
  },

  onDeleteAlbum: function(id) {
    var confirmation = confirm("Are you sure?");
    if(confirmation == true) {
      var album = new Bb.Models.Album({id: id}); {/*some starnge bugs here O_O. solved: write dataType: "text" */}
      album.destroy({
        success: function(model, response, options) {
          this.transitionTo('albums');
        }.bind(this),
        error: function(model, response, options) {
        }.bind(this),
        dataType: "text"
      });
    }
    else {
      return;
    }
  },

  render: function () {
    return (
      <div>
        <AlbumShow title = {this.state.album.title}
                   description = {this.state.album.description}
                   album = {this.state.album} />
                   <div className='row'>
                     {this.state.pictures.map(function(picture) {
                        return <div className='col-md-3' id='showAlbum' key = {picture.id} ><img src={picture.image.url} /></div>;
                     })}
                   </div>
        <div className='well' >
          <ToAlbums />
          <button className='btn btn-default' onClick={this.onDeleteAlbum.bind(this, this.state.album.id)} >Delete</button>
          <ToAlbumEdit id= {this.state.album.id} />
          <ToNewPicture id= {this.state.album.id} />
        </div>
      </div>
      );
  }
});

var AlbumShow = React.createClass({
  render: function () {
    return (
      <div>
         <AlbumTitle title = {this.props.title} />
         <AlbumDescription description = {this.props.description} />
      </div>
    );
  }
});

var ToAlbums = React.createClass({
  render: function() {
    return <Link to={'albums'}>To albums</Link>
  }
});
var ToAlbumEdit = React.createClass({
  render: function() {
   return (<Link className='btn btn-default' to={'/albums/'+ this.props.id +'/edit'} >Edit</Link>
   );
  }
});

var ToNewPicture = React.createClass({
  render: function() {
   return (<Link className='btn btn-default' to={'/albums/'+ this.props.id +'/pictures/new'} >Add picture</Link>
   );
  }
});
