import { Nav, Navbar, Container} from "react-bootstrap";

const Header = () => {
    return ( 
        <div style={{marginBottom:"40px"}}>
            <Navbar variant="light">
            <Container style={{flexFlow: "row wrap"}}>
            <Navbar.Brand href="http://localhost:3000/"><img width="40px" alt="logo" className="headerLogo" src="https://pbs.twimg.com/profile_images/1235868806079057921/fTL08u_H_400x400.png"/>
                &nbsp;Spring Project</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="http://localhost:3000/" >Accueil</Nav.Link>
                <Nav.Link href="http://localhost:3000/clients" >Clients</Nav.Link>
                <Nav.Link href="http://localhost:3000/accounts" >Accounts</Nav.Link>
            </Nav>
            </Container>
            </Navbar>
        </div>
     );
}
 
export default Header;