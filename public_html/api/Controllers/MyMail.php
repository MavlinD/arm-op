<?php

namespace Controllers;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MyMail extends PHPMailer
{
    protected $data = [];
    protected $fio;
    protected $request;
    protected $messageFormat;

    public function __construct($username, $pass, $debug = 2, $host = 'mail.azot')
    {
        parent::__construct(true);

        $this->SMTPDebug = $debug;
        $this->isSMTP();
        $this->Host = $host;
        $this->SMTPAuth = true;
        $this->Username = $username;
        $this->Password = $pass;
        $this->SMTPSecure = 'none';
        $this->Port = 25;
        $this->CharSet = 'UTF-8';

        try {
            $this->setFrom('galagent@azot.kuzbass.net', 'SAP-Info');
        } catch (Exception $e) {
            $this->errHandler();
        }
    }

    function addRecepients($username)
    {
        $this->addAddress($username . "@azot.kuzbass.net");
    }

    function addData($arg)
    {
//        echo __FUNCTION__.PHP_EOL;
        $this->data[] = $arg;
    }

    protected function errHandler()
    {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $this->ErrorInfo;
    }

    function sendMess($fio, $request, $subject)
    {
        $this->isHTML(true);
        $this->Subject = $subject;

        $this->messageFormat = "<p>Здравствуйте, <strong>%s!</strong></p><p>Запрос: <b>%s.</b><p><a href='http:/app14.azot.kmr'>сервис САП-Инфо</a></p></p><div>Результаты на <strong>%s</strong>:</div><p>%s</p><h4 style='color: indianred;'>Вход необходимо выполнять через браузер Mozilla Firefox или Google Chrome</h4><p>Поиск в Яндекс отключен из-за невозможности его использования в автоматическом режиме (внутренняя политика ООО \"ЯНДЕКС\").</p>";
        $this->fio = $fio;
        $this->request = $request;
        $this->Body = sprintf($this->messageFormat, $this->fio, $this->request, date('Y-m-d h'). ' час (а/ов)', implode('<hr>', $this->data));
        try {
            $this->send();
//            echo 'Message has been sent';
            return true;
        } catch (Exception $e) {
            $this->errHandler();
            return false;
        }
    }

}
