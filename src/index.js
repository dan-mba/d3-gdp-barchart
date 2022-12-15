import data from './FRED-GDPA.json'
import chart from './chart'
import "./chart.css"

function ready() {
  chart(data)
}

if(document.readyState !== "loading"){
  ready()
} else {
  document.addEventListener("DOMContentLoaded", ready)
}