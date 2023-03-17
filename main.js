const path = require('path')
const { app, BrowserWindow, Menu } = require('electron')

const isDev = process.env.NODE_EV !== 'production'
const isMac = process.platform === 'darwin'

//* Create main window
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Reizer',
        width: isDev ? 1000: 500,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
          },
          //! Attaching our script to the preload.js file
    });

    //* Open Dev tools if in developer enviroment
    if(isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html')) ;
}


//* Create 'about' window
function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: 'About Image Reizer',
        width: 300,
        height: 300
    });



    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html')) ;
}

//* App is ready

app.whenReady().then(() => {
    createMainWindow();

    //! Implment menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu)

    app.on('activate', () =>  {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});




//* Menu template
// const menu = [
//     {
//         label: 'File',
//         submenu: [{
//             label: 'Quit',
//             click: () => app.quit(),
//             accelerator: "Alt+F4"
//         }]
//     }
// ]

//? Better to use: role: 'fileMenu'

const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }] //* Mac is a pain in the ass
    }] : []),
    {
        role: 'fileMenu',
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    }] : [])
]

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})