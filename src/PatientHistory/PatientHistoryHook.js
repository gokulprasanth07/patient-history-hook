import { useEffect, useState } from "react";
import {URLS} from "./constants.js";

const usePatientHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [patientData, setPatientData] = useState([]);

    const fetchPatientHistoryData = () => {
        setIsLoading(true);

        fetch(URLS.PATIENT_HISTORY_API_URL)
        .then(res => res.json())
        .then(data => {
            if(data){
                // console.log(">>> patient data >", data);
                setPatientData(data);
            }
        })
        .catch(e => console.error(e))
        .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetchPatientHistoryData();
    }, []);


    return [patientData, setPatientData, isLoading];
}


export default usePatientHistory;