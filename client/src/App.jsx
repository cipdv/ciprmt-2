import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Homepage from './routes/Homepage'
import ThanksForBooking from './routes/ThanksForBooking'
import Dashboard from './routes/Dashboard'
import ClientProfile from './routes/ClientProfile'
import AppointmentsRoute from './routes/AppointmentsRoute'
import { ClientProfileContextProvider } from './contexts/ClientProfileContext'
import HealthHistory from './components/HealthHistory'
import AppointmentDetails from './routes/AppointmentDetails'
import LoginPage from './routes/LoginPage'
import Register from './routes/Register'
import PrivacyPolicy from './components/PrivacyPolicy'
import AddAppointment from './components/AddAppointment'

 
 const App = () => {
   return (
     <ClientProfileContextProvider>
      <div className="ui container tm30">
        <Router>
            <Switch>
              <Route exact path="https://tranquil-mountain-56491.herokuapp.com/" component={Homepage}/>
              <Route exact path="/massagedetails" component={ThanksForBooking}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/dashboard/profile/:id" component={ClientProfile}/>
              <Route exact path="/dashboard/profile/:id/appointments" component={AppointmentsRoute}/>
              <Route exact path="/dashboard/profile/healthhistory/:id" component={HealthHistory}/>
              <Route exact path="/dashboard/profile/:id/appointmentdetails/:id" component={AppointmentDetails} />
              <Route exact path="/dashboard/login" component={LoginPage} />
              <Route exact path="/dashboard/register" component={Register} />
              <Route exact path="/privacypolicy" component={PrivacyPolicy} />
              <Route exact path="/dashboard/profile/:id/addappointment" component={AddAppointment} />
            </Switch>
        </Router>
      </div>
     </ClientProfileContextProvider>
   )
 }
 
 export default App
 