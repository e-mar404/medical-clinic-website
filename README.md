# Front end
## Patient Pages [Emilio + John]

- [X] sign up 
    - Name
    - email
    - Address

- [X] log in
- [ ] home page with cards:
    - [ ] schedule appointment
    - [ ] profile
    - [ ] appointment history
- [X] not signed in navbar [Logo    log in]
- [X] signed in navbar [appointments    history    profile(contact info, sign out)] **only added sign out**
    
## Employee Pages [John]

- [X] log in
- [X] not signed in navbar [logo    log in]
- [X] signed in navbar [appointments    sign out]  **only added sign out**

### Medical Employee
- [ ] home page with cards:
    - [ ] appointment calendar (for themselves) 
    - [ ] referral request

### Receptionist

- [ ] appointment calendar (for everyone at the clinic they work at)  

### Admin [Yesenia]

- [ ] home page with cards:
    - [ ] Report 
    - [ ] Manage employee
- [ ] Report page (dropdown/pass admin id through url as /reports/{type}/{adminid})
    - [ ] appointment history
    - [ ] doctors and their patients
    - [ ] employees and what is their primary clinic
    - [ ] get employee by type
    - [ ] number of patients at clinic 
    - [?] medications a patient has reveived 

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
