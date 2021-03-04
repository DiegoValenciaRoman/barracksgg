import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Slide } from "react-slideshow-image";

function Nasa() {
  //local state to manage images data
  const [imageData, setImageData] = useState([]);
  /**
   * @params None, uses local component state
   * @description Fetches data from nasa API and updates the imageData displayed later on the slideshow
   * @returns void
   */
  const getDataFromNasa = () => {
    //not suported :(
    //let nasaUrl = new URL("https://api.nasa.gov/planetary/apod");
    //nasaUrl.searchParams("api_key", process.env.REACT_APP_NASA);
    //nasaUrl.searchParams("count", 3)
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 2);
    startDate = startDate.toISOString().slice(0, 10);
    console.log(startDate);
    let endDate = new Date();
    endDate = endDate.toISOString().slice(0, 10);
    console.log(endDate);
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=" +
          process.env.REACT_APP_NASA +
          "&start_date=" +
          startDate +
          "&end_date=" +
          endDate
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setImageData(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    getDataFromNasa();
  }, []);
  return (
    <div style={{ padding: "2%" }}>
      <Slide easing="ease">
        {imageData.map((image, i) => (
          <div className="each-slide" key={i}>
            <div style={{ backgroundImage: `url(${image.url})` }}>
              <div
                style={{
                  marginTop: "30%",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "white" }}>
                  {" "}
                  <b>{`${image.title} / ${image.date}`}</b>
                  <br></br>
                </div>

                <div style={{ color: "white" }}>{`${image.explanation.slice(
                  0,
                  50
                )}...`}</div>
                <div style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  <b>{`COPYRIGHT: ${image.copyright || "NO COPYRIGHT"}`}</b>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default Nasa;
