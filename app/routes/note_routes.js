// note_routes.js
module.exports = function(app, db) {
  app.post('/updatePackage', (req, res) => {
    const queryParam = {  
                    isdn: req.query.isdn, 
                    serviceCode: req.query.serviceCode, 
                    groupCode: req.query.groupCode,
                    packageCode: req.query.packageCode, 
                    commandCode: req.query.commandCode, 
                    regDatetime: req.query.regDatetime,
                    staDatetime: req.query.staDatetime, 
                    endDatetime: req.query.endDatetime, 
                    expireDatetime: req.query.expireDatetime,
                    status: req.query.status, 
                    channel: req.query.channel, 
                    charge_price: req.query.charge_price, 
                    message_send: req.query.message_send
                  };
    
    const regDatetimeUnix = convertDate(queryParam.regDatetime.toString());
    var endDatetimeUnix;
    var expireDatetimeUnix;
    // console.log(queryParam.staDatetime);
    // console.log(req.query.regDatetime);
    // res.send('hello');
    if(queryParam.endDatetime){
      endDatetimeUnix = convertDate(queryParam.endDatetime.toString());
    }
    const staDatetimeUnix = convertDate(queryParam.staDatetime.toString());
    if(queryParam.expireDatetime) {
      expireDatetimeUnix = convertDate(queryParam.expireDatetime.toString());
    }
    

      switch(req.query.packageCode.toString()) {
        //case 1N
        case "1n":
        case "1N":
        var updatePackage = {
        package: '1n',
        category: '0000001'
        };
        break;
        //case 7N
        case "7n":
        case "7N":
        var updatePackage = {
        package: '7n',
        category: '0000002'
        };
        break;
        
        //case 30N
        case "30n":
        case "30N":
        var updatePackage = {
        package: '30n',
        category: '0000003'
        };
        break;
        //case 3T
        case "3t":
        case "3T":
        var updatePackage = {
        package: '3t',
        category: '0000004'
        };
        break;

        //case 6T
        case "6t":
        case "6T":
        var updatePackage = {
        package: '6t',
        category: '0000005'
        };
        break;

        //case 12T
        case "12t":
        case "12T":
        var updatePackage = {
        package: '12t',
        category: '0000006'
        };
        break;
      }

// console.log(updatePackage);


    if(queryParam.status == 0) {

    } else if( queryParam.status == 1 ) {
     
     // create record for action_user collection
      const newUser_action_users = {
        msisdn: req.query.isdn,
        package: updatePackage.package,
        extend_last: 0,
        extend_count: 0,
        extend_auto: 1,
        extend_try: 0,
        sstm: regDatetimeUnix,
        ssid: 'test',
        status: 1,
        cancel: 0,
        type: 1,
        channel: req.query.channel,
        category: updatePackage.category,
        price: parseInt(req.query.charge_price),
        extend: 1,
        start_date: staDatetimeUnix,
        end_date: endDatetimeUnix,
        is_promotion: 1,
        step_max: 1,
        is_extending: false,
        last_extend: expireDatetimeUnix,
        notify_step: 0,
        charge_left: 0,
        last_extend_success: expireDatetimeUnix,
        password: Math.random().toString(36).slice(-6),
        step_1n: 1
      };

      //create record for action_register
      const newUser_action_register = {
          ssid: 'test_action_register',
          sstm: regDatetimeUnix,
          category: updatePackage.category,
          msisdn: req.query.isdn,
          action: 'reg',
          package: updatePackage.package,
          start_date: staDatetimeUnix,
          end_date: endDatetimeUnix,
          customer_type: 2,
          channel: req.query.channel,
          status: 1
      };

      // create record for action_charging
      const newUser_action_charging = {
        ssid: 9,
        sstm: regDatetimeUnix,
        msisd: req.query.isdn,
        package: updatePackage.package ,
        start_date: staDatetimeUnix,
        end_date: endDatetimeUnix,
        price: parseInt(req.query.charge_price),
        channel:req.query.channel,
        status: 1,
        result_code: (parseInt(req.query.charge_price) == 0)? 'PROMOTION':'CPS-0000' 
      };
      
      //create record for action_sms

      const newUser_action_sms = {
        msisdn : req.query.isdn,
        ssid: 'test action sms',
        sstm: regDatetimeUnix,
        channel: req.query.channel,
        content: req.query.message_send,
        com: 'dk',
        momt: 'mt',
        status: 1
      };

          // console.log(newUser);
      // insert to action_register
          db.collection('action_registers').insert(newUser_action_register, (err, result) => {
            if (err) { 
              return console.log(err.toString());
              } else {
              console.log('insert action_register OK');
              }
            });



      //insert to action_users
      db.collection('action_users').insert(newUser_action_users, (err, result) => {
          if (err) { 
            return console.log(err.toString());
            } else {
            console.log('insert action_users OK');
            }
          });

            //insert to action_chargind
      db.collection('action_charging').insert(newUser_action_charging, (err, result) => {
          if (err) { 
            return console.log(err.toString());
            } else {
            console.log('insert action_charging OK');
            }
          });
      

                  //insert to action_chargind
      db.collection('action_sms').insert(newUser_action_sms, (err, result) => {
          if (err) { 
            return console.log(err.toString());
            } else {
            console.log('insert action_sms OK');
            }
          });

    } else if (queryParam.status == 2) {

    } else {
      console.log("Truyen khong dung tham so");
    } 








    
    db.collection('user_chargingCSP').insert(queryParam, (err, result) => {
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
function convertDate(date_time) {
      const inputDate = date_time;
      const inputDateNew = inputDate.split(" ");
      const date = inputDateNew[0].split("/");
      const time = inputDateNew[1].split(":");
      const newDate = new Date(date[2],date[1]-1,date[0],time[0], time[1], time[2]);
      return newDate.getTime()/1000;
    };