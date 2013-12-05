module.exports = function(app) {
  var IpController = app.controllers.IpController;
  
  app.get('/', function(req, res) {
    res.redirect('/ips/new');
  });
  
  app.get('/ips/new', IpController.new);
  app.post('/ips/create', IpController.create);
}