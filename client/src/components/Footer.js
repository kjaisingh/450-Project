import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

function Footer() {
  return (
    <div style={{backgroundColor:"black", layout:"flex !important", flexDirection:"row", flexFlow:"row nowrap"}}>
      <MDBFooter color="blue" className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title" style = {{color: "white"}}>The New York Experience</h5>
            <div><p style = {{color: "white"}}>
              A web application project created by Group 20 for CIS 550.
            </p></div>
            <div>
              <a href="https://github.com/kjaisingh/CIS-450-Project">Project Github</a>
            </div>
            
          </MDBCol>
          <MDBCol md="6" class="justify-content-center">
            <h5 className="title" style = {{color: "white", textAlign: "right"}}>Contributors:</h5>
            <div style = {{textAlign: "right"}}><a href="https://github.com/aakashjajoo1">Aakash Jajoo</a></div>
            <div style = {{textAlign: "right"}}><a href="https://github.com/kjaisingh">Karan Jaisingh</a></div>
            <div style = {{textAlign: "right"}}><a href="https://github.com/yathu-n">Yathu Nadanapathan</a></div>
            <div style = {{textAlign: "right"}}><a href="https://github.com/kushpandey1811">Kush Pandey</a></div>
            <br></br>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
    </div>
  );
}

export default Footer;