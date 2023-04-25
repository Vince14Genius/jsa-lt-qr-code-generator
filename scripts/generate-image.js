function createDownloadableImage() {
    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("container");

    // draw the primary color background
    ctx.fillStyle = primaryColorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the secondary color trapezoid
    const offset = (1179 * Math.atan(Math.PI / 6) / 2);
    ctx.beginPath();
    ctx.fillStyle = secondaryColorInput.value;
    ctx.moveTo(0, 1278 - offset);
    ctx.lineTo(1179, 1278 + offset);
    ctx.lineTo(1179, 2556);
    ctx.lineTo(0, 2556);
    ctx.closePath();
    ctx.fill();

    // draw the logo
    const logo = document.getElementsByClassName("logo")[0];
    const logoTop = logo.getBoundingClientRect().top - container.getBoundingClientRect().top;
    ctx.drawImage(logo, 589.5 - 160, logoTop * 2, 320, 320);

    // draw the QR codes & their containers
    const qrCodeContainers = document.getElementsByClassName("qrcode");
    for (let qrCodeContainer of qrCodeContainers) {
        const qrCodeContainerTop = qrCodeContainer.getBoundingClientRect().top - container.getBoundingClientRect().top;
        const qrCodeContainerLeft = qrCodeContainer.getBoundingClientRect().left - container.getBoundingClientRect().left;
        const qrCodeContainerWidth = qrCodeContainer.getBoundingClientRect().width;
        const qrCodeContainerHeight = qrCodeContainer.getBoundingClientRect().height;

        ctx.beginPath();
        ctx.roundRect(qrCodeContainerLeft * 2, qrCodeContainerTop * 2, qrCodeContainerWidth * 2, qrCodeContainerHeight * 2, 32);
        ctx.fillStyle = "white";
        ctx.closePath();
        ctx.fill();

        // draw the embedded imgs
        const qrCodeImgs = qrCodeContainer.getElementsByTagName("img");

        function drawEmbeddedImg(qrCodeImg) {
            const qrCodeImgTop = qrCodeImg.getBoundingClientRect().top - container.getBoundingClientRect().top;
            const qrCodeImgLeft = qrCodeImg.getBoundingClientRect().left - container.getBoundingClientRect().left;

            ctx.drawImage(qrCodeImg, qrCodeImgLeft * 2, qrCodeImgTop * 2, qrCodeImg.getBoundingClientRect().width * 2, qrCodeImg.getBoundingClientRect().height * 2);
        }

        drawEmbeddedImg(qrCodeImgs[1]);

        // draw overlay rect
        const overlay = qrCodeContainer.getElementsByClassName("overlay")[0];
        const overlayTop = overlay.getBoundingClientRect().top - container.getBoundingClientRect().top;
        const overlayLeft = overlay.getBoundingClientRect().left - container.getBoundingClientRect().left;
        const overlayWidth = overlay.getBoundingClientRect().width;
        const overlayHeight = overlay.getBoundingClientRect().height;
        ctx.fillStyle = "white";
        ctx.fillRect(overlayLeft * 2, overlayTop * 2, overlayWidth * 2, overlayHeight * 2);

        drawEmbeddedImg(qrCodeImgs[0]);
    }

    // draw all the text at the correct relative positions
    const textElements = document.getElementsByClassName("text");
    for (let textElement of textElements) {
        const textTop = textElement.getBoundingClientRect().top - container.getBoundingClientRect().top;
        const textLeft = textElement.getBoundingClientRect().left - container.getBoundingClientRect().left;

        // get center x and y
        const textCenterX = textLeft + textElement.getBoundingClientRect().width / 2;
        const textCenterY = textTop + textElement.getBoundingClientRect().height / 2;

        ctx.font = window.getComputedStyle(textElement).font;
        console.log(ctx.font);

        // retrieve the font weight
        const fontWeight = window.getComputedStyle(textElement).fontWeight;

        // double the font size
        const fontSizeString = window.getComputedStyle(textElement).fontSize;
        const fontSize = parseFloat(fontSizeString);
        ctx.font = ctx.font.replace(fontSizeString, fontSize * 2 + "px");
        console.log(ctx.font);

        // add the font weight to the front
        ctx.font = fontWeight + " " + ctx.font;

        ctx.fillStyle = window.getComputedStyle(textElement).color;
        ctx.textAlign = 'center';
        ctx.fillText(textElement.innerText, textCenterX * 2, textCenterY * 2);
    }

    /*
    // hide container and show canvas
    container.style.display = "none";
    canvas.style.display = "block";
    */

    // get week number
    const weekNumber = document.getElementById("week-number").innerText;

    // get quarter name
    const quarterName = document.getElementById("quarter-name").innerText.toLowerCase();

    // download the image
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `lt-qr-${quarterName}-wk${weekNumber}.png`;
    a.click();
}