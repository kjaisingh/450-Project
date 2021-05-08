import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

function Footer() {
  return (
    <div style={{backgroundColor:"lightgrey", layout:"flex !important", flexDirection:"row", flexFlow:"row nowrap"}}>
      <MDBFooter color="blue" className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">The New York Experience</h5>
            <div><p>
              A web application project created by Group 20 for CIS 550.
            </p></div>
            <div>
              <a href="https://github.com/kjaisingh/CIS-450-Project">Project Github</a>
            </div>
            
          </MDBCol>
          <MDBCol md="6" class="justify-content-center">
            <h5 className="title">Contributors:</h5>
            <div><a href="https://github.com/aakashjajoo1">Aakash Jajoo</a></div>
            <div><a href="https://github.com/kjaisingh">Karan Jaisingh</a></div>
            <div><a href="https://github.com/yathu-n">Yathu Nadanapathan</a></div>
            <div><a href="https://github.com/kushpandey1811">Kush Pandey</a></div>
            <br></br>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
    </div>
  );
}

export default Footer;