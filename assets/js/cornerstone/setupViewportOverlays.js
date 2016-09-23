
function setupOverLayText(element, data) {
    var parent = $(element).parent();
    var childDivs = $(parent).find('.overlay');
    var topLeft = $(childDivs[0]).find('div');
    var topRight = $(childDivs[1]).find('div');
    // Set the overlay text
    $(topLeft[0]).text(data.patientName);
    $(topLeft[1]).text(data.patientId);
    $(topRight[0]).text(data.studyDescription);
    $(topRight[1]).text(data.studyDate);
}

function setupViewportOverlays(element, data, stack) {

    var parent = $(element).parent();
    setupOverLayText(element, data);

    // Get the overlays
    var childDivs = $(parent).find('.overlay');
    var bottomLeft = $(childDivs[2]).find('div');
    var bottomRight = $(childDivs[3]).find('div');

    // On new image (displayed?)
    function onNewImage(e, eventData) {

        if (isNaN($(eventData.element).data('windowCenter')) || $(eventData.element).data('windowWidth')) {
            $(eventData.element).data('windowCenter', eventData.viewport.voi.windowCenter);
            $(eventData.element).data('windowWidth', eventData.viewport.voi.windowWidth);
        }

        var playClipToolData = cornerstoneTools.getToolState(element, 'playClip');

        if (playClipToolData !== undefined && playClipToolData.data.length > 0 && playClipToolData.data[0].intervalId !== undefined && eventData.frameRate !== undefined) {
            $(bottomLeft[0]).text("FPS: " + Math.round(eventData.frameRate));
//            console.log('frameRate: ' + e.frameRate);
        } else {
            // Set FPS empty if not playing a clip
            if ($(bottomLeft[0]).text().length > 0) {
                $(bottomLeft[0]).text("");
            }
        }

        var toolData = cornerstoneTools.getToolState(element, 'stack');
        if (toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
            return;
        }
        var stack = toolData.data[0];
        $(bottomLeft[2]).text("Image # " + (stack.currentImageIdIndex + 1) + "/" + stack.imageIds.length);
    }
    $(element).on("CornerstoneNewImage", onNewImage);

    // On image rendered
    function onImageRendered(e, eventData) {

        // Set zoom overlay text
        $(bottomRight[0]).text("Zoom:" + eventData.viewport.scale.toFixed(2));
        // Set WW/WL overlay text                       
        $(bottomRight[1]).text("WW/WL:" + Math.round(eventData.viewport.voi.windowWidth) + "/" + Math.round(eventData.viewport.voi.windowCenter));
//        $(bottomRight[1]).text(data.seriesDescription);
        // Set render time overlay text
//        $(bottomLeft[1]).text("Render Time:" + eventData.renderTimeInMs + " ms");
        $(bottomLeft[1]).text(data.seriesDescription);
    }
    // Add a CornerstoneImageRendered event listener on the 'element' (viewer) (?)
    $(element).on("CornerstoneImageRendered", onImageRendered);

}