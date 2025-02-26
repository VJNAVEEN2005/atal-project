import React, { useEffect, useState } from "react";
import axios from "axios";

function Tenders() {
  const [tenders, setTenders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tenders")
      .then((response) => {
        setTenders(response.data); // Update tenders with response data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tenders:", error);
        setTenders([]); // Fallback to an empty array
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <div>Loading tenders...</div>; // Display while loading
  // }

  if (!Array.isArray(tenders)) {
    return <div>Error: Tenders data is not an array!</div>; // Handle invalid data
  }

  return (
    <div>
      {/* <h1>Tenders</h1>
      {tenders.length === 0 ? (
        <p>No tenders available.</p> // Handle case with no tenders
      ) : (
        <ul>
          {tenders.map((tender) => (
            <li key={tender.id}>
              <h2>{tender.title}</h2>
              <p>{tender.description}</p>
              <p>Expires on: {new Date(tender.expiryDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )} */}

      <div className=" m-10 shadow-xl rounded-xl border border-gray-200">
      <div
        style={{
          minHeight: "450px",
          padding: "15px 25px 25px",
          background:
            "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <strong>Tender Call For Details</strong>
          </h2>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (26/07/2024)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            Call for Quotation for the supply of{" "}
            <strong>Raspberry Pi 5 Starter Kit for EDM LAB</strong> at{" "}
            <strong>AICPECF​</strong>
            <span>&nbsp;(Reference Number:&nbsp;Proc/AIC-PECF/ 2024/</span>
            <strong>092</strong>
            <strong>)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 05-08-2024 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: proc-aicpecf_raspberry_pi_.pdf"
                href="/uploads/9/8/0/9/9809129/proc-aicpecf_raspberry_pi_.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> proc-aicpecf_raspberry_pi_.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>165 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: proc-aicpecf_raspberry_pi_.pdf"
                  href="/uploads/9/8/0/9/9809129/proc-aicpecf_raspberry_pi_.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER SUBMISSION OPEN
              </font>
            </strong>
          </h2>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (06/05/2024)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            <span>Call for Limited Tender for the&nbsp;supply </span>supply of{" "}
            <strong>
              Laptop for 3D Scanner , PCB Prototyping and LASER machines at
              AIC-PECF.
            </strong>
            <span>&nbsp;(Reference Number:&nbsp;Proc/AIC-PECF/ 2024/</span>
            <strong>091</strong>
            <strong>)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 17-05-2024 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: proc-aicpecf-2024-091.pdf"
                href="/uploads/9/8/0/9/9809129/proc-aicpecf-2024-091.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> proc-aicpecf-2024-091.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>173 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: proc-aicpecf-2024-091.pdf"
                  href="/uploads/9/8/0/9/9809129/proc-aicpecf-2024-091.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER SUBMISSION CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (06/05/2024)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            <span>Call for Limited Tender for the </span>supply &amp;
            Installation of{" "}
            <strong>
              7.5KVA/180VDC Online UPS system with Exide Tubular Battery
              12V/150AH – 15 nos for FAB LAB Unit at AICPECF
            </strong>
            <span> (Reference Number:&nbsp;Proc/AIC-PECF/ 2024/</span>
            <strong>090</strong>
            <strong>)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 17-05-2024 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: proc-aicpecf-2024-090.pdf"
                href="/uploads/9/8/0/9/9809129/proc-aicpecf-2024-090.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> proc-aicpecf-2024-090.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>675 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: proc-aicpecf-2024-090.pdf"
                  href="/uploads/9/8/0/9/9809129/proc-aicpecf-2024-090.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER SUBMISSION CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (09/02/2023)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            <span>Call for Limited Tender for the supply of</span>
            <strong>&nbsp;</strong>
            <strong>UAV LiDAR Scanning System</strong>
            <strong>&nbsp;</strong>
            <span>
              for UAV LAB at&nbsp; AIC-PECF FAB&nbsp;LAB Unit&nbsp; at AIC-PECF
              (Reference Number:&nbsp;
            </span>
            <span>Proc/AIC-PECF/ 2023/</span>
            <strong>079</strong>
            <strong>)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 18-02-2023 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: limited_tender_proc_aic_pecf_2023_079.pdf"
                href="/uploads/9/8/0/9/9809129/limited_tender_proc_aic_pecf_2023_079.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> limited_tender_proc_aic_pecf_2023_079.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>306 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: limited_tender_proc_aic_pecf_2023_079.pdf"
                  href="/uploads/9/8/0/9/9809129/limited_tender_proc_aic_pecf_2023_079.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER SUBMISSION CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (23/01/2023)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            <span>
              Call for Limited Tender for the supply &amp; Installation of
            </span>
            <strong>&nbsp;</strong>
            <strong>SMT Pick and Place Machine</strong>
            <strong>&nbsp;</strong>
            <span>
              for AIC-PECF FAB&nbsp;LAB Unit&nbsp; at AIC-PECF (Reference
              Number:&nbsp;
            </span>
            Proc/AIC-PECF/ 2023/<strong>077</strong>
            <strong>)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 03-02-2023 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: limited_tender_proc-aic-pecf_2023_77.pdf"
                href="/uploads/9/8/0/9/9809129/limited_tender_proc-aic-pecf_2023_77.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> limited_tender_proc-aic-pecf_2023_77.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>358 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: limited_tender_proc-aic-pecf_2023_77.pdf"
                  href="/uploads/9/8/0/9/9809129/limited_tender_proc-aic-pecf_2023_77.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER SUBMISSION CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (18/01/2023)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            <span>
              Call for Limited Tender for the supply &amp; Installation of
            </span>
            <strong>&nbsp;</strong>Proteus Platinum Edition{" "}
            <strong>(Perpetual License)</strong>
            <strong>&nbsp;</strong>
            <span>for AIC-PECF FAB</span>
            <span>
              &nbsp;LAB Unit&nbsp; at AIC-PECF (Reference
              Number:&nbsp;Proc/AIC-PECF/2023/
            </span>
            <strong>074)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 23-01-2023 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: limited_tender_proc-aic-pecf_2023-074.pdf"
                href="/uploads/9/8/0/9/9809129/limited_tender_proc-aic-pecf_2023-074.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> limited_tender_proc-aic-pecf_2023-074.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>251 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: limited_tender_proc-aic-pecf_2023-074.pdf"
                  href="/uploads/9/8/0/9/9809129/limited_tender_proc-aic-pecf_2023-074.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER SUBMISSION CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (04/01/2023)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            <span>
              Call for Limited Tender for the supply &amp; Installation of
            </span>
            <strong>&nbsp;</strong>supply of{" "}
            <strong>
              Altair Multiphysics/Mechatronics Engineer Suite (Perpetual
              License){" "}
            </strong>
            for AIC-PECF FAB
            <span>
              {" "}
              LAB Unit&nbsp; at AIC-PECF (Reference
              Number:&nbsp;Proc/AIC-PECF/2023/
            </span>
            <strong>073)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 13-01-2023 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: limited_tender_073_altair_software.pdf"
                href="/uploads/9/8/0/9/9809129/limited_tender_073_altair_software.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> limited_tender_073_altair_software.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>214 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: limited_tender_073_altair_software.pdf"
                  href="/uploads/9/8/0/9/9809129/limited_tender_073_altair_software.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </h2>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (28/11/2022)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            Call for Limited Tender for the supply &amp; Installation of
            <strong> Wegstr PCB CNC Machine with Tools and Accessories</strong>
            <strong>&nbsp;</strong>
            <span>
              for EDM LAB Unit&nbsp; at AIC-PECF (Reference
              Number:&nbsp;Proc/AIC-PECF/ 2022/
            </span>
            <strong>071)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 07-12-2022 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: limited_tender_071_supply___installation_of_wegstar_pcb_cnc_machine.pdf"
                href="/uploads/9/8/0/9/9809129/limited_tender_071_supply___installation_of_wegstar_pcb_cnc_machine.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b>
                          {" "}
                          limited_tender_071_supply___installation_of_wegstar_pcb_cnc_machine.pdf
                        </b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>251 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: limited_tender_071_supply___installation_of_wegstar_pcb_cnc_machine.pdf"
                  href="/uploads/9/8/0/9/9809129/limited_tender_071_supply___installation_of_wegstar_pcb_cnc_machine.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (10/11/2022)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
            </font>
            Call for Limited Tender for the supply of{" "}
            <strong>
              MDK Plus Keil Software (perpetual License) Software&nbsp;
            </strong>
            for EDM LAB Unit&nbsp; at AIC-PECF (Reference
            Number:&nbsp;Proc/AIC-PECF/ 2022/<strong>066)</strong>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 17-11-2022 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: limited_tender_066_keil_software.pdf"
                href="/uploads/9/8/0/9/9809129/limited_tender_066_keil_software.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> limited_tender_066_keil_software.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>197 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: limited_tender_066_keil_software.pdf"
                  href="/uploads/9/8/0/9/9809129/limited_tender_066_keil_software.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (29/08/2022)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
              <font color="#818181">Call for Quotation for&nbsp;</font>
            </font>
            <span>supply &amp; Installation of</span>
            <strong>&nbsp;</strong>
            <strong>
              HP AIO 24-cb1902in Desktop Computers for EDM LAB at AIC-PECF
            </strong>
            <strong>&nbsp;</strong>
            <font size="2">
              <font color="#818181">
                (&nbsp;<strong>Reference Number :&nbsp;</strong>
              </font>
            </font>
            <strong>
              <font color="#818181">Proc/AIC-PEC/2022/065</font>
            </strong>
            <font size="2">
              <font color="#818181">)</font>
            </font>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 10-09-2022 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: proc-aic_pecf-2022-65.pdf"
                href="/uploads/9/8/0/9/9809129/proc-aic_pecf-2022-65.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> proc-aic_pecf-2022-65.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>394 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: proc-aic_pecf-2022-65.pdf"
                  href="/uploads/9/8/0/9/9809129/proc-aic_pecf-2022-65.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </h2>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (03/08/2022)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
              <font color="#818181">Call for Quotation for </font>
            </font>
            supply &amp; Installation of<strong> FluxLasers Beambox Pro</strong>{" "}
            <strong>Desktop Laser Engraver &amp; Cutter&nbsp;</strong>
            <font size="2">
              <font color="#818181">
                (&nbsp;<strong>Reference Number :&nbsp;</strong>
              </font>
            </font>
            <strong>
              <font color="#818181">Proc/AIC-PEC/2022/055</font>
            </strong>
            <font size="2">
              <font color="#818181">)</font>
            </font>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 13-08-2022 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: proc-aic-pec-2022-055.pdf"
                href="/uploads/9/8/0/9/9809129/proc-aic-pec-2022-055.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> proc-aic-pec-2022-055.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>272 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: proc-aic-pec-2022-055.pdf"
                  href="/uploads/9/8/0/9/9809129/proc-aic-pec-2022-055.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (19/07/2022)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
              <font color="#818181">Call for Quotation for the supply of </font>
            </font>
            <font color="#818181">
              Agisoft - Metashape-Professional Edition&nbsp;
            </font>
            <font size="2">
              <font color="#818181">
                (&nbsp;<strong>Reference Number :&nbsp;</strong>
              </font>
            </font>
            <strong>
              <font color="#818181">Proc/AIC-PEC/2022/063</font>
            </strong>
            <font size="2">
              <font color="#818181">)</font>
            </font>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 29-07-2022 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: proc-aicpecf-2022-063.pdf"
                href="/uploads/9/8/0/9/9809129/proc-aicpecf-2022-063.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> proc-aicpecf-2022-063.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>206 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: proc-aicpecf-2022-063.pdf"
                  href="/uploads/9/8/0/9/9809129/proc-aicpecf-2022-063.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </h2>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">
                  Notice Inviting Limited Tender: (30/06/2022)
                </font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
              <font color="#818181">
                Call for Quotation for the supply of 3D Scanner for additive
                manufacturing lab unit at AIC-PECF&nbsp;(&nbsp;
                <strong>Reference Number :&nbsp;&nbsp;</strong>
                <strong>Proc/AIC-PECF/ 2022/062</strong>)
              </font>
            </font>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 14-07-2022 before 5 PM.
              </font>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: tender-proc-aic-pecf-2022-062.pdf"
                href="/uploads/9/8/0/9/9809129/tender-proc-aic-pecf-2022-062.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> tender-proc-aic-pecf-2022-062.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>217 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: tender-proc-aic-pecf-2022-062.pdf"
                  href="/uploads/9/8/0/9/9809129/tender-proc-aic-pecf-2022-062.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </h2>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <h2
            style={{
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <font color="#626262">
              <strong>
                <font size="3">Notice Inviting Limited Tender:</font>
              </strong>
            </font>
            <br />
            <font size="2">
              <strong>​</strong>
              <font color="#818181">
                Call for Quotation for the supply of Drone parts for
                Agricultural UAV unit at AIC-PECF&nbsp;(&nbsp;
                <strong>Reference Number :&nbsp;&nbsp;</strong>
                <strong>Proc/AIC-PECF/ 2022/053</strong>)
              </font>
            </font>
            <br />
            <strong>
              <font color="#c23b3b" size="3">
                Last Date for Tender Submission : 10-06-2022 before 5 PM.
              </font>
            </strong>
          </h2>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: tender-proc-aic-pec-2022-053.pdf"
                href="/uploads/9/8/0/9/9809129/tender-proc-aic-pec-2022-053.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> tender-proc-aic-pec-2022-053.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>303 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: tender-proc-aic-pec-2022-053.pdf"
                  href="/uploads/9/8/0/9/9809129/tender-proc-aic-pec-2022-053.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "25px",
              padding: "6px 0px",
              color: "rgb(141, 36, 36)",
              fontFamily: '"Droid Sans"',
              margin: "0px",
              overflowWrap: "break-word",
              fontWeight: 400,
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </h2>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#8d2424" size="3">
                CORRIGENDUM:
              </font>
            </strong>
            <span>
              <font size="2">EXTENSION OF LAST DATE FOR SUBMISSION OF </font>
              <strong>
                <font size="3">TENDER No:&nbsp;​Proc/AIC-PECF/ 2022/057</font>
              </strong>
              <font size="4"> to </font>
              <strong>
                <font color="#a82e2e">Dt. 20-05-2022</font>
              </strong>
            </span>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: corrigendum.docx"
                href="/uploads/9/8/0/9/9809129/corrigendum.docx"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/rtf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> corrigendum.docx</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>48 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> docx</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: corrigendum.docx"
                  href="/uploads/9/8/0/9/9809129/corrigendum.docx"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <font color="#c23b3b" size="3">
                TENDER CLOSED
              </font>
            </strong>
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            <strong>
              <span>
                <font size="3">Notice Inviting Limited Tender:</font>
              </span>
            </strong>
            <br />
            <strong>
              <span>​</span>
            </strong>
            <span>Call for Quotation for </span>r for the supply &amp;
            Installation of Desktop Workstation for UAV LAB at AIC-PECF
            <span>
              &nbsp;( <strong>Reference Number :&nbsp; </strong>
            </span>
            <strong>Proc/AIC-PECF/ 2022/057</strong>
            <span>)</span>
            <br />
            <strong>
              <span>
                <font color="#c23b3b" size="3">
                  Last Date of Tender : 16-05-2022 before 5 PM.
                </font>
              </span>
            </strong>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: proc-aicpecf-2022-057.pdf"
                href="/uploads/9/8/0/9/9809129/proc-aicpecf-2022-057.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> proc-aicpecf-2022-057.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>951 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: proc-aicpecf-2022-057.pdf"
                  href="/uploads/9/8/0/9/9809129/proc-aicpecf-2022-057.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            CORRIGENDUM :&nbsp; EXTENSION OF LAST DATE FOR SUBMISSION OF TENDER
            No:&nbsp;​Proc/AIC-PECF/ 2020/036 Dt. 01-09-2020.
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: corri.pdf"
                href="/uploads/9/8/0/9/9809129/corri.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> corri.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>201 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: corri.pdf"
                  href="/uploads/9/8/0/9/9809129/corri.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            Notice Inviting Tender For Design, Development and Supply of
            Customized Development Boards for Electronic Design &amp; Fab LAB at
            AIC-PECF as a single Package) ( Tender Reference Number :
            Proc/AIC-PECF/ 2020/036) Last Date for the Tender : 28-09-2020
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: tender_document-2020-036.pdf"
                href="/uploads/9/8/0/9/9809129/tender_document-2020-036.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> tender_document-2020-036.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>703 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: tender_document-2020-036.pdf"
                  href="/uploads/9/8/0/9/9809129/tender_document-2020-036.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            Call for Quotation for the supply of furniture, false ceiling and
            electrification in CEO,CFO and Board Room&nbsp; at AIC-PECF&nbsp;
            <span>( Reference Number :&nbsp; proc/AIC-PECF/2019/002)</span>
            <br />
            <span>Last Date of Tender : 16-11-2019.&nbsp;</span>
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: call_for_quotation-2019002.pdf"
                href="/uploads/9/8/0/9/9809129/call_for_quotation-2019002.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> call_for_quotation-2019002.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>269 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: call_for_quotation-2019002.pdf"
                  href="/uploads/9/8/0/9/9809129/call_for_quotation-2019002.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            CORRIGENDUM :&nbsp; EXTENSION OF LAST DATE FOR SUBMISSION OF TENDER
            No: e- proc/AIC-PECF/Tender/Corr/2019/002Dt: 21/08/2019
            <br />
            <br />
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: corrigendam_aic_210819.pdf"
                href="/uploads/9/8/0/9/9809129/corrigendam_aic_210819.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> corrigendam_aic_210819.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>53 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: corrigendam_aic_210819.pdf"
                  href="/uploads/9/8/0/9/9809129/corrigendam_aic_210819.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
          <div
            style={{
              lineHeight: "18px",
              padding: "6px 0px",
              margin: "0px",
              overflowWrap: "break-word",
            }}
          >
            Tender Document For the supply and installation of&nbsp; Modular
            Furniture at AIC-PECF ( Tender Reference Number :&nbsp; e-
            proc/AIC-PECF/2019/001)
            <br />
            Date of Tender : 09-08-2019&nbsp;
            <br />
            <br />
          </div>
          <div>
            <div style={{ margin: "10px 0 0 -10px" }}>
              <a
                title="Download file: tender_document-2019001.pdf"
                href="/uploads/9/8/0/9/9809129/tender_document-2019001.pdf"
                style={{
                  color: "rgb(18, 74, 151)",
                  textDecoration: "none solid rgb(18, 74, 151)",
                }}
              >
                <img
                  src="//www.weebly.com/weebly/images/file_icons/pdf.png"
                  width="36"
                  height="36"
                  style={{
                    float: "left",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px 15px 15px 0px",
                    border: "0px none rgb(18, 74, 151)",
                  }}
                />
              </a>
              <div
                style={{
                  float: "left",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <table
                  style={{
                    fontSize: "12px",
                    fontFamily: "tahoma",
                    lineHeight: "10.8px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <b> tender_document-2019001.pdf</b>
                      </td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Size: </td>
                      <td>1054 kb</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>File Type: </td>
                      <td> pdf</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  title="Download file: tender_document-2019001.pdf"
                  href="/uploads/9/8/0/9/9809129/tender_document-2019001.pdf"
                  style={{
                    fontWeight: "bold",
                    color: "rgb(18, 74, 151)",
                    textDecoration: "none solid rgb(18, 74, 151)",
                  }}
                >
                  Download File
                </a>
              </div>
            </div>
            <hr
              style={{ clear: "both", width: "100%", visibility: "hidden" }}
            />
          </div>
          <div>
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
            <hr
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.13)",
                border: "0px none rgba(0, 0, 0, 0.13)",
                color: "rgba(0, 0, 0, 0.13)",
                height: "1px",
                margin: "0px auto",
                textAlign: "center",
              }}
            />
            <div
              style={{ height: "20px", overflow: "hidden", width: "100%" }}
            ></div>
          </div>
        </div>
        <div style={{ clear: "both", fontSize: "0px", height: "0px" }}></div>
      </div>
      </div>
    </div>
  );
}

export default Tenders;
