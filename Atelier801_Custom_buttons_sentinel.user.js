// ==UserScript==
// @name         [A801] Sentinel buttons
// @namespace    @Jordynl
// @version      0.1
// @description  try to take over the world!
// @author       Jordynl
// @include     http://atelier801.com/topic?f=*

// @grant        none
// ==/UserScript==

var postButtons = [
    ['Sentinel edit', '[size=10][color=#30BA76][b]Sentinel edit:[/b][/color] [/size] '],
    ['Q&A', 'Please ask questions in the [url=http://atelier801.com/topic?f=6&t=1535&p=1]Questions and Answers[/url] thread next time.'],
    ['Forum Q&A', 'Please ask questions in the [url=http://atelier801.com/topic?f=5&t=771397&p=1]Forum Questions and Answers[/url] thread next time.'],
    ['Duplicate', 'We have an existing thread, please use this one instead: '],
    ['Double post merge', '[color=#FFA500][Sentinel] Double post(s) merged. Please do not double post. Use the edit button if you wish to add something to your previous post. [/color][hr]'],
    ['Bullet','•'],
    ["Lock", "[p=center][img]http://atelier801.com/img/icones/cadenas.png[/img][/p]"],
];

var editButtons = [
    ['Sentinel edit', '[size=10][color=#30BA76][b]Sentinel edit:[/b][/color] [/size] '],
    ['Double post merge', '[color=#FFA500][Sentinel] Double post(s) merged. Please do not double post. Use the edit button if you wish to add something to your previous post. [/color][hr]'],
    ['Bullet','•'],
    ["Lock", "[p=center][img]http://atelier801.com/img/icones/cadenas.png[/img][/p]"],
];

var warningButtons = [
    ['Dubble post', 'Please do not dubble post, edit your last post if you want to add more content.'],
];

var sanctionButtons = [
    ['Dubble post', 'Please do not dubble post, edit your last post if you want to add more content.'],
];


(function() {
    'use strict';
    editBBCode();
    postBBCode();
    warningBBCode();
    sanctionBBCode();
})();

function editBBCode(object) {
    var messageContainer = document.querySelectorAll('div[id^="outils_edit_message_"]');
    console.log(messageContainer);
    for(var i=0;i<messageContainer.length;i++) {
        var BBCodeHTML = messageContainer[i].innerHTML;
        messageContainer[i].innerHTML = BBCodeHTML + "<br/><br/>";
        var postID = messageContainer[i].id.replace("outils_", "");
        console.log(postID);
        var BBCodeContainer = generateButtons(editButtons, postID);
        messageContainer[i].appendChild(BBCodeContainer);

    }
}

function postBBCode() {
    var messageContainer = document.getElementById("outils_message_reponse");
    var BBCodeHTML = messageContainer.innerHTML;
    messageContainer.innerHTML = BBCodeHTML + "<br/><br/>";
    var BBCodeContainer = generateButtons(postButtons, "message_reponse");
    messageContainer.appendChild(BBCodeContainer);
}

function warningBBCode(object) {
    var messageContainer = document.getElementById("outils_message_avertissement");
    var BBCodeHTML = messageContainer.innerHTML;
    messageContainer.innerHTML = BBCodeHTML + "<br/><br/>";
    var BBCodeContainer = generateButtons(warningButtons, "message_avertissement");
    messageContainer.appendChild(BBCodeContainer);
}

function sanctionBBCode(object) {
    var messageContainer = document.getElementById("outils_raison");
    var BBCodeHTML = messageContainer.innerHTML;
    messageContainer.innerHTML = BBCodeHTML + "<br/><br/>";
    var BBCodeContainer = generateButtons(warningButtons, "raison");
    messageContainer.appendChild(BBCodeContainer);
}

function generateButtons(list, className) {
    var BBCodeContainer = document.createElement('div');
    BBCodeContainer.className = "btn-group groupe-boutons-barre-outils";
    list.forEach(function(value) {
        var BBCodeButton = document.createElement('button');
        BBCodeButton.className = "btn btn-reduit";
        BBCodeButton.type = "button";
        BBCodeButton.setAttribute("onclick", "ajouterBBCode('"+className+"', '"+value[1]+"', '', "+value[1].lenght+");");
        BBCodeButton.title = "Test Button";
        BBCodeButton.innerHTML = value[0];
        BBCodeContainer.appendChild(BBCodeButton);
    });
    return BBCodeContainer;
}