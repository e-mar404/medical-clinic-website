# Medical Clinic
Team 16
Emilio Marin, John Pham, Yesenia Rodriguez, Mohammad Bakeer

## Types of data that can be added, modified, and edited

Since we are a clinic we have to keep track of the medical history of our patients, which is why most of it is text-based. Patient’s medical history can be modified, they can get prescribed medications or when they don’t need that medication the prescription can be deleted. 

The patient portal includes: profile management, appointment creation, appointment history, and view of charges. Within the profile management section is where most of the add/modify/delete statements are for the patient: the patient can modify their information regarding contact information/insurance information, add and delete multiple financial credit cards and emergency contacts.

The receptionist can create documents based on the data that we have on our db and that is shown on the screen. They can create a receipt pdf for the last charge that was paid. As well as creating a referral receipt pdf that prints out clinic and patient information like their insurance info (and if they don’t have any it shows ’no insurance information’ and doesn't just show null or black).

We are also able to add new employee account data. When transferring a non-specialist doctor, we check if that doctor has any patients that need to be transferred and modify the primary doctor for those patients. The employee’s primary clinic can be modified when they are transferred to a different primary clinic. 

## Types of user roles in application	

From researching our domain we found out that there would be 5 different users using our medical clinic applications: patients, receptionists, doctors, nurses, and a clinic admin. The patients have their own page to log in, but the employees have a single sign-in page so through there we determine what type of user is signed in and redirect them to their appropriate home page.
	
### Patient
**Appointment History:** Allows the patient to view their appointments with detailed information regarding the date set, the status of their appointment (completed/canceled/no-show), the location of the clinic, the doctor in charge of administering treatment to them, the time of the appointment, and whether or not they were marked as present in person during the time of appointment (confirmation).

**Profile:** 
-   The patient is able to view their personal information that they signed up with such as their name, email address, date of birth, gender, phone number, and street address. Phone number and street address is modifiable while the other details are not. Additionally, there is a primary doctor field that the receptionist can set. 
-   The patient has a financial information tab that allows them to create and/or delete multiple credit cards at once each containing the fields “card number”, “name on card”, “expiration date (mm/yy)” and “cvv”.
-   The emergency contact information tab is similar to the financial information tab in which you can add or delete multiple contacts. The fields contain “contact name”, “contact relationship”, and “contact number”.
-   Lastly, the insurance information tab contains “group number” and “policy number”.
-   Schedule Appointment: The patient is able to schedule an appointment with fields “clinic”, “doctor”, “date (yyyy-mm-dd)” and “time”. They CANNOT schedule an appointment with a specialist if they do not have a referral given by another doctor due to a trigger.

**View Charges:** The patient is able to view charges. A patient can receive charges to two reasons: completion of an appointment/treatment and not showing up to an appointment 15 minutes after the time set. The charge information includes: “invoice number”, “date charged”, “charge type”, “clinic name”, “amount due”, and “paid”. If the patient wishes to pay for a charge, they must contact the receptionist.

### Medical Users
Doctors and nurses have fairly similar functionality that they could be both described as a single medical user but with some key differences. 	

The doctor’s homepage has 2 different view cards: view appointments and create referrals. On the appointment calendar the doctor can see the list of their appointments, in which, the patient name for that appointment is a link that takes them to the medical history profile for that patient. This is where we can change their medical history, prescribe medications and change their primary doctor (this is used for referrals). 

Even with doctors there are two types, a specialist and a general doctor. Only difference between those two doctors is that  patients can only make appointments with specialists if they have a valid referral (Semantic constraint). Other than this specialists have the same permissions and views as regular doctors.

For the nurse’s view they also have the same two view cards but because they are a user type of nurse, the application gives them a different view after clicking on the view card. If they go to their appointment calendar they see the clinic’s appointment since patients don’t make appointments to go see them specifically so they could be helping out multiple patients that might see different doctors. As for the referrals view they don’t have the permissions to give a referral to a patient so similar to the receptionist they can see a list of the available referrals.

### Receptionist
Appointment calendar shows the appointments made to the specific clinic that the receptionist works for. She has the ability to change the status of the appointment and make an appointment. If you want to make an appointment you have to use a patient email that is already registered with the company. If you leave an appointment on scheduled status 15 minutes after the time of the appointment passes the patient will be charged $15 and the appointment will be set as a no show (semantic constraint). If you change it to complete they will be charged $100.

To view charges go to the billing panel. You can see the charges updated and when the patient pays all the receptionist has to do is log how much that patient paid. Once you do that you will be allowed to download a pdf of the receipt. 

Receptionists can view the referrals made by a patient's primary doctor. After selecting the referral she wants, you are then allowed to download the referral as a PDF to send to the specialist and give a copy to the patient. 

### Administrator
After being redirected to their homepage administrators have the ability to view the 
employees of the clinic they are assigned to, reports, and clinic information. The admin can see information regarding the entire clinic. 

In our employee list, we display some identifying information about the employee, including their first name, last name, and job role. The administrator is the only one who can create new employee accounts, as we do not want unauthorized people to be able to register as employees for our clinics. Our employees are given one of four roles: doctor, nurse, receptionist, or administrator. If the administrator chooses to add a new doctor, they can choose between making them a specialist or not. For the employees that fall under the doctor category, we can access their appointments or choose to transfer them to another clinic. The ability to transfer employees is strictly given to an administrator because they have to decide what clinic to transfer the doctor to and then choose a non-specialist doctor to transfer the current doctor’s patients to. After a doctor is transferred they will be removed from the current employee list and have their upcoming appointments canceled. 

The reports view is unique to the administrator.  It allows them to view the three reports made available to them. All of our reports have been made with a specific purpose that will be expanded on during the report section of our project document. The reports can be filtered through with the start date and end date selected by the user. 

Lastly, the administrator has a view of the clinic they are working on which includes the name of their current clinic and set hours.
 
## Reports and Data Queries

The reports we included in our project are as follows: new patient accounts created, the total appointments per clinic, and the clinic revenue. 

The new patient accounts report uses the data from the Patient, Appointment, and Employee tables. We created this report to allow the administrator to check how many people have signed up for the website. Additionally, the report displays if the patient has scheduled an appointment by checking if the patient’s unique ID exists in the Appointment table. 
The second report, which displays the total appointments per doctor, pulls data from the Employee and Appointment tables. The benefit of providing this type of report to the administrator is that it presents data to see the total appointments a doctor has scheduled during the selected timeframe. Our administrator can then draw their own conclusions based on which doctor has a higher appointment count. 

Our final report deals with the clinic revenue, which can be divided into the revenue from complete appointments and the no-show fees. Our revenue report pulls data from the Charges and Patient tables. As shown in one of our triggers, our clinic charges patients if they are more than 15 minutes late to their scheduled appointment. The complete appointments are those that the receptionist confirms as “complete.” By tracking this data, the admin can see the source of the clinic’s revenue. Furthermore, when displaying the revenue, we include more information about what invoices are being taken into consideration based on the dates selected by the administrator. 

All our reports are specific to the clinic of the administrator who is currently logged in. We use the administrator’s unique primary key to find the clinic that they oversee to then be able to pull the correct data within the selected timeframe.

## Semantic Constraints

The two business rules that we focused on were: patients can only make an appointment with a specialist if they have a valid referral from their primary doctor and if a patient missed their appointment time by 15 minutes they will get charged a no show fee and will have to reschedule.
	
In order to implement the referral semantic constraint we have a trigger that runs before any insert operation on our Appointment table. This trigger checks our Referrals table for the existence of a tuple with the patient_id of the patient making the appointment, a doctor_id from their primary_doctor (which is found on the patient’s profile), if such a tuple exists then we check for the expiration_date of those referrals. If there isn’t a valid referral tuple then we deny the insert operation and send a message to let the patient know that they need a valid referral and to please contact their primary doctor.

The other semantic constraint we focused on was for no show appointments. This constraint required a bit more than just a trigger since it dealt with a repeating action that was based on time. In order to have a recurring action happen we made an event that goes off every 15 minutes. The event calls a procedure with the clinics open and closed times as parameters in order to only run when the clinic is open since there is no need for this check to run outside business hours. The procedure then sets the appointment status on any past appointments that have a status of ‘scheduled’ and are past their appointment time by 15 minutes. This is why if the receptionist sets the appointment status as confirmed (or canceled) then they wouldn’t be charged a no show fee. We also have a trigger on the Appointment table that runs after an update to check if the appointment status was changed to a ‘no show’ and if they already have a charge on our Charges table for the appointment date. If they don’t have a charge then we go ahead and automatically charge them $15.
