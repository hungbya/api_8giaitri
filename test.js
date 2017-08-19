    const regDatetimeUnix = converDate(queryParam.regDatetime);
    const staDatetimeUnix = converDate(queryParam.staDatetime);
    const endDatetimeUnix = converDate(queryParam.endDatetime);
    const expireDatetimeUnix = convertDate(queryParam.expireDatetime);
    if (req.query.packageCode == '1n' || req.query.packageCode == '1N' ){
      const updatePackage = {
        package: '1n',
        category: '0000001'
      }             
    };


    if(status == 0) {

    } else if( status == 1 ) {
      const newUser = {
        msisdn: req.query.isdn,
        package: updatePackage.package,
      }
    } else if (status == 2) {

    } else {
      console.log("Truyen khong dung tham so");
    } 






























// function converDate(date_time) {
//       const inputDate = date_time;
//       const inputDateNew = inputDate.split(" ");
//       const date = inputDateNew[0].split("/");
//       const time = inputDateNew[1].split(":");
//       const newDate = new Date(date[2],date[1]-1,date[0],time[0], time[1], time[2]);
//       return newDate.getTime()/1000;
//     };
// const d = '17/08/2017 15:30:26';
// const a = converDate(d);
// console.log(a);



// condition

// note_routes.js
module.exports = function(app, db) {
  app.post('/updatePackage', (req, res) => {
    // console.log(req.query);
    const regDatetimeUpdate = converDate(req.query.regDatetime);
    // console.log(regDatetimeUpdate);



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

// function coverDateTime 
function converDate(date_time) {
      const inputDate = date_time;
      const inputDateNew = inputDate.split(" ");
      const date = inputDateNew[0].split("/");
      const time = inputDateNew[1].split(":");
      const newDate = new Date(date[2],date[1]-1,date[0],time[0], time[1], time[2]);
      return newDate.getTime()/1000;
    };

