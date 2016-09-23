<?php

namespace jonmer09\dicom;

use yii\web\AssetBundle;

/**
 * Description of AdvertsAssets
 *
 * @author Jonmer Carpio <jonmer09@gmail.com>
 */
class DicomAsset extends AssetBundle {

    public $js = [
        'js/cornerstone/cornerstone.js',
        'js/cornerstone/cornerstoneMath.js',
        'js/cornerstone/cornerstoneTools.js',
        'js/cornerstone/cornerstoneWADOImageLoader.js',
        'js/cornerstone/cornerstoneWebImageLoader.js',
        'js/cornerstone/dicomParser.js',
        'js/cornerstone/hammer.min.js',
        'js/cornerstone/util.js',
        'js/cornerstone/setupViewportOverlays.js',
        'js/cornerstone/setupButtons.js',
        'js/cornerstone/imageViewer.js',
    ];
    public $css = [
        'css/cornerstone/cornerstone.min.css',
        'css/dicom.css'
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\web\JqueryAsset',
        'yii\jui\DroppableAsset',
        'yii\jui\DraggableAsset',
    ];

    public function init() {
        $this->sourcePath = __DIR__ . '/assets/';
        parent::init();
    }

}
