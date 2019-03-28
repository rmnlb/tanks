<?php


namespace app\controllers;

use app\assets\TanksAsset;
use app\components\Map;
use app\components\map\items\Border;
use app\components\map\items\Road;
use app\components\map\items\WoodBlock;
use app\components\Tank;
use yii\web\Controller;

/**
 * Class SiteController
 * @package app\controllers
 */
class SiteController extends Controller
{
    public function actionIndex()
    {
        $map = new Map();

        $map
            ->setItem(0, 0, (new Border()))
            ->setItem(0, 1, (new Border()))
            ->setItem(0, 2, (new Border()))
            ->setItem(0, 3, (new Border()))
            ->setItem(0, 4, (new Border()))
            ->setItem(0, 5, (new Border()))
            ->setItem(0, 6, (new Border()))

            ->setItem(1, 0, (new Border()))
            ->setItem(1, 1, (new Road()))
            ->setItem(1, 2, (new Road()))
            ->setItem(1, 3, (new Road()))
            ->setItem(1, 4, (new WoodBlock()))
            ->setItem(1, 5, (new Road()))
            ->setItem(1, 6, (new Border()))

            ->setItem(2, 0, (new Border()))
            ->setItem(2, 1, (new Road()))
            ->setItem(2, 2, (new WoodBlock()))
            ->setItem(2, 3, (new Road()))
            ->setItem(2, 4, (new Road()))
            ->setItem(2, 5, (new Road()))
            ->setItem(2, 6, (new Border()))

            ->setItem(3, 0, (new Border()))
            ->setItem(3, 1, (new Road()))
            ->setItem(3, 2, (new Road()))
            ->setItem(3, 3, (new WoodBlock()))
            ->setItem(3, 4, (new Road()))
            ->setItem(3, 5, (new Road()))
            ->setItem(3, 6, (new Border()))

            ->setItem(4, 0, (new Border()))
            ->setItem(4, 1, (new Road()))
            ->setItem(4, 2, (new Road()))
            ->setItem(4, 3, (new WoodBlock()))
            ->setItem(4, 4, (new WoodBlock()))
            ->setItem(4, 5, (new Road()))
            ->setItem(4, 6, (new Border()))

            ->setItem(5, 0, (new Border()))
            ->setItem(5, 1, (new Road()))
            ->setItem(5, 2, (new Road()))
            ->setItem(5, 3, (new Road()))
            ->setItem(5, 4, (new Road()))
            ->setItem(5, 5, (new Road()))
            ->setItem(5, 6, (new Border()))

            ->setItem(6, 0, (new Border()))
            ->setItem(6, 1, (new Border()))
            ->setItem(6, 2, (new Border()))
            ->setItem(6, 3, (new Border()))
            ->setItem(6, 4, (new Border()))
            ->setItem(6, 5, (new Border()))
            ->setItem(6, 6, (new Border()));

        $tank = new Tank();

        $this->getView()->registerAssetBundle(TanksAsset::class);
        return $this->render('game', ['map' => $map, 'tank' => $tank]);
    }
}