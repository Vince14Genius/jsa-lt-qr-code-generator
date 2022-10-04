# jsa-lt-qr-code-generator
QR code image generator for UCSD JSA's Language Table event committee

[Link to the generator tool](https://vince14genius.github.io/jsa-lt-qr-code-generator/)

## Usage

1. Open the link above in desktop (not mobile) Safari, Chrome, or Firefox (update your browser if it doesn't work)
2. Make customizations to the links, week, quarter, etc. as needed
3. Click the hide (`◀︎`) button to hide the customization panel
4. Inspect Element (google if you don't know how to do this in your browser)
5. Find the `<div id="container">` element...
    - (the full tree is `<html>`→`<body>`→`<div id="super-container">`→`<div id="container">`)
    - (it's also marked by a very noticeable comment above it)
6. Right-click and choose "Capture Node Screenshot"
    - ("Capture Screenshot" on Safari and "Screenshot Node" on Firefox)
7. Voilà

## Customizability

 - [x] number of QR codes (1 or 2)
 - [x] link #1
 - [x] link #2
 - [x] week # into the quarter (e.g. week `5`)
 - [x] quarter name (e.g. `FA22`)
 - [ ] background color
 - [ ] icon images at the center of the QR codes
