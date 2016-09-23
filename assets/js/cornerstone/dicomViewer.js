var viewportTemplate;
var studyViewerTemplate;
var current_image_stack_loaded = [1];
var thumbnails_list = [];
var data;

loadTemplate($('#dv_url_study').val(), function (element) {
    studyViewerTemplate = element;
    loadTemplate($('#dv_url_viewport').val(), function (element) {
        viewportTemplate = element;
        setTimeout("load()", 2000);
    });

});

// Resize main
function resizeMain() {
    var height = $(window).height();
    $('#main').height(height - 50);
    $('#tabContent').height(height - 10);
}

// Call resize main on window resize
$(window).resize(function () {
    resizeMain();
});
resizeMain();


// Prevent scrolling on iOS
document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
});


function addOptionToSelector(d, seriesIdx) {
    $('<option/>', {
        value: d.studyPk,
        text: d.studyDescription.substring(0, 12),
        title: d.studyDescription + " (" + d.studyInstitution + ")" + "(" + d.studyMods + ")" + "(" + d.studyDate + ")",
        'data-toggle': "tooltip",
        'data-series': d.numSeries,
        'data-images': d.numImages,
        'data-seriesidx': seriesIdx,
        'data-preliminary': d.hasPreliminary,
        'data-final': d.hasFinal
    }).appendTo($('#dv_study_select_list'));
}

function load() {

    var studyViewerCopy = studyViewerTemplate.clone();
    var viewportCopy = viewportTemplate.clone();
    studyViewerCopy.find('.imageViewer').append(viewportCopy);
    studyViewerCopy.attr("id", 'x');
    studyViewerCopy.removeClass('hidden');
    studyViewerCopy.show();
    studyViewerCopy.appendTo('#tabContent');

    data = JSON.parse($('#dv_data').val());
    var prev_data = JSON.parse($('#dv_data_prev').val());
    var seriesIdx = parseInt(data.numSeries);
    addOptionToSelector(data, 0);
    prev_data.forEach(function (d) {
        addOptionToSelector(d, seriesIdx);
        seriesIdx += parseInt(d.numSeries);
        d.seriesList.forEach(function (series) {
            data.seriesList.push(series);
        });
    });

    $('#loading').remove();
    loadStudy(studyViewerCopy, viewportTemplate, data);
    $(window).trigger('resize');
    $('#dv_study_select_list').change();
}

function loadThumbnail(idx, limit) {
    var imageID = thumbnails_list[idx].url;
    var thumbnail = thumbnails_list[idx].element;
    loadImageThumbnail(imageID, thumbnail, idx, limit);
}

function loadImageThumbnail(imageID, thumbnail, next, limit) {

    if (next < limit) {
        var r = cornerstone.loadAndCacheImage(imageID);
        r.then(function (image) {
            cornerstone.displayImage(thumbnail, image);
            data.seriesList[next].instanceList.forEach(function (image) {
                cornerstone.loadAndCacheImage(image.imageId);
            });
            displayImageThumbailCallback(next, limit);
        }, function (e) {
            var $d = $(thumbnails_list[next].description);
            $d.html($d.html().replace(/\[.*\]/gi, "IMAGE NOT FOUND"));
            displayImageThumbailCallback(next, limit);
        });
    }
}

function displayImageThumbailCallback(next, limit) {
    ++next;
    var t = thumbnails_list[next];
    if (t !== undefined)
        loadImageThumbnail(t.url, t.element, next, limit);
}

$(document).ready(function () {
    $(document).on('change', '#dv_study_select_list', function () {
        var $me = $(this);
        var $option = $me.find(':selected');
        var $pre = $('#preliminary_link');
        var $final = $('#final_link');

        $('.thumbnails a').hide();
        var stpk = ".stpk_" + $me.val();

        if ($option.data('preliminary')) {
            $pre.show();
        } else {
            $pre.hide();
        }

        if ($option.data('final')) {
            $final.show();
        } else {
            $final.hide();
        }

        $(stpk).show();
        loadThumbnail($option.data('seriesidx'), parseInt($option.data('seriesidx')) + parseInt($option.data('series')));

    });

    $(document).on('click', ".diagnostic_link", function () {
        var $me = $(this);
        BootstrapDialog.show({
            title: $me.attr('title'),
            message: $('<div/>').load($me.attr("href") + "?id=" + $('#dv_study_select_list').val()),
            draggable: true,
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false
        });
        return false;
    });
});

window.onerror = function (msg, url, line, col, error) {
    // Note that col & error are new to the HTML 5 spec and may not be 
    // supported in every browser.  It worked for me in Chrome.
    var extra = !col ? '' : '\ncolumn: ' + col;
    extra += !error ? '' : '\nerror: ' + error;

    // You can view the information in an alert to see things working like this:
    alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

    // TODO: Report this error via ajax so you can keep track
    //       of what pages have JS issues

    var suppressErrorAlert = true;
    // If you return true, then error alerts (like in older versions of 
    // Internet Explorer) will be suppressed.
    return suppressErrorAlert;
};
