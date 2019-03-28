<?php
/**
 * Created by PhpStorm.
 * User: ROMAN
 * Date: 27.03.2019
 * Time: 12:40
 */

namespace app\components;


use yii\helpers\Html;

class Tank
{
    public function draw()
    {
        $tankHTML = Html::tag('div', '', ['class' => 'map-item tank up']);

        return $tankHTML;
    }
}