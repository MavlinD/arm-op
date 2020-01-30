<?php
//$r=$_SERVER['DOCUMENT_ROOT'] . '/handler.php';
//require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/handler.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/SplClassLoader.php';
//if ($_SERVER['REMOTE_ADDR'] !== '127.0.0.1') {
//    ini_set('display_errors', 'off');
//}

$select = $mode = '';
$arg = [];

if (isset($_POST) && !empty($_POST)) {
    if (isset($_POST['select'])) {
        $select = $_POST['select'];
    }
    if (isset($_POST['mode'])) {
        $mode = $_POST['mode'];
    }
    $arg[$mode] = [];
//    $arg[$mode]['data'] = $_POST;
        $arg[$mode]['data'] = json_encode($_POST);
}

if (isset($_GET) && !empty($_GET)) {
    if (isset($_GET['select'])) {
        $select = $_GET['select'];
    }
    if (isset($_GET['mode'])) {
        $mode = $_GET['mode'];
    }
    $arg[$mode] = [];
    $arg[$mode]['data'] = $_GET['data'];
}

$ns = 'Controllers';

$full_path = $ns . '\\' . $select . 'C'; // для наглядности в IDE, да и секьюрнее так), models mark as 'M'

$Request = new $full_path($arg);
$Request->encodeResponse();
$Request->showResponse();
