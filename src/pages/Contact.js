import React from "react";
import Header_Footer from "../Layout/Header_Footer";
import "./styles/Contact.css";
import { useAuth } from "../context/auth";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUserClock,
} from "react-icons/fa";

const Contact = () => {
  const [auth] = useAuth();

  return (
    <Header_Footer title={"Contact Us"}>
      <div id="contact" className="contact-area section-padding">
        <div className="container">
          <div className="section-title text-center">
            <h1>Get in Touch</h1>
            <p>
              Do you have any questions? Please do not hesitate to contact us
              directly. Our team will come back to you within a matter of hours
              to help you.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="contact">
                <form
                  className="form"
                  name="enq"
                  method="post"
                  action="contact.php"
                  onsubmit="return validation();"
                >
                  <div className="row">
                    <div className="form-group col-md-6 mb-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required="required"
                        value={auth?.user ? auth.user.name : ""}
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required="required"
                        value={auth?.user ? auth.user.email : ""}
                      />
                    </div>
                    <div className="form-group col-md-12 mb-3">
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        required="required"
                      />
                    </div>
                    <div className="form-group col-md-12 mb-3">
                      <textarea
                        rows={6}
                        name="message"
                        className="form-control"
                        placeholder="Your Message"
                        required="required"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        value="Send message"
                        name="submit"
                        id="submitButton"
                        className="btn btn-contact-bg"
                        title="Submit Your Message!"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/*- END COL */}
            <div className="col-lg-5">
              <div className="single_address d-flex align-items-center">
                <FaMapMarkerAlt size={"30px"} className="m-4" />
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <h4>Our Address</h4>
                  <p>3481 Melrose Place, Beverly Hills</p>
                </div>
              </div>
              <div className="single_address d-flex align-items-center">
                <FaEnvelope size={"30px"} className="m-4" />
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <h4>Send your message</h4>
                  <p>Info@supermart.com</p>
                </div>
              </div>
              <div className="single_address d-flex align-items-center">
                <FaPhoneAlt size={"30px"} className="m-4" />
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <h4>Call us on</h4>
                  <p>(+1) 517 397 7100</p>
                </div>
              </div>
              <div className="single_address d-flex align-items-center">
                <FaUserClock size={"30px"} className="m-4" />
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <h4>Work Time</h4>
                  <p>
                    Mon - Fri: 08.00 - 16.00. <br />
                    Sat: 10.00 - 14.00
                  </p>
                </div>
              </div>
            </div>
            {/*- END COL */}
          </div>
          {/*- END ROW */}
        </div>
        {/*- END CONTAINER */}
      </div>
    </Header_Footer>
  );
};

export default Contact;
