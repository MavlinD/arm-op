<?php

namespace Controllers;


class PassportC extends Controller
{

  public function __construct($req)
  {
    if ($req !== null) {
      parent::__construct($req);
    }
  }

  function get_file()
  {
    $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
    $this->setParam('wagon_or_container', $this->request[(string)'data']);
    $this->setParam('consignment', $this->request[(string)'data']);

    $wagon_or_container = $this->request['data']['wagon_or_container'];
    $consignment = $this->request['data']['consignment'];

    $this->validateLen($wagon_or_container, 15);
    $this->validateLen($consignment, 15);

//    Паспорт-ФБ1234567-ПЯ123456
    $root_dir = dirname(dirname(dirname(__FILE__)));
    $passports_dir = 'static/passports/';
    $path_to_file = sprintf('%sПаспорт-%s-%s.pdf', $passports_dir, $wagon_or_container, $consignment);
    $is_file_exists = is_file(sprintf('%s/%s',$root_dir, $path_to_file));
    $response = [
      'path_to_file' => $path_to_file,
      'is_file_exists' => $is_file_exists,
//      'subfolders' => dirname(dirname(dirname(__FILE__))),
    ];
    $this->result = $response;
    $this->setResp();
  }

}
