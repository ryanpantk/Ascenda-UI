import { Button } from 'antd';

//In-line CSS Styling
const myStyle={
    backgroundImage:"url('https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    height:'100%',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center'
};

const buttonStyle1={
    backgroundColor:"green",
    border: "none",
    color: "white",
    padding: "25px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    marginRight: "16px",
}

const buttonStyle2={
    backgroundColor:"#FFFFFF",
    border: "none",
    color: "#20285d",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px"
}

function LandingPage(){
    return (
        <div style={myStyle}>
            <div style={{marginLeft:'5%'}}>
                <h1 style={{color:'white'}}>
                    Hotel Booking. <br/> Made Simple.
                </h1>
                <div style={{color: 'white', fontSize: '32px', fontWeight: '400', lineHeight: '35px'}}>
                    Book your perfect hotel <br/> stay in 4 simple steps.
                </div>
                <a href="/make-booking">
                    <Button style={buttonStyle1}>
                        Get Started Now
                    </Button>      
                </a>     
                <a href="/delete-booking"  /* style={{fontSize: '16px', marginLeft:'16px', color:'#FFFFFF'}} */>
                    <Button style={buttonStyle2}>
                        View Bookings
                    </Button>      
                </a>      
            </div>
        </div>
    );
}

export default LandingPage;