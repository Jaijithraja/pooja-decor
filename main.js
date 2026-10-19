const { app, BrowserWindow, Tray, Menu, screen, globalShortcut, nativeImage, ipcMain } = require('electron');
const path = require('path');

// Transparent windows need this on most Linux setups
if (process.platform === 'linux') app.disableHardwareAcceleration();
if (!app.requestSingleInstanceLock()) app.quit();

let wins = [];
let tray = null;
let visible = true;
let opacity = 1;
let timer = null;

function makeWindow(display) {
  const b = display.workArea; // stays clear of the taskbar / menu bar
  const w = new BrowserWindow({
    x: b.x, y: b.y, width: b.width, height: b.height,
    transparent: true, frame: false, thickFrame: false, hasShadow: false,
    resizable: false, movable: false, minimizable: false, maximizable: false, fullscreenable: false,
    skipTaskbar: true, focusable: false, alwaysOnTop: true, show: false,
    webPreferences: {
      contextIsolation: true, sandbox: true,
      // renderer.js also acts as this window's tiny, context-isolated preload.
      preload: path.join(__dirname, 'renderer.js')
    }
  });
  w.setAlwaysOnTop(true, 'screen-saver');
  w.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  w.setIgnoreMouseEvents(true, { forward: true }); // forward movement so the bell can opt into mouse input
  w.setOpacity(opacity);
  w.loadFile(path.join(__dirname, 'index.html'));
  w.once('ready-to-show', () => { if (visible) w.showInactive(); });
  return w;
}

ipcMain.on('pooja-decor:set-mouse-ignored', (event, ignore) => {
  const w = BrowserWindow.fromWebContents(event.sender);
  if (w && !w.isDestroyed()) {
    w.setIgnoreMouseEvents(Boolean(ignore), { forward: true });
  }
});

function rebuild() {
  wins.forEach(w => { if (!w.isDestroyed()) w.destroy(); });
  wins = screen.getAllDisplays().map(makeWindow);
}

function scheduleRebuild() {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 400);
}

function setVisible(v) {
  visible = v;
  wins.forEach(w => (visible ? w.showInactive() : w.hide()));
  buildMenu();
}

function setOpacity(o) {
  opacity = o;
  wins.forEach(w => w.setOpacity(o));
  buildMenu();
}

function buildMenu() {
  const op = v => ({ label: Math.round(v * 100) + '%', type: 'radio', checked: opacity === v, click: () => setOpacity(v) });
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Show decor', type: 'checkbox', checked: visible, accelerator: 'CommandOrControl+Shift+P', click: () => setVisible(!visible) },
    { label: 'Opacity', submenu: [op(1), op(0.75), op(0.5), op(0.25)] },
    { label: 'Start at login', type: 'checkbox', checked: app.getLoginItemSettings().openAtLogin,
      click: item => app.setLoginItemSettings({ openAtLogin: item.checked }) },
    { type: 'separator' },
    { label: 'Quit Pooja Decor', role: 'quit' }
  ]));
}

app.whenReady().then(() => {
  if (app.dock) app.dock.hide();
  rebuild();

  const icon = nativeImage.createFromPath(path.join(__dirname, 'icon.png')).resize({ width: 22, height: 22 });
  tray = new Tray(icon);
  tray.setToolTip('Pooja Decor');
  tray.on('click', () => setVisible(!visible));
  buildMenu();

  globalShortcut.register('CommandOrControl+Shift+P', () => setVisible(!visible));
  ['display-added', 'display-removed', 'display-metrics-changed'].forEach(e => screen.on(e, scheduleRebuild));
});

app.on('window-all-closed', e => e.preventDefault()); // keep running in the tray
app.on('will-quit', () => globalShortcut.unregisterAll());
