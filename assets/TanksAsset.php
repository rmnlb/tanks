<?php
/**
 * Created by PhpStorm.
 * User: ROMAN
 * Date: 26.03.2019
 * Time: 21:30
 */

namespace app\assets;


use yii\web\AssetBundle;
use yii\web\JqueryAsset;

class TanksAsset extends AssetBundle
{
    public $css = [
        'css/tanks.css'
    ];

    public $js = [
        'js/tanks.js'
    ];

    public $depends = [
        JqueryAsset::class
    ];
}