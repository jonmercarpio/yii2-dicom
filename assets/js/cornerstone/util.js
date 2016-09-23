
function loadListener(imageViewer, current_image_stack_loaded) {
    $(window).resize(function () {
        resizeStudyViewer(imageViewer);
    });
}

function loadCache(imageViewer) {
    imageViewer.stacks.forEach(function (e) {
        e.imageIds.forEach(function (i) {
            cornerstone.loadAndCacheImage(i);
        });
    });
}

// Disable all tools
function disableAllTools() {
    forEachViewport(function (element) {
        cornerstoneTools.wwwc.disable(element);
        cornerstoneTools.pan.activate(element, 2); // 2 is middle mouse button
        cornerstoneTools.zoom.activate(element, 4); // 4 is right mouse button
        cornerstoneTools.probe.deactivate(element, 1);
        cornerstoneTools.length.deactivate(element, 1);
        cornerstoneTools.angle.deactivate(element, 1);
        cornerstoneTools.ellipticalRoi.deactivate(element, 1);
        cornerstoneTools.rectangleRoi.deactivate(element, 1);
        cornerstoneTools.stackScroll.deactivate(element, 1);
        cornerstoneTools.wwwcTouchDrag.deactivate(element);
        cornerstoneTools.zoomTouchDrag.deactivate(element);
        cornerstoneTools.panTouchDrag.deactivate(element);
        cornerstoneTools.stackScrollTouchDrag.deactivate(element);
        cornerstoneTools.stopClip(element);
    });
}

function forEachViewport(callback) {
    var elements = $('.viewport');
    $.each(elements, function (index, value) {
        var element = value;
        try {
            callback(element);
        }
        catch (e) {
        }
    });
}

function resizeStudyViewer(imageViewer) {

    $(imageViewer.selector + ' #imageViewer').css({
        'height': ($(window).height() - 50) + 'px'
    });

    $(imageViewer.selector + ' #thumbnailsContainerParent').css({
        'height': $(window).height()
    });

    imageViewer.forEachElement(function (el, vp) {
        cornerstone.resize(el, true);
        if ($(el).data('waiting')) {
            var ol = vp.find('.overlay-text');
            if (ol.length < 1) {
                ol = $('<div class="overlay overlay-text">Please drag a stack onto here to view images.</div>').appendTo(vp);
            }
            var ow = vp.width() / 2,
                    oh = vp.height() / 2;
            ol.css({position: 'absolute', top: '50%', left: ow - (ol.width() / 3)});
        }
    });

    $('.dicom_thumbnail').each(function () {
        try {
            cornerstone.resize(this, true);
        } catch (e) {
            return;
        }
    });

    $(".tooltip").fadeOut("slow");
}

function initViewports(imageViewer) {
    imageViewer.forEachElement(function (el) {
        $(el).on('CornerstoneStackScroll', function (eventData, data) {
            imageViewer.scrollBar.val(data.newImageIdIndex);
        });
        cornerstone.enable(el);
        $(el).droppable({
            drop: function (evt, ui) {
                var fromStack = $(ui.draggable.context).data('index'), toItem = $(this).data('index');
                loadStudy(imageViewer, fromStack, toItem);
            }
        });
    });
}

function loadStudy(imageViewer, index, elem) {

    disableAllTools();

    var element = imageViewer.getElement(elem);
    if ($(element).data('waiting')) {
        imageViewer.viewports[elem].find('.overlay-text').remove();
        $(element).data('waiting', false);
    }

    var stack = imageViewer.stacks[index];
    imageViewer.lastIndex = index;
    imageViewer.currentElement = element;

    $(element).data('index', index);
    $(element).data("stack", stack);

    var imageId = stack.imageIds[stack.currentImageIdIndex];

    if (!imageId) {
        $(element).parent().css('visibility', 'hidden');
        return;
    }

    $(element).parent().css('visibility', 'visible');

    cornerstoneTools.mouseInput.enable(element);
    cornerstoneTools.mouseWheelInput.enable(element);

    cornerstone.loadImage(imageId).then(function (image) {

        setupViewportOverlays(element, stack.data);

        if (!imageViewer.isTiling) {
            // Stack tools
            cornerstoneTools.addStackStateManager(element, ['stack', 'playClip']);
            cornerstoneTools.addToolState(element, 'stack', stack);
            cornerstoneTools.stackScrollWheel.activate(element);
            cornerstoneTools.stackPrefetch.enable(element);
            cornerstoneTools.stackScrollWheel.activate(element);
        }

        var defViewport = cornerstone.getDefaultViewport(element, image);
        cornerstone.displayImage(element, image, defViewport);
        cornerstone.fitToWindow(element);
        cornerstone.updateImage(element);

    });

    resizeStudyViewer(imageViewer);
}

function setupThumbnails(imageViewer) {
    imageViewer.seriesElement.draggable({helper: "clone", zIndex: 2500});
    imageViewer.seriesElement.on('click touchstart', function () {
        imageViewer.getCurrentStack().currentImageIdIndex = 0;
        loadStudy(imageViewer, $(this).data('index'), 0);
        imageViewer.scrollBar.attr('max', imageViewer.getTilingMaxRange());
        imageViewer.scrollBar.val(0);
        imageViewer.scrollBar.change();
    });
}

function setupNewLayout(imageViewer, type) {
    var previousUsed = [];
    imageViewer.forEachElement(function (el, vp, i) {
        if (!isNaN($(el).data('index'))) {
            previousUsed.push($(el).data('index'));
        }
    });
    imageViewer.setLayout(type);
    initViewports(imageViewer);
    if (previousUsed.length > 0) {
        var elem = 0;
        previousUsed = previousUsed.slice(0, imageViewer.viewports.length);
        previousUsed.forEach(function (v) {
            loadStudy(imageViewer, v, elem++);
        });
    }
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
