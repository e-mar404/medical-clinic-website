# Front end
## Patient Pages [Emilio + John + mohammad]

- [X] sign up 
    - Name
    - email
    - Address

- [X] log in 
- [ ] schedule appointment
- [ ] profile (view/edit)
- [ ] medical history page (view/edit)
- [X] not signed in navbar [Logo    log in]
- [X] signed in navbar [appointments    history    profile(contact info, sign out)] **only added sign out**
- [ ] query
    - query available appointments for a given clinic/doctor
    
## Employee Pages [John]

- [X] log in
- [X] not signed in navbar [logo    log in]
- [X] signed in navbar [appointments    sign out]  **only added sign out**

### Medical Employee

- [ ] view personal appointments for the day (or time period specified)
- [ ] ability to view patient history

### Receptionist

- [ ] view/modify all doctors' appointents for the day (or time period specifed) 

### Admin [Yesenia]

- [ ] dashboard view for managing who works at the clinic
- [ ] ability to add/remove employee
- [ ] reporting
    ideas
    - all appointments a doctor has at a clinic
    - all appointments a patient has had at a clinic
    - medications a patient has reveived 

# Back end [Emilio + mohammad]

- [x] Set up connection to local MySQL DB
- [x] Start up server at the same time that react is started
- [x] createPatientAccount
    - [x] createPatientContact
    - [x] createPatient
    - [x] createPatientLogin
    - [x] error handling for register

- [ ] authenticateUser() - when doing log in
    - [ ] localstore
        - [ ] type of user (admin, receptionist, nurse, doctor, patient)
        - [ ] id

    - [ ] error handling for login

- [x] createEmployeeAccount
    - [x] createEmployeeContact
    - [x] createEmployee
    - [x] createPatientLogin
    - [x] error handling for register

- [ ] get appointment filtered by:
    - [ ] date/time
    - [ ] doctor 
    - [ ] clinic


# Reporting 
- [x] appointment history
- [x] doctors and their patients
- [x] employees and what is their primary clinic
- [x] get employee by type
    - [x] all
    - [x] medical
    - [x] staff
- [x] compare clinics
    - [x] number of patients at a clinic

# Hosting [Mohammad]

- [ ] host MySQL db
- [ ] host website
