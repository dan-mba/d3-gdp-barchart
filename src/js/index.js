import data from './GDP-data.json'
import chart from './chart'

function ready() {
  chart(data)
}

if(document.readyState !== "loading"){
  ready()
} else {
  document.addEventListener("DOMContentLoaded", ready)
}