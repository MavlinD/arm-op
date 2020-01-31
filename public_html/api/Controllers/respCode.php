<?php

namespace Controllers;
/* содержит коды ответов
 * */

trait respCode
{
    public $dataNotFound = [
        'code' => 3,
        'message' => 'Данных нет'
    ];
    public $limitQueries = [
        'code' => 42,
        'message' => 'you has a limit queries'
    ];
    public $success = [
        'code' => 0,
        'message' => 'Все идет по плану :-))'
    ];
    public $dataNotValid = [
        'code' => 2,
        'message' => 'данные некорректны(('
    ];

    public $noField = [
        'code' => 24,
        'message' => "Требуемое поле не заполнено: "
    ];
    public $SomethingWrong = [
        'code' => 41,
        'message' => 'Something went wrong or empty response'
    ];
}
