<?php

namespace Controllers;

use Models\Model;
use Sets\MyConst;

class Controller
{

    use respCode;
    public $response;
    public $config = [];
    public $request;
    public $login;
    public $admin;
    public $result;
    public $arg = []; // where cond in query

    public function __construct($request = null)
    {
        $this->setCfg();
        if (isset($_SESSION['login']) and $_SESSION['login']) {
            $this->login = $_SESSION['login'];
        }
        if (isset($_SESSION['admin']) and $_SESSION['admin']) {
            $this->admin = $_SESSION['admin'];
        }

        date_default_timezone_set('UTC');
        if ($request !== null) {
            $this->request = $request;
            foreach ($this->request as $key => $value) {
                if (method_exists(get_class($this), $key)) {
                    call_user_func_array(array($this, $key), array($value));
                }
            }
        }
    }

    protected function isSet($val)
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

    /**
     * данные настройки используются в каждом запросе
     * */
    protected function setCfg()
    {
        $this->config = MyConst::dbCONF();
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
     * @param $req
     * @throws \Exception
     */
    public function validateData($name, $req)
    {
        $lm = new Model($this->config);
        $limits = $lm->getLimits($name);
        foreach ($req as $key => $val) {
            foreach ($limits as $k => $v) {
                if (in_array($key, $limits[$k])) {
                    if ($limits[$k]['regex'] && !preg_match('/' . $limits[$k]['regex'] . '/ium', $val)) {
                        $rc = $this->dataNotValid($key);
                        throw new \Exception ($rc['message'], $rc['code']);
                    }
                    if (is_array($val) && count($val) > $limits[$k]['max']) {
                        throw new \Exception('размер массива не корректен :(', 1);
                    }
                }
            }
            if ($key === 'email' && !filter_var($req[$key], FILTER_VALIDATE_EMAIL)) {
                $rc = $this->dataNotValid($key);
                throw new \Exception ($rc['message'], $rc['code']);
            }
        }
    }

    /**
     * проверка наличия колонки в таблице
     * @param $tbl string
     * @param $fld string
     * @return bool
     */
    public function isExistTableColumn($tbl, $fld)
    {
        $lm = new Model($this->config);
        if ($lm->isColumnExist($this->config['db'], $tbl, $fld)) {
            return true;
        }
        return false;
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
//            $t = json_encode($this->result);
            $responseCode = $this->success;
            $this->setResponse('data', $this->result);
        } elseif ($code) {
            $responseCode = $this->$code;
        } else {
            $responseCode = $this->SomethingWrong;
        }
        $this->setResponse('message', $responseCode['message']);

        $this->setResponse('exeTime', microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]);
        $this->setResponse('status', 'ok');
        $this->setResponse('user', $_SESSION);
        $this->setResponse('code', $responseCode['code']);
    }

    protected function getArg()
    {
        $admin = $this->setParam('admin', $_SESSION);
        if (!empty($this->request['data'])) {
            foreach ($this->request['data'] as $key => $value) {
                if (array_key_exists($key, $this->request['data']) && isset($this->request['data'][$key]) && $this->request['data'][$key] !== "" && $this->request['data'][$key] !== "all") {
                    $this->arg[$key] = $this->setParam($key, $this->request['data']);
                }
            }
            if (!$admin) {
                $this->arg = [
                    'login' => $this->login,
                ];
            }
//        } else {
        }
    }

}
