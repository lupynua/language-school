// var BookForm = React.createClass({
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var title = React.findDOMNode(this.refs.title).value.trim();
//     var description = React.findDOMNode(this.refs.description).value.trim();
//     var status = React.findDOMNode(this.refs.status).value;
//     var user_id = React.findDOMNode(this.refs.user_id).value;

//     if (!title || !description) {
//       return;
//     }

//     this.props.onBookSubmit({
//       book: {
//         title: title,
//         description: description,
//         status: status,
//         user_id: user_id
//       }
//     });
//     React.findDOMNode(this.refs.title).value = '';
//     (function() {
//       var bodyTextArea = $("iframe").contents().find("body");
//       if (bodyTextArea) bodyTextArea.empty();
//     })();
//   },
//   render: function() {
//     return (
//       <form className="bookForm" onSubmit={this.handleSubmit}>
//         <div className="form-group">
//           <input className="form-control" type="text" placeholder="Title" ref="title"/>
//         </div>
//         <div className="form-group">
//           <textarea className="form-control" placeholder="Description" ref="description" id="book_description" rows="3"/>
//         </div>
//         <div className="form-group form-inline">
//           <select className="form-control btn-info" defaultValue="pub" ref="status">
//             <option value="pub">Public</option>
//             <option value="priv">Private</option>
//           </select>
//         </div>
//         <input type="hidden" ref="user_id" value="1"/>
//         <input className="btn btn-primary" type="submit" value="Post" />
//       </form>
//     );
//   }
// });