<?php

namespace Controllers;


class Controller
{

  use respCode;
  public $response;
  public $config = [];
  public $request;
  public $result;
  public $arg = []; // where cond in query

  public function __construct($request = null)
  {
    if ($request !== null) {
      $this->request = $request;
      foreach ($this->request as $key => $value) {
        if (method_exists(get_class($this), $key)) {
          call_user_func_array(array($this, $key), array($value));
        }
      }
    }
  }

  protected function isSetArg($val)
  {
    if (array_key_exists($val, $this->arg) && isset($this->arg[$val])) {
      return true;
    }
    return false;
  }

  protected function setParam($arg, $arr = null)
  {
    if ($arr) {
      if (array_key_exists($arg, $arr)) {
        return $this->getRequestParam($arr, $arg);
      }
    } else {
      if (array_key_exists($arg, $this->request['data'])) {
        return $this->getRequestParam($this->request['data'], $arg);
      }
    }
    return null;
  }

  public function encodeResponse()
  {
    $this->response = json_encode($this->response, ENT_NOQUOTES);
  }

  public function getRequest($req)
  {
    $this->request = $req;
  }

  /**
   * общий обработчик полей в запросе
   * @param $req
   * @param $name
   * @return array|string
   * @throws \Exception
   */
  public function getRequestParam($req, $name)
  {
    if (array_key_exists($name, $req)) {
      $rc = htmlspecialchars($req[$name]);
      if (gettype($rc) === 'string') {
        $rc = trim($rc);
      }
      return $rc;
    }
    $rc = $this->noField;
    throw new \Exception($rc['message'] . $name, $rc['code']);
  }

  public function decodeRequest($req)
  {
    $this->request = (array)json_decode($req, true);
  }

  /**
   * общий метод валидации данных в запросе
   * @param $name
   * @param $len
   * @throws \Exception
   */
  public function validateLen($name, $len)
  {
    if (iconv_strlen($name) > $len) {
      $rc = $this->dataNotValid;
      throw new \Exception (sprintf('%s field: %s',$rc['message'],$name), $rc['code']);
    }
  }


  /**
   * общий метод, наполняет массив ответов
   * @param $key
   * @param $value
   */
  public function setResponse($key, $value)
  {
    $this->response[$key] = $value;
  }

  /**
   * собственно ответ
   */
  public function showResponse()
  {
    header("Content-Type: application/json; charset=UTF-8");
    echo $this->response;
  }

  /**
   * собственно ответ
   */
  public function showResponseErr()
  {
    $errMsg = json_decode($this->response);
    throw new \AllException($errMsg->data, $errMsg->code, $errMsg->file, $errMsg->line);
  }

  function setResp($code = 0)
  {
    if ($this->result) {
      $responseCode = $this->success;
      $this->setResponse('data', $this->result);
    } elseif ($code) {
      $responseCode = $this->$code;
    } else {
      $responseCode = $this->SomethingWrong;
    }
    $this->setResponse('message', $responseCode['message']);

    $this->setResponse('exeTime', microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]);
//        $this->setResponse('status', 'ok');
    $this->setResponse('code', $responseCode['code']);
    $this->setResponse('query', $_POST);
  }

}
