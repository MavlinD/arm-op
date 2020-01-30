<?php

namespace Controllers;

use Models\QueryM;

class StatsC extends Controller
{
    protected $WorkLog; // ссылка на модель

    public function __construct($req)
    {
        parent::setCfg();
        $this->WorkLog = new QueryM($this->config);
        if ($req !== null) {
            parent::__construct($req);
        }
    }

    public function getStatConn()
    {
        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $this->getArg();

        if ($this->isSet('spp')) {
            $this->result['data'] = $this->WorkLog->getStatConnSpp($this->arg);
        } else {
            $this->result['data'] = $this->WorkLog->getStatisticsConnect($this->arg);
        }
        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;
        $this->setResp();
    }

    public function getStatQuery()
    {

        'SELECT query_text AS y, query_text AS name, DATE_FORMAT( date_time, "%Y-%m-%d") AS date FROM query WHERE login="vda" ORDER BY y DESC LIMIT 7';

        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $this->getArg();

        if ($this->isSet('spp')) {
            $this->result['data'] = $this->WorkLog->getStatQSpp($this->arg);
        } else {
            $this->result['data'] = $this->WorkLog->getStatisticsQuery($this->arg);
        }
        if (!$this->result['data']) { // чтобы диаграмма запросов обнулилась
            $this->result['data'] = [0];
        }
        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;
        $this->setResp();
    }

    public function getQrContent()
    {
        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $this->getArg();

        if ($this->isSet('login')) {
            $this->result['data'] = $this->WorkLog->getQrContUser($this->arg);
        }
        else if ($this->isSet('spp')) { //
//            $this->result['data'] = $this->WorkLog->getQrContUser($this->arg);
            $this->result['data'] = $this->WorkLog->getQrContSpp($this->arg);
        } else {
            $this->result['data'] = $this->WorkLog->getQrContUser($this->arg);

        }
        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;
        $this->setResp();
    }

}
