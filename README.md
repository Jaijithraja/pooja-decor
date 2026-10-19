# 🪔 Pooja Decor — a tiny puja corner for your desktop

Give your screen a little festive calm: a transparent Electron overlay with marigolds, jasmine, a vibhuti pattai with kumkum, a ritual plate, rising agarbathi smoke, and one very tappable bell. No actual incense near your laptop.

## The little details

- 🌼 An animated marigold-and-jasmine garland across the top
- 🔴 A vibhuti pattai with a kumkum dot, plus a plate with kumkum, vibhuti, and turmeric
- 🪔 A glowing agarbathi with drifting smoke
- 🔔 Click the bell for a chime, or drag it side to side to ring it as you go
- 🖥️ The decor floats over your desktop while regular clicks pass through; the bell stays interactive

## Run it

You’ll need [Node.js](https://nodejs.org/) and npm. From Terminal:

```bash
git clone https://github.com/Jaijithraja/pooja-decor.git
cd pooja-decor
npm install
npm start
```

The app stays in the system tray (or the macOS menu bar).

## Desktop controls

- Click the tray icon, or press **Ctrl+Shift+P** on Windows/Linux and **⌘+Shift+P** on macOS, to show or hide the decor
- Open the tray menu to set opacity (100%, 75%, 50%, or 25%), start at login, or quit
- Find the bell at the bottom centre: click to ring, drag left and right to shake

## Build an installer

```bash
npm run dist
```

Electron Builder is configured for macOS, Windows (NSIS), and Linux (AppImage). Linux window opacity is not supported; transparent overlays may need a compositing window manager, and some GNOME setups need a tray extension.

## What’s in the box

`main.js` creates the desktop overlay and tray menu, `index.html` draws the scene, and `renderer.js` animates the decor and handles the bell.
