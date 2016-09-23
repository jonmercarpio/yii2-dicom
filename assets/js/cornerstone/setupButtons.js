
function setupButtons(imageViewer) {

    // Get the button elements
    var buttons = $(imageViewer.root).find('button');
    var $box = null;
    var isOpen = false;

    // WW/WL
    $(buttons[0]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.wwwc.activate(element, 1);
            cornerstoneTools.wwwcTouchDrag.activate(element);
        });
    });

    // Invert
    $(buttons[1]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            var viewport = cornerstone.getViewport(element);
            // Toggle invert
            if (viewport.invert === true) {
                viewport.invert = false;
            } else {
                viewport.invert = true;
            }
            cornerstone.setViewport(element, viewport);
        });
    });

    // Zoom
    $(buttons[2]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.zoom.activate(element, 5); // 5 is right mouse button and left mouse button
            cornerstoneTools.zoomTouchDrag.activate(element);
        });
    });

    // Pan
    $(buttons[3]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.pan.activate(element, 3); // 3 is middle mouse button and left mouse button
            cornerstoneTools.panTouchDrag.activate(element);
        });
    });

    // Stack scroll
    $(buttons[4]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.stackScroll.activate(element, 1);
            cornerstoneTools.stackScrollTouchDrag.activate(element);
        });
    });

    // Length measurement
    $(buttons[5]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.length.activate(element, 1);
        });
    });

    // Angle measurement
    $(buttons[6]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.angle.activate(element, 1);
        });
    });

    // Pixel probe
    $(buttons[7]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.probe.activate(element, 1);
        });
    });

    // Elliptical ROI
    $(buttons[8]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.ellipticalRoi.activate(element, 1);
        });
    });

    // Rectangle ROI
    $(buttons[9]).on('click touchstart', function () {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.rectangleRoi.activate(element, 1);
        });
    });

    // Play clip
    $(buttons[10]).on('click touchstart', function () {
        forEachViewport(function (element) {
            var stackState = cornerstoneTools.getToolState(element, 'stack');
            var frameRate = stackState.data[0].frameRate;
            // Play at a default 10 FPS if the framerate is not specified
            if (frameRate === undefined) {
                frameRate = 10;
            }
            cornerstoneTools.playClip(element, frameRate);
        });
    });

    // Stop clip
    $(buttons[11]).on('click touchstart', function () {
        forEachViewport(function (element) {
            cornerstoneTools.stopClip(element);
        });
    });

    //Reset
    $(buttons[12]).on('click touchstart', function () {
        forEachViewport(function (element) {
            var toolStateManager = cornerstoneTools.getElementToolStateManager(element);
            toolStateManager.clear(element);
            var viewport = cornerstone.getViewport(element);
            viewport.voi.windowCenter = $(element).data('windowCenter');
            viewport.voi.windowWidth = $(element).data('windowWidth');
            viewport.rotation = 0;
            viewport.invert = false;
            cornerstone.setViewport(element, viewport);
            cornerstone.updateImage(element);
        });
    });

    //Rotate Left
    $(buttons[13]).on('click touchstar', function () {
        forEachViewport(function (element) {
            var viewport = cornerstone.getViewport(element);
            viewport.rotation -= 90;
            cornerstone.setViewport(element, viewport);
        });
    });

    //Rotate Right
    $(buttons[14]).on('click touchstar', function () {
        forEachViewport(function (element) {
            var viewport = cornerstone.getViewport(element);
            viewport.rotation += 90;
            cornerstone.setViewport(element, viewport);
        });
    });

    //Layout
    $(buttons[15]).next().find('a').click(function () {
        imageViewer.isTiling = false;
        imageViewer.getCurrentStack().currentImageIdIndex = 0;
        setupNewLayout(imageViewer, $(this).text());
        imageViewer.scrollBar.attr('max', imageViewer.getTilingMaxRange());
    });

    //WW/WC
    $(buttons[16]).next().find('a').on('click touchstar', function () {
        var $me = $(this);
        imageViewer.forEachElement(function (el, vp, i) {
            var viewport = cornerstone.getViewport(el);
            if (!viewport)
                return;
            viewport.voi.windowWidth = parseFloat($me.data('windowwidth'));
            viewport.voi.windowCenter = parseFloat($me.data('windowcenter'));
            cornerstone.setViewport(el, viewport);
            cornerstone.updateImage(el);
        });
    });

    //Tiling
    $(buttons[17]).next().find('a').on('click touchstar', function () {
        var $scroll = imageViewer.scrollBar;
        $scroll.addClass('tiling');
        imageViewer.isTiling = true;
        imageViewer.getCurrentStack().currentImageIdIndex = 0;

        var type = $(this).text();
        imageViewer.setLayout(type);
        initViewports(imageViewer);
        imageViewer.forEachElement(function (element, e, i) {
            imageViewer.getCurrentStack().currentImageIdIndex = i;
            loadStudy(imageViewer, imageViewer.lastIndex, i);
        });
        $scroll.attr('max', imageViewer.getTilingMaxRange());
        $scroll.val(0);
    });


    $(buttons[18]).on('click touchstar', function () {
        if (!$box) {
            $box = $(imageViewer.selector).parent();
        }

        if (!isOpen) {
            isOpen = true;
            $(imageViewer.selector).appendTo($('body'));
            $(imageViewer.selector).addClass('full-screen');
            $(imageViewer.selector).css({
                'width': $(document).width(),
                'height': $(document).height()
            });

            $(imageViewer.selector + ' #thumbnailsContainerParent').css({
                'height': $(window).height()
            });
            $(imageViewer.selector + ' #thumbnailsContainer').removeClass('pre-scrollable');
            $(imageViewer.selector + ' #thumbnailsContainerParent').addClass('scrollable');
            $(imageViewer.selector + ' #imageViewer').removeClass('pre-scrollable');

            $(this).find('span').addClass('fa-compress').removeClass('fa-expand');
        } else {

            isOpen = false;
            $(imageViewer.selector).appendTo($box);
            $(imageViewer.selector).removeClass('full-screen');
            $(imageViewer.selector).css({
                'width': '',
                'height': ''
            });
            $(imageViewer.selector + ' #thumbnailsContainerParent').css({
                'height': ''
            });
            $(imageViewer.selector + ' #thumbnailsContainer').addClass('pre-scrollable');
            $(imageViewer.selector + ' #thumbnailsContainerParent').removeClass('scrollable');
            $(imageViewer.selector + ' #imageViewer').addClass('pre-scrollable');

            $(this).find('span').addClass('fa-expand').removeClass('fa-compress');
        }

        resizeStudyViewer(imageViewer);
    });

    imageViewer.scrollBar.on('change keyup', function () {
        var $me = $(this);
        var index = parseInt($me.val());
        if (imageViewer.isTiling) {
            var pw = parseInt($me.val()) * imageViewer.getRowsColsCount();
            imageViewer.forEachElement(function (element, e, i) {
                imageViewer.getCurrentStack().currentImageIdIndex = i + pw;
                loadStudy(imageViewer, imageViewer.lastIndex, i);
            });
        } else {
            cornerstoneTools.scrollToIndex(imageViewer.currentElement, index);
        }
    });

    // Tooltips
    $('[title]').tooltip();
    imageViewer.scrollBar.attr('max', imageViewer.getTilingMaxRange());
}