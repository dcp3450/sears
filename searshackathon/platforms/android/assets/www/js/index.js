/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
//    Application Constructor
    initialize: function() {
        this.bindEvents();
    },
//    Bind Event Listeners
//
//    Bind any events that are required on startup. Common events are:
//    'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
//    deviceready Event Handler
//
//    The scope of 'this' is the event. In order to call the 'receivedEvent'
//    function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
//                Read NDEF formatted NFC Tags
                nfc.addNdefListener (
                    function (nfcEvent) {
                        var tag = nfcEvent.tag,
                            ndefMessage = tag.ndefMessage;

//                        dump the raw json of the message
//                        note: real code will need to decode
//                        the payload from each record
//                        alert(JSON.stringify(tag));

                        var tagId = nfc.bytesToHexString(tag.id);
                        alert(tagId);

//                        assuming the first record in the message has
//                        a payload that can be converted to a string.
//                        var messageString = nfc.bytesToString(ndefMessage[0].payload).substring(3);
//                        alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));


                        /** USE TO WRITE TO NFC TAG **/
                        var mimeType = "app/searshack";
                        var payload = "You won a coupon!";
                        var message = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

                        nfc.write(
                          [message],
                          function () {
                            alert("success");
                          },
                          function (reason) {
                            alert("fail");
                          }
                        );

                    },
                    function () { // success callback
                        console.log("Waiting for NDEF tags");
                    },
                    function (error) { // error callback
                        console.log("Error adding NDEF listener " + JSON.stringify(error));
                    }
                );
                nfc.addMimeTypeListener(
                    'app/searshack',
                    function(nfcEvent) {
//                      ignore what's on the tag

                        console.log(nfcEvent);
                        var tag = nfcEvent.tag,
                            ndefMessage = tag.ndefMessage;
                        var messageString = nfc.bytesToString(ndefMessage[0].payload).substring(0);
                        var tagId = nfc.bytesToHexString(tag.id);
                        document.getElementById("nfc-value").innerHTML = messageString;
//                        document.getElementById("nfc-id").innerHTML = "tag-ID="+tagId;

                    },
                    function() { console.log("listening for MIME NDEF tags"); },
                    function(error) { console.log("Error registering MIME NDEF listener " + error); }
                );
                document.addEventListener("backbutton", onBackKeyDown, false);

                function onBackKeyDown() {
                    // Handle the back button
                    return false;
                }
    },
//    Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

function menuAction(e){
    var nodeContainer = e.parentNode.parentNode;
    nodeContainer.className = "lowerScreen";
    nodeContainer.setAttribute("style","overflow:hidden");
    nodeContainer.innerHTML = nodeContainer.innerHTML+'<div id="cover" onclick="menuClose(this,testMe)"></div>';
}

function testMe(e){
    setTimeout(function(){ e.setAttribute("style",""); }, 600);
}

function menuClose(e,callback) {
    var nodeContainer = e.parentNode;
    nodeContainer.className = "";
    e.remove();
}

function triggerView(view){
    var view = view;
//  fade out buttons text
    var buttons = document.getElementsByClassName('button-main');
    for (var i = 0; i < buttons.length; ++i) {
        var item = buttons[i];
        item.className = item.className + " hide";
    }
    setTimeout(function(){
        expandView(view);
    },500)
};

//function printMousePos(e) {
//    var cursorX = e.clientX;
//    var cursorY = e.clientY;
//    console.log("X: " + cursorX + " Y: " + cursorY);
//}
//
//document.addEventListener("click", printMousePos);

function expandView(target){
    var viewToExpand = document.getElementById("expand");
    viewToExpand.className = viewToExpand.className + " fullScreen";
    viewFadeOut(viewToExpand);
}

function viewFadeOut(view){
    var viewToFadeOut = view;
    setTimeout(function(){
        viewToFadeOut.className = viewToFadeOut.className + " reverse";
        var buttons = document.getElementsByClassName('button-main');
        for (var i = 0; i < buttons.length; ++i) {
            var item = buttons[i];
            item.className = "button-main";
        }

    },1000);
    setTimeout(function(){ viewToFadeOut.className = "expand-circle";}, 1400);
}
var addRippleEffect = function (e) {
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'button') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    var expandCircle = document.getElementsByClassName('expand-circle');
    var clickTop = e.pageY / 2 - document.body.scrollTop;
    var clickLeft = e.pageX / 2 - document.body.scrollLeft;
    for (var i = 0; i < expandCircle.length; ++i) {
        var item = expandCircle[i];
        item.style.top = e.pageY + 'px';
        item.style.left = e.pageX + 'px';
    }
    return false;
}

document.addEventListener('click', addRippleEffect, false);



function triggerPopup(type){
    document.getElementById('popup').className = "show";
}

function closePopup(){
    document.getElementById('popup').className = "";
}

//angular stuff only
var app = angular.module('mydeals', []);

function getUser(fields){
    var url = ""

    if(fields && fields != '')
        url = 'http://dcp3451-test.apigee.net/mydeals/users?fields='+fields;
    else
        url = 'http://dcp3451-test.apigee.net/mydeals/users';

    app.controller('userProfileController',['$scope','$http',function($scope,$http){

        $http.get(url).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.fname = data.fname;
            $scope.lname = data.lname;
            $scope.fullname = function(){
                return $scope.fname+" "+$scope.lname;
            }
            $scope.photo = data.picture;
            $scope.points = data.pt_total;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

        });

    }]);
}

getUser("fname,lname,picture,pt_total");
