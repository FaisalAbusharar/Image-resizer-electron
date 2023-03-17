const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
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