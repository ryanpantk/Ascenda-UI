import JSONDATA from "../destinations.json";
import {useState} from "react";

const DestinationSearchBar = ({onChange}) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className='destinationSearchBar'>
            <input type="text" placeholder="Destination or Hotel" value={searchTerm} onChange={e => {setSearchTerm(e.target.value)}}></input>
            {JSONDATA.filter((val) => {
                if (val.term != null && searchTerm.length >= 2 && val.term.toLowerCase().includes(searchTerm.toLowerCase()) && val.term != searchTerm){
                    return val;
                }
            }).map((val, key) => {
                return <div className='destination' key={key} onClick={() => {setSearchTerm(val.term); onChange(val)}}>
                    {val.term}
                </div>
            })}
        </div>
    );
}

export default DestinationSearchBar;