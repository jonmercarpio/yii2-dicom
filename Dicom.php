<?php

namespace jonmer09\dicom;

/**
 * Description of Dicom
 * Jun 29, 2016 6:24:57 PM
 * @author Jonmer Carpio <jonmer09@gmail.com>
 * 
 */
class Dicom extends \yii\base\Widget {

    public $clientOptions;
    public $options;
    public $data;
    private $_stacks;
    public $stackData;
    public $thumbnail = false;
    public $multiple = false;
    public $currentIdx = 0;
    private $_hashVar;

    public function registerPlugin() {

        $id = $this->getId();

        $js = <<<EOF
            $(document).ready(function() {
                var stacks = eval($this->_stacks);           
                var currentIdx = eval($this->currentIdx);
                var stack = stacks[currentIdx];
                var studyViewer = $('#study_viewer_$id');
                var seriesElement = $('#study_viewer_$id #thumbnailsContainer a');
                var scrollBar = $('#study_viewer_scroll_$id');
                var current_image_stack_loaded = [];
                
                var viewportModel = studyViewer.find('.viewportWrapper');
                var viewportModelCopy = viewportModel.clone();
                var imageViewer = new ImageViewer(studyViewer, viewportModelCopy, stacks);
                imageViewer.seriesElement = seriesElement;
                imageViewer.scrollBar = scrollBar;
                imageViewer.selector = '#study_viewer_$id';
                
                imageViewer.setLayout('1x1');
                initViewports(imageViewer);
                
                loadStudy(imageViewer,0,0);
                setupButtons(imageViewer);
                setupThumbnails(imageViewer);
                loadListener(imageViewer, current_image_stack_loaded);
                resizeStudyViewer(imageViewer);
            });                
EOF;
        $this->view->registerJs($js);
    }

    public function registerAssets() {
        DicomAsset::register($this->view);
    }

    public function run() {
        return $this->view->render('@jonmer09/dicom/views/main', ['id' => $this->getId(), 'data' => $this->stackData]);
    }

    public function init() {
        $this->_stacks = json_encode($this->stackData);
        $this->setId('dicom_' . time() . $this->id);
        $this->registerAssets();
        $this->registerPlugin();
        parent::init();
    }

}
