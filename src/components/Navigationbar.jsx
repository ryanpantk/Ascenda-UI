//In-line CSS Styling
import { Button } from 'antd';

const ulStyle = {
    padding: '0',
    margin: '0',
    listStyle: 'none',
    display: 'flex',
    gap: '1rem'
}

const aStyle = {
    fontSize: '16px',
    color: 'inherit',
    textDecoration: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
    marginLeft: '1rem'
}

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
  


export default function Navbar() {
    return (
        <nav style={navStyle}>
            <a style={hStyle} onClick={()=>                {
                    window.sessionStorage.setItem('path','/') 
                    window.location.reload()
                }} className="site-title">
                Ascenda
            </a>
            <ul style={ulStyle}>
                <li>
                    <a style={aStyle} onClick={()=>                {
                    window.sessionStorage.setItem('path','/make-booking') 
                    window.location.reload()
                }}>Make Booking</a>
                </li>
                <li>
                    <a style={aStyle} onClick={()=>                {
                    window.sessionStorage.setItem('path','/delete-booking') 
                    window.location.reload()
                }}>View Booking</a>
                </li>
            </ul>
        </nav>
    )
}