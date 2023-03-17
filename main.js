const path = require('path')
const { app, BrowserWindow, Menu } = require('electron')

const isDev = process.env.NODE_EV !== 'production'
const isMac = process.platform === 'darwin'

//* Create main window
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Reizer',
        width: isDev ? 1000: 500,
        height: 600
    });

    //* Open Dev tools if in developer enviroment
    if(isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html')) ;
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
const menu = [
    {
        label: 'File',
        submenu: [{
            label: 'Quit',
            click: () => app.quit(),
            accelerator: "Alt+F4"
        }]
    }
]

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})