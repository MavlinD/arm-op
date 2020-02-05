<?php


class Init
{
  public $payload;
  private $get = false;
  private $post = false;

  public function __construct()
  {
    if (isset($_POST) && !empty($_POST)) {
      $this->post = true;
      $this->getPayload($_POST);
      return;
    }

    if (isset($_GET) && !empty($_GET)) {
      $this->get = true;
      $this->getPayload($_GET);
    }
  }

  private function getPayload($arr)
  {
    if (array_key_exists('payload', $arr)) {
      $this->payload = json_decode($arr['payload'], true);
    }
  }
}
