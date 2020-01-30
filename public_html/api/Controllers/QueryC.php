<?php

namespace Controllers;

use Controllers\MyTools;

class QueryC extends Controller
{

    protected $WorkLog; // ссылка на модель
    const LIMIT_ACTIVE_QUERIES = 10;

    public function __construct($req)
    {
        parent::setCfg();
        $this->WorkLog = new \Models\StatsM($this->config);
        if ($req !== null) {
            parent::__construct($req);
        }
    }

    public function getActiveMorningQueries()
    {
        $this->result['queries'] = $this->WorkLog->getActiveMorningQueries($this->login);
        $this->result['isLimit'] = !$this->isLimitQueries();
        $this->setResp();
    }

    public function delQuery()
    {
        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $hreq = $this->getRequestParam($this->request['data'], 'hreq');
        $resp = $this->WorkLog->setStateQuery($this->login, $hreq, 0);
        if ($resp) {
            $this->getActiveMorningQueries();
//            $this->result = $this->WorkLog->getActiveMorningQueries($this->login);
//            $this->result['queries'] = $this->WorkLog->getActiveMorningQueries($this->login);
//            $this->result['isLimit'] = !$this->isLimitQueries();
        }
//        $this->setResp();
    }

    function isLimitQueries()
    {
        return ($this->getCntQueries() < self::LIMIT_ACTIVE_QUERIES);
    }

    function getCntQueries()
    {
        return $this->WorkLog->getCntQueries($this->login);
    }

    public function addQuery()
    {
        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $req = trim($this->getRequestParam($this->request['data'], 'req'));
//        $responseCode = null;
//        $t = iconv_strlen($req);
        if ($req && iconv_strlen($req)>2) {
            if ($this->isLimitQueries()) {
                $this->WorkLog->addQuery($req, $this->login);
                $this->getActiveMorningQueries();
                //            if ($this->WorkLog->addQuery($req, $this->login)) {
                //                $this->result['queries'] = $this->WorkLog->getActiveMorningQueries($this->login);
                //                $this->result['countQueries'] = $this->getCntQueries();
                //            }
            } else {
                $this->result = false;
            }
        }
//            $responseCode = $this->limitQueries;
//        $this->setResp();
//        $this->setResp($responseCode);
    }

    public function getSearchNight()
    { // main list of queries

        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
        $res = $this->WorkLog->getListQall($this->login, 0);
//        $this->result = $res;
        $this->result = MyTools::getOneToDuosDimArr($res, 'hreq');
//        $tresult = MyTools::getOneToDuosDimArr($res, 'hreq');
        $this->setResp();
    }

}
