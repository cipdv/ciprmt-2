import React, {useContext, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ClientProfileContext } from '../contexts/ClientProfileContext'
import ClientFilesApi from '../apis/ClientFilesApi'

const HealthHistory = () => {

    let history = useHistory();
    const {id} = useParams();
    const {selectedClientProfile, setSelectedClientProfile} = useContext(ClientProfileContext);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await ClientFilesApi.get(`/api/1/clientprofiles/${id}`)
                setSelectedClientProfile(response.data.data.clientProfile);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleReturnToClientList = () => {
        history.push(`/dashboard`)
    }

    return (
        <div>
            <div>
                <h2 className="tm30">{selectedClientProfile.first_name}'s Health History</h2>
                <table className="ui celled table tm30">
                    <thead>
                        <th>Reason for seeking Massage Therapy</th>
                        <th>Service</th>
                        <th>Treatment from other HCPs</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{selectedClientProfile && selectedClientProfile.reason_for_massage}</td>
                            <td>{selectedClientProfile && selectedClientProfile.service}</td>
                            <td>{selectedClientProfile && selectedClientProfile.other_hcp}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tm30">
                <h4>Cardiovascular</h4>
                <table className="ui celled table tm30">
                    <thead>
                        <th>None</th>
                        <th>High Blood Pressure</th>
                        <th>Low Blood Pressure</th>
                        <th>History of Heart Attack(s)</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{selectedClientProfile && selectedClientProfile.cardio_none ? "yes" : "no"}</td>
                            <td>{selectedClientProfile && selectedClientProfile.high_blood_pressure ? "yes" : "no"}</td>
                            <td>{selectedClientProfile && selectedClientProfile.low_blood_pressure ? "yes" : "no"}</td>
                            <td>{selectedClientProfile && selectedClientProfile.heart_attack ? "yes" : "no"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tm30">
                <button className="ui button teal">Appointments</button>
                <button onClick={handleReturnToClientList} className="ui button blue"><i className="chevron circle left icon"></i> Back to Dashboard</button>
            </div>
        </div>
    )
}

export default HealthHistory
