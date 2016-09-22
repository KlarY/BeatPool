const {
    app,
    globalShortcut,
    BrowserWindow,
    ipcMain
} = require('electron');
// Module to control application life.
// const app = electron.app
// Module to create native browser window.
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800
    })

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

app.on('ready', createWindow)
app.on('ready', () => {
    // Register a 'CommandOrControl+X' shortcut listener.
    var ret1 = globalShortcut.register('1', () => {
        console.log('1 pressed');
        mainWindow.webContents.send('global-shortcut', 1);
    });
    var ret2 = globalShortcut.register('2', () => {
        console.log('2 pressed');
        mainWindow.webContents.send('global-shortcut', 2);
    });
    var ret3 = globalShortcut.register('3', () => {
        console.log('3 pressed');
        mainWindow.webContents.send('global-shortcut', 3);
    });
    var ret4 = globalShortcut.register('4', () => {
        console.log('4 pressed');
        mainWindow.webContents.send('global-shortcut', 4);
    });
    var ret5 = globalShortcut.register('5', () => {
        console.log('5 pressed');
        mainWindow.webContents.send('global-shortcut', 5);
    });
    var ret6 = globalShortcut.register('6', () => {
        console.log('6 pressed');
        mainWindow.webContents.send('global-shortcut', 6);
    });
    var ret7 = globalShortcut.register('7', () => {
        console.log('7 pressed');
        mainWindow.webContents.send('global-shortcut', 7);
    });
    var ret0 = globalShortcut.register('0', () => {
        console.log('0 pressed');
        mainWindow.webContents.send('global-shortcut', 0);
    });
    var rets=[ret0,ret1,ret2,ret3,ret4,ret5,ret6,ret7];
    for(var i in rets){
      if (!rets[i]) {
          console.log('registration '+ i +' failed')
      }
    }


    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('1'))
})
app.on('will-quit', () => {
        // Unregister a shortcut.
        globalShortcut.unregister('1')

        // Unregister all shortcuts.
        globalShortcut.unregisterAll()
    })
    // var handler = function(e){
    //   console.log(e);
    //   console.log('shortcut triggled');
    // }
    // Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
