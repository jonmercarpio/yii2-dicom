<div id="studyViewerTemplate" class="hidden" style="height:100%">
    <div class="studyContainer" style="height:100%;overflow:hidden;">
        <div class="studyRow row" style="height:100%">
            <!-- Thumbnails -->
            <div class="hellofromtheotherside col-lg-2">
                <div class="logo">    
                </div>
                <div class="thumbnailSelector rumble" id="thumbnailsContainerParent">
                    <div>
                        <select id="dv_study_select_list" class="" >

                        </select>
                        <div class="cor-reports">
                            <ul>
                                <li>
                                    <b>REPORTS</b>
                                </li>
                                <li>
                                    <?php
//                                    $pI = CHtml::image(Yii::app()->theme->baseUrl . '/images/icon_act_preliminary.png', 'diagnostic');
//                                    echo CHtml::link($pI . "Preliminary", array('getpreliminarytranscription', 'id' => null), array(
//                                        'id' => 'preliminary_link',
//                                        'class' => 'diagnostic_link',
//                                        'title' => 'Preliminary',
//                                        'style' => 'display: none'
//                                    ));
                                    ?>
                                </li>
                                <li>
                                    <?php
//                                    $pF = CHtml::image(Yii::app()->theme->baseUrl . '/images/icon_act_final.png', 'diagnostic');
//                                    echo CHtml::link($pF . "Final", array('getfinaltranscription', 'id' => null), array(
//                                        'id' => 'final_link',
//                                        'class' => 'diagnostic_link',
//                                        'title' => 'Final',
//                                        'style' => 'display: none'
//                                    ));
                                    ?>
                                </li>
                            </ul>
                        </div>
                        <hr>
                    </div>
                    <div class="thumbnails list-group" id="thumbnailsContainer">
                    </div>
                </div>
            </div>
            <!-- Viewer -->
            <div class="viewer col-lg-10">
                <!-- Toolbar -->
                <div class="text-center col-lg-12 pl0">
                    <!--<div class="btn-group col-lg-3" style="float: left;" id="left_info">                   
                        Left
                    </div>-->
                    <div class="btn-group col-lg-9 pl0">
                        <div class="lilmemu">
                            <!-- WW/WL -->
                            <button type="button" class="btn btn-sm btn-default bo-left" data-container="body" data-toggle="tooltip" data-placement="bottom" title="WW/WC"><span class="fa fa-sun-o"></span></button>
                            <!-- Invert -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Invert"><span class="fa fa-adjust"></span></button>
                            <!-- Zoom -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Zoom"><span class="fa fa-search"></span></button>
                            <!-- Pan -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Pan"><span class="fa fa-arrows"></span></button>
                            <!-- Stack scroll -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Stack Scroll"><span class="fa fa-bars"></span></button>
                            <!-- Length measurement -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Length Measurement"><span class="fa fa-arrows-v"></span></button>
                            <!-- Angle measurement -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Angle Measurement"><span class="fa fa-angle-left"></span></button>
                            <!-- Pixel probe -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Pixel Probe"><span class="fa fa-dot-circle-o"></span></button>
                            <!-- Elliptical ROI -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Elliptical ROI"><span class="fa fa-circle-o"></span></button>
                            <!-- Rectangle ROI -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Rectangle ROI"><span class="fa fa-square-o"></span></button>
                            <!-- Play clip -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Play Clip"><span class="fa fa-play"></span></button>
                            <!-- Stop clip -->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Stop Clip"><span class="fa fa-stop"></span></button>
                            <!--Reset-->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Reset" data-original-title="Reset"><span class="fa fa-refresh"></span></button>
                            <!--Rotate Left-->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Rotate Left" data-original-title="Rotate Left"><span class="fa fa-undo"></span></button>
                            <!--Rotate Right-->
                            <button type="button" class="btn btn-sm btn-default" data-container="body" data-toggle="tooltip" data-placement="bottom" title="Rotate Right" data-original-title="Rotate Right"><span class="fa fa-repeat"></span></button>
                            <!--Layout-->
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-container="body" data-toggle="dropdown" data-placement="bottom" title="Series tiling"><span class="fa fa-th-large"></span></button>
                                <ul class="pull-right dropdown-menu choose-layout" role="menu">
                                    <li><a href="#">1x1</a></li>
                                    <li><a href="#">1x2</a></li>
                                    <li><a href="#">1x3</a></li>
                                    <li><a href="#">1x4</a></li>
                                    <li><a href="#">2x1</a></li>
                                    <li><a href="#">2x2</a></li>
                                    <li><a href="#">2x3</a></li>
                                    <li><a href="#">2x4</a></li>
                                    <li><a href="#">3x1</a></li>
                                    <li><a href="#">3x2</a></li>
                                    <li><a href="#">3x3</a></li>
                                    <li><a href="#">3x4</a></li>
                                    <li><a href="#">4x1</a></li>
                                    <li><a href="#">4x2</a></li>
                                    <li><a href="#">4x3</a></li>
                                    <li><a href="#">4x4</a></li>
                                </ul>
                            </div>
                            <div class="btn-group">
                                <!--WW/WL-->
                                <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-container="body" data-toggle="dropdown" data-placement="bottom" title="WW/WL" data-original-title="WW/WL"><span class="fa fa-spinner"></span></button>
                                <ul class="pull-right dropdown-menu choose-wwwl" role="menu">
                                    <li><a href="#" data-windowwidth="350" data-windowcenter="40" >Abdomen WL: 40 WW: 350</a></li>
                                    <li><a href="#" data-windowwidth="1500" data-windowcenter="300">Bone WL: 300  WW: 1500</a></li>
                                    <li><a href="#" data-windowwidth="100" data-windowcenter="50">Brain WL: 50  WW: 100</a></li>
                                    <li><a href="#" data-windowwidth="1400" data-windowcenter="-500">Pulmonary WL: -500 WW: 1400</a></li>
                                    <li><a href="#" data-windowwidth="700" data-windowcenter="-300">Endoscopy: WL: -300 WW: 700</a></li>
                                </ul>
                            </div>
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-default dropdown-toggle bo-rigth" data-container="body" data-toggle="dropdown" data-placement="bottom" title="Image tiling" data-original-title="Image tiling"><span class="fa fa-th-large"></span></button>
                                <ul class="pull-right dropdown-menu choose-tiling" role="menu">
                                    <li><a href="#">1x1</a></li>
                                    <li><a href="#">1x2</a></li>
                                    <li><a href="#">1x3</a></li>
                                    <li><a href="#">1x4</a></li>
                                    <li><a href="#">2x1</a></li>
                                    <li><a href="#">2x2</a></li>
                                    <li><a href="#">2x3</a></li>
                                    <li><a href="#">2x4</a></li>
                                    <li><a href="#">3x1</a></li>
                                    <li><a href="#">3x2</a></li>
                                    <li><a href="#">3x3</a></li>
                                    <li><a href="#">3x4</a></li>
                                    <li><a href="#">4x1</a></li>
                                    <li><a href="#">4x2</a></li>
                                    <li><a href="#">4x3</a></li>
                                    <li><a href="#">4x4</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group col-lg-3" style="float: right;" id="right_info">
                        Right
                    </div>
                </div>
                <div class="cont-canvas">
                    <div class="text-center col-lg-12">
                        <input class="btn-default" type="range" min="0" max="300" step="1" id="imageViewerRange" value="0"/>
                    </div>
                    <!-- Viewer -->
                    <div class="imageViewer">
                        
                        <div class="viewportWrapper" style="width:100%;height:100%;position:relative;color: white;float:left;background-color:black;" oncontextmenu="return false" unselectable="on" onselectstart="return false;" onmousedown="return false;">
                            <!-- Viewport -->
                            <div class="viewport"></div>

                            <!-- Overlays -->
                            <div class="overlay" style="top:0px; left:0px">
                                <!--<div>Patient Name</div>-->
                                <!--<div>Patient Id</div>-->
                            </div>

                            <div class="overlay ta-r" style="top:0px; right:0px">
                                <div></div>
                                <div></div>
                            </div>

                            <div class="overlay ta-l" style="bottom:0px; left:0px">
                                <div class="fps"></div>
                                <div class="renderTime"></div>
                                <div class="currentImageAndTotalImages"></div>
                            </div>
                            <div class="overlay ta-r" style="bottom:0px; right:0px">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            <!-- div here -->
        </div>
        <div style="clear:both;"></div>
    </div>
</div>