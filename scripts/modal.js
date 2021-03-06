
// links: https://webgilde.com/en/analytics-opt-out/
//        https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out

var disableStr = "ga-disable-UA-199894373-1" 

// closes popup button
function optOut() {
    document.cookie = disableStr + "=true expires=Thu, 31 Dec 2099 23:59:59 UTC path=/"
    window[disableStr] = true
    window.dataLayer = window.dataLayer || []
    function gtag(){dataLayer.push(arguments)}
    gtag("js", new Date())
    gtag("config", "UA-199894373-1", { "send_page_view": false })

    document.getElementById("modal").style.visibility = "hidden"
    localStorage.setItem("show_popup", "false")
}

// google analytics set by default is property not set  
function optIn() {
    window[disableStr] = false
    window.dataLayer = window.dataLayer || []
    function gtag(){dataLayer.push(arguments)}
    gtag("js", new Date())
    gtag("config", "UA-199894373-1")
    document.getElementById("modal").style.visibility = "hidden"
    localStorage.setItem("show_popup", "false")
    localStorage.setItem("start_tracking", "true")
}

// check if cookie exists
function findCookie(cookie_name) {
    if (document.cookie.indexOf(cookie_name) > -1) {
        return true
    }
    return false
}

// check if tracking enabled / disabled
if (findCookie(disableStr + "=true") == true) {   // if tracking disabled
    window[disableStr] = true
} else {    // if tracking enabled
    window[disableStr] = false
}

/*
    pseudocode
    - create local storage item 
      name      show_popup
      value     true

    1) check if "show_popup" has value true OR DNE --> show popup
       i)  if user clicks "accept" --> enable GA tracking cookies + close modal
       ii) else if user clicks "decline" --> enable GA non-tracking cookies + close modal
    2) (else) check if "show_popup=true" has value false --> don't show popup
       i)  reassign "show_popup=true" to "show_popup=false"
*/

window.onload = function() {
    if (localStorage.getItem("show_popup") === null) {      // if "show_popup" doesn't exist in local storage
        localStorage.setItem("show_popup", "true")          // create it, initially set it to false 
    }

    if (localStorage.getItem("show_popup") === "true") {            // if "show_popup" has value true 
        document.getElementById("modal").style.visibility = "visible"    // show modal
    } else {                                                        // if "show_popup" has value false
        document.getElementById("modal").style.visibility = "hidden"     // don't show popup
        localStorage.setItem("show_popup", "false")                 // reassign "show_popup=true" to "show_popup=false"
    }
}
