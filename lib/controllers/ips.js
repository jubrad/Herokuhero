module.exports = function(app) {
  var Controller = { name: 'IpController' },
      IpModel = app.models.IpModel;
  
/*
  new controller is also the home page/ this only renders a view
*/
  Controller.new = function(req, res){
    //maybe this should have a create new ip
      res.render('ips/new')
  };


/*
  This saves an ip in the databasse
*/
  Controller.create = function(req,res) {
      IpModel.save(req.body,function(res){
        console.log(res);
      });
      res.redirect('ips/new')
  }
  
  return Controller;
}