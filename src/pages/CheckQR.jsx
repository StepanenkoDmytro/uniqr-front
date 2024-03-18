import { useEffect, useState } from "preact/hooks";
import { Loader } from '../components/index.js';
import apiService from "../services/ApiService";
import SessionComponent from "../components/SessionComponent/SessionComponent.jsx";

export default function CheckQR() {
    const[qrInfo, setQrInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchQrInfo = async () => {
        const pathname = window.location.pathname;
        const idIndex = pathname.lastIndexOf('/');
        const idQR = pathname.substring(idIndex + 1);

        setIsLoading(true);
        try{
            const qrInfo = await apiService.checkQR(idQR);
            setQrInfo(qrInfo);
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchQrInfo();
    }, [])
    return (
        <>
        {isLoading || !qrInfo
            ? <Loader />
            : <div>
                <p>ID: {qrInfo.id}</p>
                <p>Created: {qrInfo.created}</p>
                <p>Dates: {qrInfo.dates}</p>

                <SessionComponent sessionInfo={qrInfo.sessionDTO} />
              </div>
        }
        </>);
}