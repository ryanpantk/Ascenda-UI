//In-line CSS Styling

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
            <a style={hStyle} onclick="window.localStorage.setItem('path','/')" href="/" className="site-title">
                Ascenda
            </a>
            <ul style={ulStyle}>
                <li>
                    <a style={aStyle} onclick="window.localStorage.setItem('path','/make-booking')" href="/make-booking">Make Booking</a>
                </li>
                <li>
                    <a style={aStyle} onclick="window.localStorage.setItem('path','/delete-booking')" href="/delete-booking">View Booking</a>
                </li>
            </ul>
        </nav>
    )
}