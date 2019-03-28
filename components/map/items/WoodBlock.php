<?php

namespace app\components\map\items;

use app\components\map\MapItemInterface;
use yii\helpers\Html;

/**
 * Class WoodBlock
 * @package app\components\map\items
 */
class WoodBlock implements MapItemInterface
{
    /**
     * @return string
     */
    public function draw(): string
    {
        return Html::tag('div', '', ['class' => 'map-item map-block map-woodblock' ]);
    }
}