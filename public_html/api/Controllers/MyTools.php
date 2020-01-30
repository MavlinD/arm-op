<?php

namespace Controllers;

trait MyTools
{
    // делает из плоского/одномерного массива трехмерный, с группировкой по указанным ключам
    // условие: исходный массив должен быть отсортирован по указанным ключам todo: make it
    public static function getOneToDuosDimArr($arr, $firstGroup, $secondGroup = null)
    {
        $mainKey = null;
        $totalArr = $subArr = $secondGroupArr = [];
        foreach ($arr as $key => $val) {
            if (($val[$firstGroup] == $mainKey) && isset($mainKey)) {
                $subArr[] = $val;
            } elseif (($val[$firstGroup] !== $mainKey) && isset($mainKey)) {
                $totalArr[$mainKey] = $subArr;
                $subArr = [];
                $subArr[] = $val;
            } else {
                $subArr[] = $val;
            }
            $mainKey = $val[$firstGroup];
        }
        $totalArr[$mainKey] = $subArr;
        if (isset($secondGroup)) {
            foreach ($totalArr as $key => $val) {
                $secondGroupArr = call_user_func(array(__TRAIT__, __FUNCTION__), $totalArr[$key], $secondGroup);
                $totalArr[$key] = $secondGroupArr;
            }
        }
        if (isset($mainKey)) {
            return $totalArr;
        } else {
            return null;
        }
    }

}
