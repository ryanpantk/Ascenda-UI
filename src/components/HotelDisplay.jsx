
import React from 'react';
import {GetHotelList} from './GetHotels.js';
import Pagination from './pagination.jsx';
import {paginate} from './paginate.js';
import GetDestinationData from './GetDestinationData.js';
import { Image, Col, Spin } from 'antd';
import { HotelPerPage } from './HotelPerPage.js';
import { LoadingOutlined } from '@ant-design/icons';
import { setHotelID } from '../middleware/actions/index.js';
import { store } from '../store';

class HotelDisplay extends React.Component{
    
    
    componentDidMount(){
        console.log('called1');
        this.sethotellist();
        
    }
    sethotellist= async()=>{
        console.log('called2');
        const destinationData = GetDestinationData(this.props.DestinationData);
        await GetHotelList(destinationData).then(data=>this.setState({hotellist:data}|| []))
        };
    state={
        hotellist: [],
        pageSize: 10,
        currentPage: 1,
        hotelListSlice:[],
        flag1:true,
        flag2:true
    };


    handleSelect = (hotel) =>{
        console.log(hotel);
        store.dispatch(setHotelID(hotel.id));
        this.props.GetHotel(hotel);
    };

    sethotelListSlice=async(page)=>{
            await HotelPerPage(paginate(this.state.hotellist, page, this.state.pageSize), this.props.HotelDetails).then(data=>this.setState({hotelListSlice:data}))
         };
    handlePageChange = page =>{
        this.setState({currentPage:page})
        this.sethotelListSlice(page);
        this.props.PageChange()
    };
    setFlag = ()=>{this.setState({flag1:false})};

    render(){
        if (this.state.hotellist && this.state.hotellist.length === 0){
            if(this.state.flag2){
                setTimeout(()=>this.setFlag(),5000);
                setTimeout(()=>this.sethotellist(),2000)
                setTimeout(()=>this.sethotellist(),4000)
                setTimeout(()=>this.sethotellist(),5000)
                this.setState({flag2:false});
            }
            if(this.state.flag1){
                
                return (<div>
                    <Spin indicator= { <LoadingOutlined
                        style={{
                            fontSize: 32,
                            marginBottom:20
                        }}
                        spin
                    />} 
                  />
                  <p>Loading......</p></div>)}   
            
            
            if(!this.state.flag1){
                return <p>Sorry there are no hotels available</p>
            }
        };
        
        if(!this.state.hotelListSlice.length>0){
            this.sethotelListSlice(this.state.currentPage);
            }
        if(this.state.hotellist.length>=10 && this.state.currentPage === 1 && this.state.hotelListSlice.length<10){
            this.sethotelListSlice(this.state.currentPage);
            }

        return(
            <React.Fragment>
                <Col >
                {this.state.hotellist != null &&
                <p><b>Total Hotels Found: {this.state.hotellist.length} </b></p>
                }
                <table className='table'>
                    <thead>
                        <tr>
                            <th width="300">Image</th>
                            <th width="500">Hotel Name</th>
                            <th width="180">Price</th>
                            <th width="100"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.hotelListSlice.map(hotel =>
                        <tr key={hotel.id}>
                            <td width="200" height="200"><Image src={`${hotel.image_details.prefix}${hotel.default_image_index}${hotel.image_details.suffix}`} style={{objectFit:"cover", width:260, height:200}} 
                                fallback={`https://d2ey9sqrvkqdfs.cloudfront.net/diH7/${Math.floor(Math.random()*50)}.jpg`}
                            /></td>
                            <td>{<h5> {hotel.name} </h5>}</td>
                            <td>{<h5> ${hotel.price} </h5>}</td>
                            <td><button onClick={()=>this.handleSelect(hotel)} type="button" className="btn btn-primary" id="selbtn">Select</button></td>
                        </tr>
                        )}
                        
                    </tbody>
                </table>
                {this.state.hotellist != null &&
                <Pagination 
                    itemsCount={this.state.hotellist.length} 
                    pageSize={this.state.pageSize} 
                    currentPage = {this.state.currentPage}
                    onPageChange={this.handlePageChange}
                    />
                }
                    </Col>
            </React.Fragment>
        
                    )}
}


export default HotelDisplay;
