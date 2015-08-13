/* FieldView formatters */
Bb.Helpers.dateFormatter = function (data) {
  var date = new Date(data);
  var datePart =((date.getDate() < 10)?"0":"") + date.getDate() + '/' + (((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1) +"/"+ date.getFullYear();
  var timePart = ((date.getHours() < 10)?"0":"") + date.getHours() +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes();
  return datePart + " " + timePart;
};

Bb.Helpers.mapFormatter = function (data) {
  var src = 'https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=600x300&maptype=roadmap&markers=' +
    data[0] + ',' + data[1];
  return (<img src={src} />);
};

/* FieldEdit formatters */
Bb.Helpers.editStringFormatter = function (value, handler) {
  return (<input type="text" className="form-control" value={value}
  onChange={handler} />);
};

Bb.Helpers.editTextFormatter = function (value, handler, params) {
  var params = _.extend({rows: 3}, params);
  return (<textarea className="form-control" value={value}
  rows={params.rows}
  onChange={handler}></textarea>);
};

Bb.Helpers.editNumberFormatter = function (value, handler) {
  return (<input type="number" min="1" className="form-control" value={value}
  onChange={handler} />);
};

Bb.Helpers.capitalize = function (text) {
  return text[0].toUpperCase() + text.substring(1);
};
