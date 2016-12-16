// ==UserScript==
// @name         [MediaWiki] Article clone
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jordy19
// @match        https://anvilgod.com/wiki/index.php?title=*&action=*
// @grant        none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

function HTMLParser(aHTMLString){
  var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null),
    body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
  html.documentElement.appendChild(body);

  body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
    .getService(Components.interfaces.nsIScriptableUnescapeHTML)
    .parseFragment(aHTMLString, false, null, body));

  return body;
}
(function() {
    'use strict';
    var URL = window.location.href;
    var pageName = URL.split("title=")[1].split("&action=edit")[0];
    var textBox = document.getElementById("wpTextbox1");
    var navbar = document.getElementsByClassName("vectorTabs")[0];
    var navItems = navbar.getElementsByTagName("ul")[0];
    var cloneButton = document.createElement("li");
    cloneButton.Id = "ca-view";
    cloneButton.innerHTML = "<span><a>Clone from remote wiki</a></span>";
    var remoteWiki = "https://cheese.formice.com/w/index.php?title=" + pageName + "&action=edit";
    if (textBox.value === '') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', remoteWiki, true);
        xhr.responseType = 'document';
        xhr.send();
        xhr.onload = function(e) {
            var doc = e.target.response;
            var rTextBox = doc.getElementById("wpTextbox1");
            console.log(rTextBox);
            if (rTextBox === null) {
                window.close();

            }
            else {
                console.log("test");
                textBox.innerHTML = rTextBox.innerHTML;
                var sendButton = document.getElementById("wpSave");
                sendButton.click();
            }
        };
    }

    navItems.appendChild(cloneButton);
})();
