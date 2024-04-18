const { headers, PostData } = require('../utils');

async function createPatientAccount(req, res, db) {
  try {

    const body = await PostData(req);
    const { email, phone_number, address, password, first_name, last_name, date_of_birth, gender } = JSON.parse(body);

    console.log(`creating patient account with email: ${email}`);

    const email_address = await createPatientContact(email, phone_number, address, res, db);

    const patient_id = await createPatient(email_address, first_name, last_name, date_of_birth, gender, db);

    const msg = await createPatientLogin(email_address, password, patient_id, db);

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));


  } catch (err) {
    console.log(err);

    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

async function createPatientContact(email, phone_number, address, res, db) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO ContactInformation(email_address, phone_number, address) VALUES (?, ?, ?)',
      [email, phone_number, address], (err, db_res) => {
        if (err) {
          reject(`${err.sqlMessage.includes('Duplicate') ? 'There is already an account with that email' : 'Unkown error when making account'}`);
        }

        resolve(email);
      });
  });
}

async function createPatient(email, first_name, last_name, date_of_birth, gender, db) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Patient(email_address, first_name, last_name, date_of_birth, gender) VALUES (?, ?, ?, DATE ?, ?)',
      [email, first_name, last_name, date_of_birth, gender], async (err, db_res) => {
        if (err) {
          reject(`${err.sqlMessage.includes('Duplicate') ? 'There is already an account with that email' : 'Unkown error when making account'}`);
        }

        resolve(db_res.insertId);
      });
  });
}

async function createPatientLogin(email, password, patient_id, db) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Patient_Login(email_address, password, patient_id) VALUES(?, ?, ?)',
      [email, password, patient_id], (err, db_res) => {
        if (err) {
          reject(`${err.sqlMessage.includes('Duplicate') ? 'There is already an account with that email' : 'Unkown error when making account'}`);
        }

        resolve({
          email: email,
          id: patient_id
        });
      });
  });
}

async function loginPatient(req, res, db) {
  try {
    const body = await PostData(req);

    const { email, password } = JSON.parse(body);

    console.log(`logging in patient with email: ${email}`);

    db.query(`SELECT L.patient_id, P.first_name, P.last_name FROM Patient_Login L JOIN Patient P on L.email_address = P.email_address WHERE L.email_address='${email}' AND L.password='${password}';`,
      [email, password],
      (err, db_res) => {
        if (err) {
          console.log(err);

          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: 'Unkown error occured' }));
        } else {
          if (db_res.length === 0) {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ message: "No user found with provided credentials" }));
          } else {
            res.writeHead(200, headers);
            res.end(JSON.stringify({ message: db_res }));
            console.log("success");
          }
        }
      });
  } catch (err) {
    console.log(`patientController.js: ${err}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

function getPatientProfile(res, db, patient_id) {
  db.query(
    `
    SELECT
      P.patient_id, P.email_address, P.first_name, P.last_name, P.date_of_birth, P.gender, P.primary_doctor_id,
      CI.address, CI.phone_number,
      E.first_name AS doctor_first_name, E.last_name AS doctor_last_name
    FROM Patient P
    LEFT JOIN ContactInformation CI ON P.email_address = CI.email_address
    LEFT JOIN Employee E on P.primary_doctor_id = E.employee_id
    WHERE P.patient_id = ${patient_id};    
    `, (err, db_res) => {
    if (err) {
      console.log(err);

      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: 'Error when getting user profile' }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

function getPatientFinancial(res, db, patient_id) {
  db.query(
    `
    SELECT * FROM Patient_FinancialInformation WHERE patient_id = ${patient_id};    
    `, (err, db_res) => {
    if (err) {
      console.log(err);

      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: 'Error when getting user financials' }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

function getPatientEmergencyContacts(res, db, patient_id) {
  db.query(
    `
    SELECT * FROM Patient_EmergencyContacts WHERE patient_id = ${patient_id};    
    `, (err, db_res) => {
    if (err) {
      console.log(err);

      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: 'Error when getting user emergency contacts' }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

function getPatientCharges(res, db, patient_id) {
  console.log(patient_id);
  db.query(
    `
    SELECT 
    Charges.patient_id, Charges.invoice_num, Charges.date_charged, Charges.clinic_id, Charges.amount, Charges.charge_type, Charges.paid,
    Clinic.clinic_name
    FROM Charges
    LEFT JOIN Clinic ON Charges.clinic_id = Clinic.clinic_id
    WHERE patient_id = ${patient_id}
    ORDER BY Charges.date_charged;
  `, (err, db_res) => {
    if (err) {
      console.log(err);
      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: 'Error when getting user charges' }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

function getPatientInsurance(res, db, patient_id) {
  db.query(
    `
    SELECT * FROM Patient_InsuranceInformation WHERE patient_id = ${patient_id};    
    `, (err, db_res) => {
    if (err) {
      console.log(err);

      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: 'Error when getting user insurance' }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

async function getPatientId(db, email) {
  return new Promise((resolve, reject) => {
    db.query('SELECT patient_id FROM Patient WHERE email_address=?', [email], (err, db_res) => {
      if (err) {
        console.log(err);

        reject('Cant retrive patient');
        return
      }

      if (db_res.length === 0) {
        reject('Patient with that email was not found');
        return;
      }

      resolve(db_res[0].patient_id);
    });
  });
}


async function postPatientProfile(req, res, db) {
  try {
    const body = await PostData(req);

    const {
      patient_id, email_address, phone_number, address
    } = JSON.parse(body);

    console.log(patient_id, email_address, phone_number, address);
    db.query(`
      UPDATE ContactInformation SET phone_number = '${phone_number}', address = '${address}' WHERE email_address = '${email_address}';
  `, (err, result) => {
      if (err) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: err }));
      }
      else {
        res.writeHead(200, headers);
        res.end(JSON.stringify({ message: "Patient profile saved!" }));
      }
    });

  } catch (error) {
    console.log(`patientController.js: ${error}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ 'message': error }));
  }
}

async function postPatientEmergencyContacts(req, res, db) {
  try {
    const body = await PostData(req);

    const {
      patient_id, contact_name, contact_number, contact_relationship, action
    } = JSON.parse(body);

    if (action === "insert") {
      console.log(patient_id, contact_name, contact_number, contact_relationship, action);
      db.query(`
      INSERT INTO Patient_EmergencyContacts (patient_id, contact_name, contact_number, contact_relationship)
      VALUES (${patient_id}, '${contact_name}', '${contact_number}', '${contact_relationship}');`, (err, result) => {
        if (err) {
          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: err }));
        }
        else {
          res.writeHead(200, headers);
          res.end(JSON.stringify({ message: "Patient emergency contact added!" }));
        }
      });
    }
    else {
      console.log(patient_id, contact_name, contact_number, contact_relationship, action);
      db.query(`
      DELETE FROM Patient_EmergencyContacts
      WHERE patient_id = ${patient_id} AND contact_number = '${contact_number}';
      `, (err, result) => {
        if (err) {
          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: err }));
        }
        else {
          res.writeHead(200, headers);
          res.end(JSON.stringify({ message: "Patient emergency contact deleted!" }));
        }
      });
    }
  } catch (error) {
    console.log(`patientController.js: ${error}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ 'message': error }));
  }
}

async function postPatientFinancial(req, res, db) {
  try {
    const body = await PostData(req);

    const {
      patient_id, card_number, name_on_card, expiration_date, cvv, action
    } = JSON.parse(body);

    if (action === "insert") {
      db.query(`
      INSERT INTO Patient_FinancialInformation (patient_id, card_number, name_on_card, expiration_date, cvv)
      VALUES (${patient_id}, '${card_number}', '${name_on_card}', '${expiration_date}', '${cvv}')`, (err, result) => {
        if (err) {
          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: err }));
        }
        else {
          res.writeHead(200, headers);
          res.end(JSON.stringify({ message: "Patient credit card added!" }));
        }
      });
    }
    else {
      console.log(patient_id, card_number, name_on_card, expiration_date, cvv, action);
      db.query(`
      DELETE FROM Patient_FinancialInformation
      WHERE patient_id = ${patient_id} AND card_number = '${card_number}';
      `, (err, result) => {
        if (err) {
          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: err }));
        }
        else {
          res.writeHead(200, headers);
          res.end(JSON.stringify({ message: "Patient credit card deleted!" }));
        }
      });
    }
  } catch (error) {
    console.log(`patientController.js: ${error}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ 'message': error }));
  }
}

async function postPatientInsurance(req, res, db) {
  try {
    const body = await PostData(req);

    const {
      patient_id, group_number, policy_number
    } = JSON.parse(body);

    console.log(patient_id, group_number, policy_number);
    db.query(`
    INSERT INTO Patient_InsuranceInformation (patient_id, group_number, policy_number) 
    VALUES ('${patient_id}', '${group_number}', '${policy_number}')
    ON DUPLICATE KEY UPDATE group_number = '${group_number}', policy_number = '${policy_number}';
      `, (err, result) => {
      if (err) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: err }));
      }
      else {
        res.writeHead(200, headers);
        res.end(JSON.stringify({ message: "Patient profile saved!" }));
      }
    });

  } catch (error) {
    console.log(`patientController.js: ${error}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ 'message': error }));
  }
}

async function getPatientName(db, patient_id) {
  return await new Promise((resolve, reject) => {
    const query = 'SELECT P.first_name, P.last_name FROM Patient AS P WHERE P.patient_id=?';

    db.query(query, [patient_id], (err, db_res) => {
      if (err) {
        console.log(err);

        reject('Could not get patient information');
      }

      resolve(`${db_res[0].first_name} ${db_res[0].last_name}`);
    });
  });
}

async function getPatientMedicalHistory(res, db, patient_id) {
  try {

    console.log('getting patient info');

    const patient_name = await getPatientName(db, patient_id);

    console.log(`getting medical history for patient: ${patient_id}`);

    const medicalHistory = await new Promise((resolve, reject) => {
      db.query(`SELECT conditions, allergies, family_history FROM Patient_MedicalHistory WHERE patient_id=?`, [patient_id], (err, db_res) => {
        if (err) {
          console.log(err);

          reject(`Could not get patient's medical history`);
        }

        resolve((db_res.length > 0) ? db_res[0] : { conditions: 'no conditions listed', allergies: 'no allergies listed', family_history: 'no family history listed' });
      });
    });

    console.log('success getting medical history');

    const msg = {
      patient_name,
      ...medicalHistory,
    };

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  } catch(err) {

    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

async function updatePatientMedicalHistory(req, res, db) {
  try {

    const body = await PostData(req);
    const { conditions, allergies, family_history, patient_id } = JSON.parse(body);

    const needToCreateHistory = await patientHasHistory(patient_id, db);
    console.log(` need ot creat history: ${needToCreateHistory}`);

    if (needToCreateHistory) {
      console.log(`patient ${patient_id} doesnt have history creating new entry`);

      await createPatientMedicalHistory(patient_id, conditions, allergies, family_history, res, db);

      console.log('Medical history updated successfully');
      return;
    }

    console.log(`updating medical history for patient ${patient_id}`);

    const msg = await new Promise((resolve, reject) => {
      db.query('UPDATE Patient_MedicalHistory SET conditions=?, allergies=?, family_history=? WHERE patient_id=?', [conditions, allergies, family_history, patient_id], (err, db_res) => {
        if (err) {
          console.log(err);

          reject(`Could not update patient's medical history`);
        }

        resolve('Medical History updated successfully');
      });
    });

    console.log(msg);

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  } catch (err) {

    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

async function patientHasHistory(patient_id, db) {
  return new Promise((resolve, reject) => {
    db.query('SELECT patient_id FROM Patient_MedicalHistory WHERE patient_id=?', [patient_id], (err, db_res) => {
      if (err) {
        console.log(err);

        reject(false);
      }

      resolve(db_res.length === 0);
    });
  });
}

async function createPatientMedicalHistory(patient_id, conditions, allergies, family_history, res, db) {
  try {
    const msg = await new Promise((resolve, reject) => {
      db.query('INSERT Patient_MedicalHistory(patient_id, conditions, allergies, family_history) VALUES(?, ?, ?, ?)', [patient_id, conditions, allergies, family_history], (err, db_res) => {
        if (err) {
          console.log(err);

          reject(`Could not update patient's medical history`);
          return;
        }

        resolve('Successfully created patient medical history record');
      });
    });

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  } catch (err) {

    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

function getPatientAppointmentHistory(res, db, patient_id) {
  db.query(
    `
      SELECT
      A.appointment_id, A.appointment_date, A.appointment_status, A.clinic_id, A.doctor_id, A.appointment_time, A.confirmation,
          E.first_name, E.last_name,
          C.clinic_name
      FROM Appointment A
      JOIN Employee E ON A.doctor_id = E.employee_id
      JOIN Clinic C on A.clinic_id = C.clinic_id
      WHERE A.patient_id = ${patient_id}
      ORDER BY A.appointment_date DESC;    
    `, (err, db_res) => {
    if (err) {
      console.log(err);

      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: 'Error when getting user appointments' }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

function getPrimaryDoctorForPatient(res, db, patient_id) {
  console.log('getting primary doctor');

  const query = 'SELECT P.primary_doctor_id as employee_id, D.first_name, D.last_name FROM Patient AS P, Employee AS D WHERE patient_id=? AND D.employee_id=P.primary_doctor_id';

  db.query(query, [patient_id], (err, db_res) => {
    if (err) {
      console.log(err);

      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: 'Error when getting user appointments' }));
      return;
    }

    const msg = (db_res.length > 0) ? db_res : 'No primary doctor';

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  });

  console.log('successfully got primary doctor');
}

async function updatePrimaryDoctor(req, res, db) {
  try {
    const body = await PostData(req);
    const { patient_id, primary_doctor_id } = JSON.parse(body);

    const msg = await new Promise((resolve, reject) => {
      const query = 'UPDATE Patient SET primary_doctor_id=? WHERE patient_id=?';

      db.query(query, [primary_doctor_id, patient_id], (err, db_res) => {
        if (err) {
          console.log(`error updating primary doctor: ${err}`);

          reject('Could not update primary doctor for patient');
        }

        resolve('Successfully updated primary doctor');
      });

    });

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  } catch (err) {
    res.writeHead(200, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

async function updatePrimaryDoctorAfterTransfer(req, res, db){
  try {
    const body = await PostData(req);
    const { new_doctor, old_doctor } = JSON.parse(body);
    //let old_d = old_doctor;
    //let new_d = new_doctor
    const query = 'UPDATE Patient SET primary_doctor_id =? WHERE primary_doctor_id = ?';
    console.log(`Transfer Patients with old ${new_doctor} to new ${old_doctor}`);
  
    db.query(query, [new_doctor, old_doctor], (err, db_res) => {
      if(err){
        console.log(`${new_doctor}, ${old_doctor}`);
        throw (err);
      }
      res.writeHead(200, headers);
      res.end(JSON.stringify ({ message: db_res}));
    }); 
    
  }
  catch (err) {
    res.writeHead(400, headers);
    res.end(JSON.stringify ({ error: `${err.name}: ${err.message}` }));
  }
}

module.exports = { 
  createPatientAccount,
  loginPatient,
  getPatientId,
  getPatientProfile,
  postPatientProfile,
  getPatientFinancial,
  postPatientFinancial,
  getPatientEmergencyContacts,
  postPatientEmergencyContacts,
  getPatientInsurance,
  postPatientInsurance,
  getPatientCharges,
  getPatientMedicalHistory,
  updatePatientMedicalHistory,
  getPatientAppointmentHistory,
  getPrimaryDoctorForPatient,
  updatePrimaryDoctor, 
  updatePrimaryDoctorAfterTransfer
};
