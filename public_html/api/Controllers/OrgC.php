<?php

namespace Controllers;

use Models\OrgM;

class OrgC extends Controller // для работы с организационной структурой предприятия
{

    protected $WorkLog; // ссылка на модель

    public function __construct($req)
    {
        parent::setCfg();
        $this->WorkLog = new OrgM($this->config);
        if ($req !== null) {
            parent::__construct($req);
        }
    }

    function getSpp()
    {
        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $this->getArg();

        if ($this->admin) {
            $this->result['data'] = $this->WorkLog->getSpp();
        }

        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;

        $this->setResp();
    }

    function getUsers()
    {
        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $this->getArg();

        if ($this->admin) {
            $this->result['data'] = $this->WorkLog->getUsers($this->arg);
        }

        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;

        $this->setResp();
    }

}
