// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const path = require('path');
const config = require(path.join(__dirname, 'config.json'));
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const client = require('discord-rich-presence')(config.appid);
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 630, frame: false})

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  console.log('Set XD')


 
  client.updatePresence({
    state: 'Up and running',
    instance: false
  })

   
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

electron.ipcMain.on('updaterp', function(event, data) {
  console.log(data)
  console.log(data.state)
  var newdata = {}
  for (const key of Object.keys(data)) {
  
    if(!data[key] == '') {
      console.log(key,data[key])
      newdata[key] = data[key]
    }
    // console.log(key, obj[key]);
  }
  newdata.instance = false
  console.log(newdata)
  client.updatePresence(newdata)
});

electron.ipcMain.on('secret', function(event) {
    let int = 0;

    let data = [
      {
        details: 'Follow on twitter',
        state: '@iuqy_',
        img: 'twit'
      },
      {
        details: 'I like trains',
        state: 'xD',
        img: 'xd'
      },
      {
        details: 'Flushed!',
        state: 'yoikes',
        img: 'flushed'
      }
    ]
    setInterval(() => {
      client.updatePresence({
        state: data[int].state,
        details: data[int].details,
        largeImageKey: data[int].img,
        instance: true,
      });
      int++;
      if(int == 3) int = 0;
   }, 5000)
})

 

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
