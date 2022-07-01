import JSONDATA from "../destinations.json";
import {useState} from "react";

const DestinationSearchBar = ({onChange}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDestSelected, setIsDestSelected] = useState(false);
    return (
        <div className='destinationSearchBar'>
            <input type="text" placeholder="Destination or Hotel" value={searchTerm} onChange={e => {setSearchTerm(e.target.value); setIsDestSelected(false)}}></input>
            {JSONDATA.filter((val) => {
                if (val.term != null && searchTerm.length >= 2 && val.term.toLowerCase().includes(searchTerm.toLowerCase()) && val.term != searchTerm && !isDestSelected){
                    return val;
                }
            }).slice(0, 15).map((val, key) => {
                return <div className='destination' key={key} onClick={() => {setSearchTerm(val.term); onChange(val); setIsDestSelected(true)}}>
                    {val.term}
                </div>
            })}
        </div>
    );
}

export default DestinationSearchBar;