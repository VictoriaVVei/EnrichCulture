export function Footer() {
    return (
        <div style={{width: '100%', textAlign: 'center', background: 'white', height:'225px'}}>
            <h1 aria-label="Contact us">Contact Enrich Culture</h1>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'80px'}}>
                <span className="material-icons" style={{ marginRight: '8px' }}>email</span> 
                enrichculture@gmail.com
            </p>
            <p>&copy; Enrich Culture 2023</p>
        </div>
    );
}