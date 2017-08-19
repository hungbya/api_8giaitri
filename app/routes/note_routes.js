// note_routes.js
module.exports = function(app, db) {
  app.post('/updatePackage', (req, res) => {
    console.log(req.query);
    const note = {  isdn: req.query.isdn, 
                    serviceCode: req.query.serviceCode, 
                    groupCode: req.query.groupCode,
                    packageCode: req.query.packageCode, 
                    commandCode: req.query.commandCode, 
                    regDatetime: req.query.regDatetime,
                    staDatetime: req.query.staDatetime, 
                    endDatetime: req.query.endDatetime, 
                    expireDatetime: req.query.expireDatetime,
                    status: req.query.status, channel: req.query.channel, 
                    charge_price: req.query.charge_price, 
                    message_send: req.query.message_send};
    db.collection('user_chargingCSP').insert(note, (err, result) => {
      if (err) { 
        res.send('#'); 
      } else {
        res.send('1');
      }
    });
  });

    app.post('/forwardMessage', (req, res) => {

    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};