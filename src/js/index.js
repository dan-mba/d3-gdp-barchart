import data from './FRED-GDPA.json'
import chart from './chart'

function ready() {
  chart(data)
}

if(document.readyState !== "loading"){
  ready()
} else {
  document.addEventListener("DOMContentLoaded", ready)
}