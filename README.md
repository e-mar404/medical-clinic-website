# Getting Started 
To run this locally clone the repo:

```
git clone --depth=1 https://github.com/e-mar404/medical-clinic-website.git
```

note: it has depth=1 just for it to download faster, if you are wanting all commit history then dont add that option.

After the repo is cloned locally cd into the root of the repo. The rest of these commands assume that you are at the root of the dir.

*MySQL and node should already be installed*
If you dont have it installed:
- Install MySQL: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/installing.html
- Node: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs

## Setting up mysql

The file `Medical Clinic Database.sql` contains our sql dump that can be used to set up the schema on mysql.
There are two ways to set up either by command line or with the mysql workbench.

### Command line
```
mysql < 'Medical Clinic Database.sql' -u root -p
```

### MySQL Workbench
Documentation to import data into workbench: https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html

## Environment Set Up 
After thy mysql db is set up on the root of the directory `/` we need to add a .env file with the following variable declaration:
```
REACT_APP_BACKEND_HOST=
```

Our hosted website deploys from main and it has this env variable to point to our backend host but because it is local we add nothing. If we were to not add this env var then the application does not work since it does not know where to point to.

After that the next env file we need to add is under server `/server/.env`. This env file will contain the information to connect to the db like so:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<password>
DATABASE=mdb
```

That uses the default mysql port, if you use a different port to connect to mysql this is where to set it. Dont forget to change `<password>` to your passsword to connect to mysql. 

# Running the Application
To run the application go to the root of the git directory run the following commands to install dependencies and then start up the application.

```
npm install
npm start
```

# Presentation Layout 
## 1) Patient 
- [ ] registering 
- [ ] login with new patient
- [ ] make an appointment for future
- [ ] make an appointment for 'no show' (do it pretty close to the current time)
- [ ] try to make appointment with any specialist (get rejected)
- [ ] sign in as patient1 
- [ ] make an appointment with Cardiologist
- [ ] show referral trigger code 
- [ ] show profile stuff

```
show create trigger mdb.Appointment_CheckForReferral;
```

## 2) Receptionist
- [ ] login
- [ ] view appointments
- [ ] change appointment status
- [ ] show billing page + payment
- [ ] print referrals and billing receipts

## 3) Doctor/Specialist
- [ ] login
- [ ] making referral (john is not there)
- [ ] view appointments
- [ ] update medical history for patient 
- [ ] prescribe medication
- [ ] set john's pd to me
- [ ] make referral (john is there now)

## 4) Nurse
- [ ] login
- [ ] view appointments
- [ ] show no show appointment trigger 

```
show Events from mdb;
show create procedure mdb.check_for_no_show_appointments;
show create trigger mdb.Appointment_ChargePatientForNoShow;
```

- [ ] update medical history for patient 
- [ ] show inability to prescribe medication

## 5) Admin
- [ ] login
- [ ] make new doctor 
- [ ] transfer old doctor stuff to new doctor
- [ ] generate reports
  
### Other notes + other todos
- At the end of the presentation we need to state name and what we did for the project (i think it is a good idea if we present what we each worked on)
- Only one person contorlling computer while everyone talks vs we each take turns with the laptop (there is only one laptop)

- [x] host website (https://clinic-website.up.railway.app/)
- [x] host backend (https://medical-clinic-backend.up.railway.app/)
