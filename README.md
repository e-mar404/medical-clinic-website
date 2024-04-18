# Presentation Layout 
## 1) Patient 
-[ ] registering 
-[ ] login with new patient
-[ ] make an appointment for future
-[ ] make an appointment for 'no show' (do it pretty close to the current time)
-[ ] try to make appointment with any specialist (get rejected)
-[ ] sign in as patient1 
-[ ] make an appointment with Cardiologist
-[ ] show referral trigger code 
-[ ] show profile stuff

```
show create trigger mdb.Appointment_CheckForReferral;
```

## 2) Receptionist
-[ ] login
-[ ] view appointments
-[ ] change appointment status
-[ ] show billing page + payment
-[ ] print referrals and billing receipts

## 3) Doctor/Specialist
-[ ] login
-[ ] making referral (john is not there)
-[ ] view appointments
-[ ] update medical history for patient 
-[ ] prescribe medication
-[ ] set john's pd to me
-[ ] make referral (john is there now)

## 4) Nurse
-[ ] login
-[ ] view appointments
-[ ] show no show appointment trigger

```
show Events from mdb;
show create procedure mdb.check_for_no_show_appointments;
show create trigger mdb.Appointment_ChargePatientForNoShow;
```

-[ ] update medical history for patient 
-[ ] show inability to prescribe medication

## 5) Admin
-[ ] login
-[ ] make new doctor 
-[ ] transfer old doctor stuff to new doctor
-[ ] generate reports
  
### Other notes + other todos
- At the end of the presentation we need to state name and what we did for the project (i think it is a good idea if we present what we each worked on)
- Only one person contorlling computer while everyone talks vs we each take turns with the laptop (there is only one laptop)

- [x] host website (https://clinic-website.up.railway.app/)
- [x] host backend (https://medical-clinic-backend.up.railway.app/)
