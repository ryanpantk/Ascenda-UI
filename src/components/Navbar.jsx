
const navStyle = {
    backgroundColor: '#20285d',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
    padding: '0 1rem'
}

const ulStyle = {
    padding: '0',
    margin: '0',
    listStyle: 'none',
    display: 'flex',
    gap: '1rem'
}

const aStyle = {
    fontSize: '20px',
    color: 'inherit',
    textDecoration: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}

export default function Navbar() {
    return (
        <nav style={navStyle}>
            <a style={aStyle} href="/" className="site-title">
                Ascenda
            </a>
            <ul style={ulStyle}>
                <li>
                    <a style={aStyle} href="/make-booking">Make Booking</a>
                </li>
                <li>
                    <a style={aStyle} href="/delete-booking">View Booking</a>
                </li>
            </ul>
        </nav>
    )
}