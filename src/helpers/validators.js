/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
    __,
    allPass,
    anyPass,
    complement,
    compose,
    converge,
    count,
    equals,
    gte,
    prop,
    values,
} from "ramda";

const isWhite = equals("white");
const isRed = equals("red");
const isGreen = equals("green");
const isBlue = equals("blue");
const isOrange = equals("orange");
const isNotWhite = complement(isWhite);

const getCircle = prop("circle");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getStar = prop("star");

const isCircleWhite = compose(isWhite, getCircle);
const isCircleBlue = compose(isBlue, getCircle);
const isSquareWhite = compose(isWhite, getSquare);
const isTriangleWhite = compose(isWhite, getTriangle);
const isTriangleGreen = compose(isGreen, getTriangle);
const isStarWhite = compose(isWhite, getStar);
const isStarRed = compose(isRed, getStar);
const isSquareGreen = compose(isGreen, getSquare);
const isSquareOrange = compose(isOrange, getSquare);

const isAnyFigureWhite = anyPass([
    isCircleWhite,
    isSquareWhite,
    isTriangleWhite,
    isStarWhite,
]);

const getAllFigureColors = values();

const getGreenFiguresCount = compose(count(isGreen), getAllFigureColors);
const getRedFiguresCount = compose(count(isRed), getAllFigureColors);
const getBlueFiguresCount = compose(count(isBlue), getAllFigureColors);
const getOrangeFiguresCount = compose(count(isOrange), getAllFigureColors);

const isAtLeastThreeFiguresRed = compose(gte(__, 3), getRedFiguresCount);
const isAtLeastThreeFiguresGreen = compose(gte(__, 3), getGreenFiguresCount);
const isAtLeastThreeFiguresBlue = compose(gte(__, 3), getBlueFiguresCount);
const isAtLeastThreeFiguresOrange = compose(gte(__, 3), getOrangeFiguresCount);

const isOnlyOneRed = compose(equals(1), getRedFiguresCount);
const isOnlyTwoGreen = compose(equals(2), getGreenFiguresCount);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isStarRed,
    isSquareGreen,
    isAnyFigureWhite,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(gte(__, 2), getGreenFiguresCount);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [
    getRedFiguresCount,
    getBlueFiguresCount,
]);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    isCircleBlue,
    isStarRed,
    isSquareOrange,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
    isAtLeastThreeFiguresRed,
    isAtLeastThreeFiguresGreen,
    isAtLeastThreeFiguresOrange,
    isAtLeastThreeFiguresBlue,
]);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    isOnlyOneRed,
    isOnlyTwoGreen,
    isTriangleGreen,
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(gte(__, 4), getOrangeFiguresCount);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
    complement(isStarRed),
    complement(isStarWhite),
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(gte(__, 4), getGreenFiguresCount);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    compose(isNotWhite, getTriangle),
    compose(isNotWhite, getSquare),
    converge(equals, [getTriangle, getSquare]),
]);
