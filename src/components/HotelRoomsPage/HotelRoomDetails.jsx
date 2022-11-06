import { useEffect, useState, React } from "react";
import { Button, Card, Col, Row,  Image, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons'
import parse from 'html-react-parser';
import HotelMap from "./HotelMap";
import { store } from '../../store.js'
const sleep = require('util').promisify(setTimeout)

const sanitizeHtml = require('sanitize-html');

const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'left',
    background: '#364d79',
    marginTop: '10px',
    marginBottom: '10px'
};

const contentStyleRoom = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'left',
    background: '#364d79',
    marginTop: '10px',
    marginBottom: '10px',
    objectFit:"cover"
};

const GetHotelDetails = async (hotelID) => {
    let res = await fetch(`https://fluffy-granita-fe4f3b.netlify.app/apis/hotelDetail/${hotelID}`);
    const hotelDetails = await res.json();
    return hotelDetails;
};

const GetRoomDetails = async (hotelID) => {
    let destination = store.getState().destinationID
    let guestNumber = parseInt(store.getState().NumAdult) + parseInt(store.getState().NumChild);
    let checkinDate = store.getState().startDate;
    let checkoutDate = store.getState().endDate;

    let payload = {}
    payload.url = `https://hotelapi.loyalty.dev/api/hotels/${hotelID}/price?destination_id=${destination}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&guests=${guestNumber}&partner_id=1&country_code=SG`

    const res = await fetch("https://fluffy-granita-fe4f3b.netlify.app/apis/hotelPrice", {
        method: 'POST',
        headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
        body: JSON.stringify(payload)
    });
    let res1 = await res.json();
    let i = 0;
    while (res1.rooms == null || res1.rooms ===[]) {
        if (i ===8) {
            break
        }
        i += 1
        const res = await fetch("https://fluffy-granita-fe4f3b.netlify.app/apis/hotelPrice", {
            method: 'POST',
            headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
            body: JSON.stringify(payload)
        });
        res1 = await res.json();
        (async () => {
            await sleep(500)
        })()
    }
    var seen = {};
    if (res1.rooms) {
        res1.rooms = res1.rooms.filter(function(item) {
            return seen.hasOwnProperty(item.roomNormalizedDescription) ? false : (seen[item.roomNormalizedDescription] = true);
        })
    } else {
        res1.rooms = []
    }
    return res1;
};

const HotelRoomDetails = (props) => {  

    const [hotel, setHotel] = useState(
        {
            "imageCount": 0,
            "latitude": -3.745,
            "longitude": -38.523,
            "name": null,
            "address": null,
            "rating": 0,
            "trustyou": null,
            "categories": null,
            "amenities_ratings": [],
            "description": " ",
            "amenities": {},
            "original_metadata": null,
            "rooms": [],
            "image_details": {
                "suffix": ".jpg",
                "count": 0,
                "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/"
            }
        }
    );  
    const [hotelRoomData, setRooms] = useState(
        {
            "lowest_price": 0,
            "rooms" : [
                {
                    "roomNormalizedDescription": " ",
                    "images": [
                        {
                            "url": "data:image/png;base64,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"
                        }
                    ]
                }
            ],
            "completed": false
        }
    );  
    const [loaded, setLoaded] = useState(null); 
    const [isCompleted, setCompleted] = useState(null); 

    useEffect(() => {
        async function init() {
            if (props.hotelID != null) {
                const hotelInfo = await GetHotelDetails(props.hotelID);
                setHotel(hotelInfo);
                setLoaded(true);
                
            }
        }
        init();
     }, [props.hotelID]);

     useEffect(() => {
        async function initPrice() {
            if (props.hotelID != null) {
                let roomInfo = await GetRoomDetails(props.hotelID);
                setRooms(roomInfo);
                setCompleted(true)
            }
        }
        initPrice()
     },[props.hotelID]); 

    return (
        <div>
            <Row>
                <Col span={10} offset={0}>
                    {loaded &&
                        <Image style={contentStyle} 
                            src={`${props.hotel.image_details.prefix}${props.hotel.default_image_index}${props.hotel.image_details.suffix}`}
                            fallback={`https://d2ey9sqrvkqdfs.cloudfront.net/diH7/2.jpg`}
                        /> }
                </Col>
                <Col span={ 13 } offset={ 1 }>
                    <Card style={{ height:"100%" }}>
                        <div style={{ height:'100%', boxSizing: 'border-box', textAlign: 'left' }}>
                            {<h3> <b> {hotel.name} </b></h3>}
                            <h4 style={{ display:"block", fontWeight: "bold",fontSize: "large", marginBottom:10 }}>{hotel.address}</h4>
                            <Row type="flex" align="middle">
                                <span style={{ fontSize: "large", marginRight: 6 }}>Hotel Rating: </span>
                                {hotel.rating && Array(Math.round(hotel.rating)).fill(null).map((value, index) => (
                                    <StarFilled style={{ margin: 0, padding: 0, verticalAlign: 'middle', color:'orange' }}  key={index}/>))}
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop: 24}}>
                <Card title= {<h3> <b>  Hotel Overview </b></h3>} style={{height:"100%", width:"100%"}}>
                    <div style={{height:'100%',width:"100%", boxSizing: 'border-box', textAlign: 'left'}}>
                        <Row>
                            {hotel.description && parse(sanitizeHtml(hotel.description))}
                            {!hotel.description &&
                            <p style={{ fontSize:"large" }}>Description currently unavailable.</p>
                            }     
                        </Row>
                    </div>
                </Card>
            </Row>
            <Row style={{ marginTop: 24 }}>
                <Card style={{borderheight:"100%", width:"100%"}}>
                    {<h3> <b>  Room Options </b></h3>}
                </Card>
            </Row>
            <Row style={{ marginTop: 24 }}>
                { isCompleted &&
                hotelRoomData.rooms.map((value) =>
                <Col span={8} style={{padding:12}}>
                
                <Card title={value.roomNormalizedDescription} style={{ marginBottom:30, borderRadius: 10}} headStyle={{backgroundColor: '#20285d', color:"white", fontSize:"small"}}>
                    <div style={{height:'100%', boxSizing: 'border-box'}}>
                        {value.images !== [] &&
                        value.images[0] != null &&
                            <Image style={contentStyleRoom} 
                            src={value.images[0].url}
                            fallback="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/2.jpg"                            
                            /> 
                        } 
                        {((value.images === []) ||
                        (value.images !== [] &&
                        value.images[0] == null)) &&
                            <Image style={contentStyleRoom} 
                            src="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/2.jpg" 
                            fallback="https://d2ey9sqrvkqdfs.cloudfront.net/diH7/2.jpg"                            
                            /> 
                        } 

                        <div style={{marginTop:12}}>
                            <span style={{fontSize: "medium"}}><b>${value.lowest_price}</b></span>
                        </div>
                        <Row>
                            <Col span={12} offset={6} style={{marginTop: 12}}>
                                    <Button type="secondary" shape="default" size="large"  onClick={()=>
                                        props.handleRoomSelect(value.key, value.lowest_price, value.roomNormalizedDescription, `${props.hotel.image_details.prefix}${props.hotel.default_image_index}${props.hotel.image_details.suffix}`)
                                        } style={{ borderColor:'#20285d', color:'#20285d' }}>Select Room</Button>
                            </Col>
                        </Row>
                    </div>
                </Card>
                </Col>
                )}
                {!isCompleted &&
                    <Col span={2} offset={11}>
                        <Spin/>
                    </Col>
                }
            </Row>
            <Row style={{ marginTop: 24 }}>
                <Card style={{borderheight:"100%", width:"100%"}}>
                    {<h3> <b>  Map </b></h3>}
                </Card>
            </Row>
            <Row>
                <HotelMap Long={hotel.longitude} Lat={hotel.latitude}></HotelMap>
            </Row>

        </div>
    )

}

export default HotelRoomDetails;