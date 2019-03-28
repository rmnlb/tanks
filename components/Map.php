<?php

namespace app\components;
use app\components\map\MapItemInterface;
use yii\helpers\Html;

/**
 * Class Map
 * @package app\components
 */
class Map
{
    /**
     * @var array
     */
    private $config = [];

    /**
     * @param int $x
     * @param int $y
     * @param MapItemInterface $item
     * @return $this
     */
    public function setItem(int $x, int $y, MapItemInterface $item)
    {
        $this->config[$x][$y] = $item;
        return $this;
    }

    public function draw()
    {
        $mapHTML = Html::beginTag('div', ['class' => 'map-container']);
        foreach ($this->config as $row) {
            $mapHTML .= Html::beginTag('div', ['class' => 'map-row']);
            foreach ($row as $column) {
                /**
                 * @var MapItemInterface $column
                 */
                $mapHTML .= $column->draw();
            }

            $mapHTML .= Html::endTag('div');
        }

        $mapHTML .= Html::endTag('div');

        return $mapHTML;
    }
}