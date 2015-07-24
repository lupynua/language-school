var ArticlesDisplay = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
        <div class="list-group">
          <a href="#" className="list-group-item">
            <div className='btn-group pull-right'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
            </div>
            <h4 className="list-group-item-heading">Article 1</h4>
            <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
          <a href="#" className="list-group-item">
          <div className='btn-group pull-right'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
            </div>

            <h4 className="list-group-item-heading">Article 2</h4>
            <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
          <a href="#" className="list-group-item">
          <div className='btn-group pull-right'>
                <button className="btn btn-default btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
            </div>

            <h4 className="list-group-item-heading">Article 3</h4>
            <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
        </div>
        </div>
      </div>
    );
  }
});

var ArticlesAdd = React.createClass({
  render: function() {
    return (
      <form action="/users">
          <div className="field">
            <label htmlFor="user_email">Article title</label><br />
            <input className='form-control' name="" id=''/>
          </div>
          <div className="field">
            <label htmlFor="text">Article content</label>
            <textarea className='form-control' name="" id="text" />
          </div>

          <br />
          <div className="actions">
            <input className='btn btn-default btn-submit' type="submit" name="commit" value="Add article" />
          </div>
        </form>
    );
  }
});
