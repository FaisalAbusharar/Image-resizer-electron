const { contextBridge } = require('electron')
const os = require('os');
const path = require('path')

contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir()
    
    
    
})

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args)
    
})

/*

Electron's main process is a Node.js environment that has full
operating system access. On top of Electron modules,
you can also access Node.js built-ins, as well as any packages
installed via npm. On the other hand, renderer processes
run web pages and do not run Node.js by default for security reasons.


To bridge Electron's different process types together,
we will need to use a special script called a preload.

More information here: https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

*/