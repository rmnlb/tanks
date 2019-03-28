const body = document.querySelector('body');
const tank = document.querySelector('.tank');
const map = document.querySelector('.map-container');
const blockSize = document.querySelector('.map-item').offsetWidth;
const step = blockSize / 5;


const directionConfig = {
    up: {
        prop: 'top',
        coefficient: -1
    },
    down: {
        prop: 'top',
        coefficient: 1
    },
    left: {
        prop: 'left',
        coefficient: -1
    },
    right: {
        prop: 'left',
        coefficient: 1
    }
};

const bulletConfig = {
    speed: 25, //ms
    step: 5, //px
    shootTimeout: 500 //ms
};



$(document).ready(tank.addEventListener('click', moveTankIntoTheMap));


/**
 *
 */
function moveTankIntoTheMap() {

    body.removeChild(tank);
    map.appendChild(tank);
    tank.removeEventListener('click', moveTankIntoTheMap);

    const tankStartPosition = setTankStartPosition();
    tank.style.top = tankStartPosition.y + 'px';
    tank.style.left = tankStartPosition.x + 'px';

    body.addEventListener('keydown', (e) => {
        if (!e.key.indexOf('Arrow')) {
            tankMove(e.key.replace("Arrow", '').toLowerCase())
        }
    });
    body.addEventListener('keyup', shootTimeoutSetter)
}

/**
 *
 * @param event
 */
function shootTimeoutSetter(event) {
    if (event.key === ' ') {
        tankShoot();
        body.removeEventListener('keyup', shootTimeoutSetter);
        setTimeout(function () {
            body.addEventListener('keyup', shootTimeoutSetter)
        }, bulletConfig.shootTimeout);
    }
}

/**
 *
 * @param direction
 */
function tankMove(direction) {

    if (!tank.classList.contains(direction)) {
        tank.className = 'map-item tank ' + direction;
    }

    const {prop, coefficient} = directionConfig[direction];
    const preparedProp = prop.replace(prop[0], prop[0].toUpperCase());

    tank.style[prop] = isUnitMoving(tank, direction)
        && tank['offset' + preparedProp] + step*coefficient + 'px';
}

/**
 *
 */
function tankShoot() {
    const bullet = document.createElement('div');
    const bulletDirection = tank.className.replace('map-item tank ', '');

    bullet.className = `bullet ${bulletDirection}`;
    map.appendChild(bullet);
    setBulletPositionAndMovement(bullet, bulletDirection);
}

/**
 *
 * @param unit
 * @param direction
 * @returns {boolean}
 */
function isUnitMoving(unit, direction) {
    const {top, bottom, left, right} = unit.getBoundingClientRect();

    const nextBlocksConf = {
        up: {
            xStart: left,
            yStart: top - 1,
            xEnd: right - 1,
            yEnd: top - 1
        },
        down: {
            xStart: left,
            yStart: bottom + 1,
            xEnd: right - 1,
            yEnd: bottom + 1
        },
        left: {
            xStart: left - 1,
            yStart: top,
            xEnd: left - 1,
            yEnd: bottom - 1
        },
        right: {
            xStart: right + 1,
            yStart: top,
            xEnd: right + 1,
            yEnd: bottom - 1
        }
    };

    const {xStart, yStart, xEnd, yEnd} = nextBlocksConf[direction];

    const frontBlocks = [...new Set([
        document.elementFromPoint(xStart, yStart),
        document.elementFromPoint(xEnd, yEnd)
    ])];


    if (!frontBlocks.length) {
        return false
    }

    return frontBlocks.every(block => block.classList.contains('map-road'));
}

/**
 *
 * @param bullet
 * @param direction
 */
function setBulletPositionAndMovement(bullet, direction) {

    switch (direction) {
        case 'up': {
            bullet.style.top = tank.offsetTop + 'px';
            bullet.style.left = tank.offsetLeft + blockSize / 2 - bullet.offsetWidth / 2 + 'px';

            setBulletMovementRule(bullet, direction);
            break;

        }
        case 'down': {
            bullet.style.top = tank.offsetTop + blockSize - bullet.offsetHeight + 'px';
            bullet.style.left = tank.offsetLeft + blockSize / 2 - bullet.offsetWidth / 2 + 'px';

            setBulletMovementRule(bullet, direction);
            break;
        }
        case 'left': {
            bullet.style.top = tank.offsetTop + blockSize / 2 - bullet.offsetHeight / 2 + 'px';
            bullet.style.left = tank.offsetLeft + bullet.offsetWidth / 2 + 'px';

            setBulletMovementRule(bullet, direction);
            break;
        }
        case 'right': {
            bullet.style.top = tank.offsetTop + blockSize / 2 - bullet.offsetHeight / 2 + 'px';
            bullet.style.left = tank.offsetLeft + blockSize - bullet.offsetWidth * 1.5 + 'px';

            setBulletMovementRule(bullet, direction);
            break;
        }
        default : {
            return;
        }
    }
}

function setBulletMovementRule(bullet, direction) {

    const {step, speed} = bulletConfig;
    const {prop, coefficient} = directionConfig[direction];
    const preparedProp = prop.replace(prop[0], prop[0].toUpperCase());

    const bulletMovement = setInterval(() => {
        if (isUnitMoving(bullet, direction)) {
            bullet.style[prop] = bullet['offset' + preparedProp] + step * coefficient + 'px';
        } else {
            clearInterval(bulletMovement);
            map.removeChild(bullet);
        }
    }, speed);
}

/**
 *
 * @returns {{x: number, y: number}}
 */
function setTankStartPosition() {
    const widthBlocksLength = map.offsetWidth / blockSize;
    const heightBlockLength = map.offsetHeight / blockSize;

    const startPosition = {
        x: Math.floor(Math.random() * widthBlocksLength) * blockSize,
        y: Math.floor(Math.random() * heightBlockLength) * blockSize
    };

    const currentBlock = document.elementFromPoint(
        map.offsetLeft + startPosition.x + step,
        map.offsetTop + startPosition.y + blockSize
    );

    return currentBlock.classList.contains('map-road') ? startPosition : setTankStartPosition()
}
