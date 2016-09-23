<?php

namespace jonmer09\dicom;

use kartik\helpers\Html;
use yii\helpers\ArrayHelper;

/**
 * Description of DicomThumbnail
 * Jun 30, 2016 2:43:32 PM
 * @author Jonmer Carpio <jonmer09@gmail.com>
 * 
 */
class DicomThumbnail extends \yii\base\Widget {

    public $imageId;
    public $_stack;
    public $options;
    public $description;
    public $single;

    public function registerPlugin() {
        $id = $this->getId();
        $this->imageId = ["currentImageIdIndex" => 0, 'imageIds' => !is_array($this->imageId) ? [$this->imageId] : $this->imageId];
        $this->_stack = json_encode($this->imageId);
        $js = <<<EOF
            $(document).ready(function() {         
                var element = document.getElementById('$id');
                var stack = eval($this->_stack);
                cornerstone.enable(element);
                cornerstone.loadImage(stack.imageIds[0]).then(function(image) {        
                    cornerstone.displayImage(element, image);
                    cornerstone.fitToWindow(element);
                });
            });                
EOF;
        $this->view->registerJs($js);
    }

    public function init() {
        $this->setId('dicom_th_' . time() . $this->id);
        DicomAsset::register($this->view);
        $this->registerPlugin();
        parent::init();
    }

    public function run() {

        $linkOpts = ArrayHelper::getValue($this->options, 'link', []);
        $divOpts = ArrayHelper::getValue($this->options, 'div', []);

        $dOpts = ArrayHelper::merge([
                    'id' => $this->getId(),
                    "class" => "dicom_thumbnail",
                    "oncontextmenu" => "return false;",
                    "unselectable" => "on",
                    "onselectstart" => "return false;",
                    "onmousedown" => "return false;"
                        ], $divOpts);

        $div = Html::tag('div', "", $dOpts);
        $div2 = Html::tag('div', "{$this->description}", ['class' => 'text-center small']);
        $aOpts = ArrayHelper::merge([
                    'class' => '',
                    "oncontextmenu" => "return false",
                    "unselectable" => "on",
                    "onselectstart" => "return false;",
                    "onmousedown" => "return false;",
                    "role" => "button",
                        ], $linkOpts);

        return Html::a("{$div}{$div2}", null, $aOpts);
    }

}
