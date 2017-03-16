import * as React from "react"
import * as ReactDOM from "react-dom"

import Slider from "./slider"
import { SliderProps } from './structure'

const props: SliderProps = {

  list: [
    {
      active: false,
      style: {
        "backgroundColor":"gray"
        },

      containers:
        [
          {
             elementType:"block",
             className: "loader up"
          },
          {
             elementType: "block",
             className: "loader down"
          }
        ]
      },
      {
      active: false,
      style: {
          "backgroundImage": "url(img/step1.jpg)"
        },
      containers: [
          {
            elementType: "img",
            className: "car",
            classIn: "car-in",
            src: "img/car.png"
          },
          {
            elementType: "block",
            className: "block",
            children:
              [
                {
                  elementType: "block",
                  classIn: "blah-in",
                  className: "blah",
                  text: "Blah"
                },
                {
                  elementType: "block",
                  classIn: "blah-in",
                  className: "blah blah1",
                  text: "blah"
                },
                {
                  elementType: "block",
                  classIn: "blah-in",
                  className: "blah blah2",
                  text: "blah"
                }
              ]
           }
         ]
      },

      {
      active: false,
      style: {
          "backgroundImage": "url(img/step2.jpg)"
        },
      containers: [
          {
            elementType: "img",
            className: "car1",
            classIn: "car1-in",
            src: "img/car1.png"
          },
          {
            elementType: "block",
            className: "block",
            children:
              [
                {
                  elementType: "block",
                  classIn: "blah-1-in",
                  className: "blah-1",
                  text: "Blah"
                },
                {
                  elementType: "block",
                  classIn: "blah-1-in",
                  className: "blah-1 blah-1-1",
                  text: "blah"
                },
                {
                  elementType: "block",
                  classIn: "blah-1-in",
                  className: "blah-1 blah-1-2",
                  text: "blah"
                }
              ]
           }
         ]
      }
    ],

  generals: {
    firstDelay: 1000,
    delay: 5000
  },

  preloads: ["img/step1.jpg", "img/car.png", "img/step2.jpg", "img/car1.png"]


}




ReactDOM.render(
  <Slider {...props} />,
  document.getElementById("root")
)