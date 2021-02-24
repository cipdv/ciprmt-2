require('dotenv').config();
//dependencies
const express = require ('express');
const cors = require ('cors');
const bcrypt = require ('bcryptjs');
const salt = bcrypt.genSaltSync(10);

//.env file has db variables
const db = require('./db');

const app = express();

//cors middleware
app.use(cors());

//express json middleware
app.use(express.json());

//root route
app.get("/", (req, res)=>{
    res.status(200).json(`It's working!`)
})

//1. send client profile form to client_profiles table
app.post("/api/1/clientprofiles", async (req, res)=>{
    try {
        const results = await db.query(
            "insert into client_profiles (first_name, last_name, email, service, reason_for_massage, other_hcp, cardio_none, high_blood_pressure, low_blood_pressure, heart_attack, vericose_veins, stroke, pacemaker, heart_disease, resp_none, chronic_cough, bronchitis, asthma, emphysema, skin_conditions, diabetes, epilepsy, cancer, arthritis, chronic_headaches, migraine_headaches, vision_loss, hearing_loss, osteoporosis, haemophilia, medical_conditions, loss_of_feeling, allergies, pregnant, medications, glutes, inner_thighs, abdomen, chest_wall, all_areas, sensitive_areas, privacy_policy, phone, date_of_birth, occupation, infectious_conditions, doctor_name, doctor_address, massage_history ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49) returning *", [req.body.first_name, req.body.last_name, req.body.email, req.body.service, req.body.reason_for_massage, req.body.other_hcp, req.body.cardio_none, req.body.high_blood_pressure, req.body.low_blood_pressure, req.body.heart_attack, req.body.vericose_veins, req.body.stroke, req.body.pacemaker, req.body.heart_disease, req.body.resp_none, req.body.chronic_cough, req.body.bronchitis, req.body.asthma, req.body.emphysema, req.body.skin_conditions, req.body.diabetes, req.body.epilepsy, req.body.cancer, req.body.arthritis, req.body.chronic_headaches, req.body.migraine_headaches, req.body.vision_loss, req.body.hearing_loss, req.body.osteoporosis, req.body.haemophilia, req.body.medical_conditions, req.body.loss_of_feeling, req.body.allergies, req.body.pregnant, req.body.medications, req.body.glutes, req.body.inner_thighs, req.body.abdomen, req.body.chest_wall, req.body.all_areas, req.body.sensitive_areas, req.body.privacy_policy, req.body.phone, req.body.date_of_birth, req.body.occupation, req.body.infectious_conditions, req.body.doctor_name, req.body.doctor_address, req.body.massage_history])
        res.status(201).json({
            status: "new client profile successfully added",
            data: {
                client_profile: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//2. retrieve list of client profiles from client_profiles table
app.get("/api/1/clientprofiles", async (req, res)=> {
    try {
        const results = await db.query ("select * from client_profiles")
        res.status(200).json({
            status: "here's a list of all the clients",
            results: results.rows.length,
            data: {
                clientProfiles: results.rows
            }
        })
    } catch (err) {
        console.log (err)
    }   
})

//3. retrieve a single client profile from client_profiles table along with all of their appointments
app.get("/api/1/clientprofiles/:id", async (req, res)=>{
    try {
        const clientProfile = await db.query ("select * from client_profiles where id = $1", [req.params.id])
        const appointments = await db.query ("select * from appointments where client_id = $1", [req.params.id])
        res.status(200).json({
            status: "here's a single client profile",
            data: {
                clientProfile: clientProfile.rows[0],
                appointments: appointments.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//4. update a single client profile from client_profiles table
//INCOMPLETE
app.put("/api/1/clientprofiles/:id", async (req, res)=> {
    try {
        const results = await db.query ("update client_profiles set first_name = $1, last_name = $2, email = $3, service = $4 reason_for_massage=$6 other_hcp=$7 where id = $5 returning *", [req.body.first_name, req.body.last_name, req.body.email, req.body.service, req.params.id, req.body.reason_for_massage, req.body.other_hcp])
        res.status(200).json({
            status: "successfully updated client profile",
            data: {
                client_profile: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//5. delete a single client profile from client_profiles table
//INCOMPLETE
app.delete("/api/1/clientprofiles/:id", async (req, res)=> {
    const results = await db.query ("delete from client_profiles where id = $1", [req.params.id])
    res.status(204).json({
        status: "file deleted"
    })
})

//6. search client_profiles for client profile by name
app.get("/api/1/clientprofile", async (req, res)=>{
    try {
        const {name} = req.query
        const clients = await db.query("select * from client_profiles where first_name ilike $1", [`%${name}%`])
        res.json(clients.rows)
    } catch (err) {
        console.log(err)
    }
})  

//7. add an appointment to client's profile
app.post("/api/1/clientprofile/:id/appointments", async (req, res)=>{
    try{
        const results = await db.query("insert into appointments (client_id, appointment_date, duration, price, treatment_purpose, findings, treatment, immediate_results, remex, treatment_plan, consent_for_treatment, time, credit, debit, cash_etransfer, send_receipt) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *", [req.body.client_id, req.body.appointment_date, req.body.duration, req.body.price, req.body.treatment_purpose, req.body.findings, req.body.treatment, req.body.immediate_results, req.body.remex, req.body.treatment_plan, req.body.consent_for_treatment, req.body.time, req.body.credit, req.body.debit, req.body.cash_etransfer, req.body.send_receipt])
        res.status(201).json({
            status: "appointment successfully added",
            data: {
                appointment: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//8. retrieve list of all client's appointments
// app.get("/api/1/clientprofile/:id/appointments", async (req, res)=>{
//     try {
//         const results = await db.query("select * from appointments where id=$1", [req.params.id])
//         res.status(200).json({
//             status: "here's a list of all the client's appointments",
//             results: results.rows.length,
//             data: {
//                 appointmentList: results.rows
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

// 9. retrieve a single appointment
app.get('/api/1/clientprofile/appointment/:id', async (req, res)=>{
    try {
        const result = await db.query("select * from appointments where appointment_id=$1", [req.params.id])
        res.status(200).json({
        status: "here's the appointment",
        data: {
            appointment: result.rows[0]
        }
    })
    } catch (error) {
        console.log(error)
    }
    
})

//10. update client's appointment

//11. delete client's appointment

//12. allow user to login to login table
app.post('/api/1/login', async (req, res)=>{
    if (!req.body.username || !req.body.password) {
        return res.status(400).json('missing fields')
    }
    try {
        const result = await db.query("select * from login where username = $1", [req.body.username])
        const isValid = bcrypt.compareSync(req.body.password, result.rows[0].hash);
        if (isValid) {
            res.status(200).json({
                status: 'login successful',
                data: {
                    user: result.rows[0].username
                }
            })           
        } else {
            res.status(400).json({
                status: 'login no bueno'
            })
        } 
    } catch(error) {
        console.log('unable to login')
    }
})

// 13. register RMT user
app.post('/api/1/register', async (req, res)=>{
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
        return res.status(400).json('missing fields')
    }
    try {
        const hash = bcrypt.hashSync(req.body.password, salt)
        const userProfile = await  db.query("insert into users (first_name, last_name, email) values ($1, $2, $3) returning *", [req.body.first_name, req.body.last_name, req.body.email])
        const userLogin = await db.query("insert into login (username, hash) values ($1, $2) returning *", [req.body.email, hash])
        res.json({
            status: "registered",
            data: {
                userProfile: userProfile.rows[0],
                userLogin: userLogin.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }   
})

//14. display user's dashboard
app.get('/api/1/dashboard/:id', (req, res)=>{

})

//.env file has port info
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
    console.log(`You're doing great Cip, keep it up :)`)
});

