import './App.css';
import HotelBooking from './components/HotelBooking.jsx';
import ViewBookingPage from './components/ViewBookingPage.jsx';
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
        <Layout style={{height:"100vh"}}>
        <Navbar></Navbar>
          <LandingPage></LandingPage>
        </Layout>
        </>
      )
    case "/make-booking":
      return (
        <>
          <Layout style={{height:"100vh", background: "url(https://images.unsplash.com/photo-1446160657592-4782fb76fb99)"}}>
            <Navbar></Navbar>
            <Content className="site-layout" style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
              <HotelBooking></HotelBooking>
            </Content>
          </Layout>
        </>
      );
    case "/delete-booking":
      return (
        <>
        <Layout style={{height:"100vh", backgroundImage:"url('https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
          <Navbar></Navbar>
          <ViewBookingPage></ViewBookingPage>
        </Layout>
        </>
      )
  }
}

export default App;

