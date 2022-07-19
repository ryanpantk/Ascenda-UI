import './App.css';
import HotelBooking from './components/HotelBooking.jsx';
import DeleteBookingPage from './components/DeleteBookingPage.jsx';
import LandingPage from './components/LandingPage.jsx';
import Navbar from './components/Navbar.jsx';
import { Layout } from 'antd';
const {Content } = Layout;

const navStyle = {
  backgroundColor: '#20285d',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '2rem',
  padding: '0 2rem',
  height: '3.2rem'
}

const hStyle = {
  fontSize: '24px',
  color: 'inherit',
  textDecoration: 'none',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}

function App() {
  var pathName = window.location.pathname;
  switch(pathName){
    default:
      return (
        <>
        <Layout style={{height:"100vh"}}>
        <nav style={navStyle}>
            <a style={hStyle} href="/" className="site-title">
                Ascenda
            </a>
        </nav>
          <LandingPage></LandingPage>
        </Layout>
        </>
      )
    case "/make-booking":
      return (
        <>
          <Layout style={{height:"100vh", background: "url(https://images.unsplash.com/photo-1446160657592-4782fb76fb99)"}}>
            <Navbar></Navbar>
            <Content className="site-layout" style={{padding: '40px 260px', marginTop: 40, marginBottom:40, height: "100%"}}>
                <HotelBooking style={{display:"flex", alignItems:"center", height:"100vh"}}>
                </HotelBooking>
            </Content>
          </Layout>
        </>
      );
    case "/delete-booking":
      return (
        <>
          <Navbar></Navbar>
          <DeleteBookingPage></DeleteBookingPage>
        </>
      )
  }
}

export default App;

