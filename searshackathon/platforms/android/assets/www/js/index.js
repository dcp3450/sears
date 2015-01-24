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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
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
    callback(nodeContainer);
}

function triggerView(view){

}
