# Presentation Layout 
## 1) Patient 
- registering 
- login
- make an appointment 
- show how they get charged if they get an appointment as a 'no show'
- cancelling an appointment
- show referral trigger code 
- show rejection of making appointment without a valid referral
- show successfull appointment creation with a valid referral
- appointment history
- no show appointment charges
- profile update
- view referrals

## 2) Receptionist
- login
- checking in patient
- view appointments
- create appointment for patient

## 3) Nurse
- login
- view appointments
- update medical history for patient 
- show inability to prescribe medication

## 4) Doctor/Specialist
- login
- making referral
- view appointments
- update medical history for patient 
- prescribe medication

## 5) Admin
- login
- generate reports
- create an employee account
  
### Other notes + other todos
- At the end of the presentation we need to state name and what we did for the project (i think it is a good idea if we present what we each worked on)
- Only one person contorlling computer while everyone talks vs we each take turns with the laptop (there is only one laptop)
- She takes notice if we are using localhost (we should use the hosted website and db, which i think we are good on this)
- we need to be ready to show something when she asks us to do something
- we present last so we have more time to prepare before presentation but less time to implement the feedback that she gives us
- make sure our data is good to be used for a presentation

# Front end
## Patient Pages [Emilio + John]

- [X] sign up 
- Name
- email
- Address

- [X] log in
- [ ] home page with cards:
- [ ] schedule appointment [Emilio]
- needs to check for occupied times
- [x] profile [John]
- [ ] appointment history
- [X] not signed in navbar [Logo    log in]
- [X] signed in navbar [appointments    history    profile(contact info, sign out)] **only added sign out**

## Employee Pages [John]

- [X] log in
- [X] not signed in navbar [logo    log in]
- [X] signed in navbar [appointments    sign out]  **only added sign out**

### Medical Employee
- [ ] home page with cards:
- [ ] appointment calendar (for themselves) [Mohammad]
- [x] referral request[Emilio]
- patient to refer to what doctor
- [ ] Edit medical history for patient [Emilio]

### Receptionist

- [ ] appointment calendar (for everyone at the clinic they work at) [Mohammad]  

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

- [ ] get appointment filtered by: [Mohammad]
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

# Hosting [Mohammad + Emilio]

- [x] host MySQL db
- [x] host website (https://clinic-website.up.railway.app/)
- [x] host backend (https://medical-clinic-backend.up.railway.app/)
