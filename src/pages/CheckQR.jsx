import { useEffect, useState } from "preact/hooks";
import { Loader } from '../components/index.js';
import apiService from "../services/ApiService";
import SessionComponent from "../components/SessionComponent/SessionComponent.jsx";
import './CheckQR.css';

export default function CheckQR() {
    const [qrInfo, setQrInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchQrInfo = async () => {
        const pathname = window.location.pathname;
        const idIndex = pathname.lastIndexOf('/');
        const idQR = pathname.substring(idIndex + 1);
        
        setIsLoading(true);
        try{
            const infoQR = await apiService.checkQR(idQR);
            
            setQrInfo(infoQR);
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
                <SessionComponent sessionInfo={qrInfo.sessionDTO} />
                <section>
                    {qrInfo.dates.length === 0 
                    ? <p class="first-check">Поздравляем с покупкой. У вас оригинальньій товар!</p>
                    : <div class="d-flex justify-center flex-column">
                        <p class="multi-check">Этот товар уже проверялся {qrInfo.dates.length}-раз(a).</p>
                        <p class="multi-check">Если это были не вы - возможно у вас подделка. Обратитесь к продавцу или напишите нашим консультантам.</p>
                        <ul class="check-list">
                            {qrInfo.dates.slice(-10).map((date, index) => (
                                <li key={index}>{date}</li>
                            ))}
                        </ul>
                    </div>}
                </section>
              </div>
        }
        </>);
}