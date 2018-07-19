// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

(function () {

    var remote =require('electron').remote
    var BrowserWindow = remote.BrowserWindow

    function init() { 
        document.getElementById("min-btn").addEventListener("click", function (e) {
            var window = BrowserWindow.getFocusedWindow();
            window.minimize(); 
        });

        document.getElementById("max-btn").addEventListener("click", function (e) {
            var window = BrowserWindow.getFocusedWindow(); 
            window.maximize(); 
        });

        document.getElementById("close-btn").addEventListener("click", function (e) {
            var window = BrowserWindow.getFocusedWindow();
            window.close();
        }); 
    }; 

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init(); 
        }
    };

})();

