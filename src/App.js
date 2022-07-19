import './App.css';
import HotelBooking from './components/HotelBooking.jsx';
import DeleteBookingPage from './components/DeleteBookingPage.jsx';
import LandingPage from './components/LandingPage.jsx';
import Navbar from './components/Navbar.jsx';
import { Layout } from 'antd';
const {Content } = Layout;

function App() {
  var pathName = window.location.pathname;
  switch(pathName){
    default:
      return (
        <>
          <Navbar></Navbar>
          <LandingPage></LandingPage>
        </>
      )
    case "/make-booking":
      return (
        <>
          <Navbar></Navbar>
          <Layout style={{height:"100vh", background: "url(https://images.unsplash.com/photo-1446160657592-4782fb76fb99)"}}>
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

