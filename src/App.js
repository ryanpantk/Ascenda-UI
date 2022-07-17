import './App.css';
import HotelBooking from './components/HotelBooking.jsx';
import { Layout } from 'antd';
const {Content } = Layout;

function App() {

  return (
    <Layout style={{height:"100vh", background: "url(https://images.unsplash.com/photo-1446160657592-4782fb76fb99)"}}>
      <Content className="site-layout" style={{padding: '40px 260px', marginTop: 40, marginBottom:40, height: "100%"}}>
          <HotelBooking style={{display:"flex", alignItems:"center", height:"100vh"}}>
          </HotelBooking>
      </Content>
    </Layout>
      
  );
}

export default App;
