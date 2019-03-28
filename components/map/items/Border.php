<?php

namespace app\components\map\items;

use app\components\map\MapItemInterface;
use yii\helpers\Html;

/**
 * Class Border
 * @package app\components\map\items
 */
class Border implements MapItemInterface
{
    /**
     * @return string
     */
    public function draw(): string
    {
        return Html::tag('div', '', ['class' => 'map-item map-block map-border' ]);
    }
}