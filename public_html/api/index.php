<?php
require_once './handler.php';
require_once './SplClassLoader.php';

$ns = 'Controllers';
$query = new Init();

$full_path = $ns . '\\' . $query->payload['select'] . 'C'; // для наглядности в IDE, да и секьюрнее так), models mark as 'M'

$Request = new $full_path($query->payload['mode']);
$Request->encodeResponse();
$Request->showResponse();
