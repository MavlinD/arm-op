<?php

namespace Models;

use Sets\MyConst;

class StatsM extends Model
{
    protected $allQ = "SELECT * FROM active_queries WHERE login=?s ORDER BY created DESC";
    protected $allQ2 = "SELECT *, DATE_FORMAT(date_time, \"%d.%m.%Y %H:%i\") AS date_time FROM query WHERE login=?s ORDER BY id DESC";
    protected $perPage = " LIMIT ?i, 25";
    protected $allQ3 = "SELECT * FROM query WHERE login=?s AND query_type_id = 1";

    public function __construct($request = null)
    {
        parent::__construct($request);
    }

    // return
    function getActQ($query_id)
    {
        return $this->connect->getRow("SELECT created FROM active_queries WHERE id = ?i", $query_id);
    }

    // return
    function getActiveMorningQueries($login)
    {
        "SELECT *, DATE_FORMAT(date_end, \"%d.%m.%Y\") AS date_end FROM active_queries aq WHERE login='mdv' and aq.aq_state=1";
        return $this->connect->getAll("SELECT *, DATE_FORMAT(date_end, \"%d.%m.%Y\") AS date_end FROM active_queries aq WHERE login=?s and aq.aq_state=1 order by aq.created desc", $login);
    }

    function addQuery($req, $login){
//        "";
        $arr=[
            'title'=>$req,
            'hash_request'=>hash(MyConst::HASH_ALGO_REQ(), $req),
            'login'=>$login
        ];
        $sql = "insert into active_queries set ?u ON DUPLICATE KEY UPDATE ?u";
        return $this->connect->query($sql, $arr, $arr);
    }

    function getCntQueries($login){
        $sql="select count(*) from active_queries where login=?s and aq_state=1";
        return $this->connect->getOne($sql, $login);
    }

    // return list of all query
    function getListQall3($login)
    {
        return $this->connect->getAll($this->allQ3, $login);
    }

    // return list of all query
    function getListQall2($login)
    {
        return $this->connect->getAll($this->allQ2, $login);
    }

    // return list of query per page
    function getListQ2($login, $page)
    {
        $sql = $this->allQ2 . $this->perPage;
        return $this->connect->getAll($sql, $login, $page);
    }

    function setStateQuery($login, $hreq, $state)
    {
        "update active_queries set aq_state=0 
where login='mdv' and hash_request='30c524d2fd2d953e4102f580742edc8b297c03c2'";

        $sql = "update active_queries set aq_state=?i 
where login=?s and hash_request=?s";
        return $this->connect->query($sql, $state, $login, $hreq);
    }


    // return list of all query
    function getListQall($login, $state)
    {
        "
        SELECT hash_request hreq, title req, login, created, req_date_time,
        rlog.req_date_time loaded, rlog.req_state state, req_hash_response hres,
        req_response response  
        FROM `active_queries` aqs
        inner join tbl_reqlog rlog on aqs.hash_request=rlog.req_hash_request
        where aqs.login=rlog.req_login and rlog.req_state=0 and rlog.req_login='mdv' 
        order by req, loaded desc, rlog.req_date_time
        ";

        $sql = "
        SELECT hash_request hreq, title req, login, created, 
        rlog.req_date_time loaded, rlog.req_state state, req_hash_response hres,
        req_response response  
        FROM `active_queries` aqs
        inner join tbl_reqlog rlog on aqs.hash_request=rlog.req_hash_request
        where aqs.login=rlog.req_login and rlog.req_state=?i and rlog.req_login=?s 
        order by req, loaded desc, rlog.req_date_time 
        ";

        return $this->connect->getAll($sql, $state, $login);

    }

    // return list of query per page
    function getListQ($login, $page)
    {
        $sql = $this->allQ . $this->perPage;
        return $this->connect->getAll($sql, $login, $page);
    }


}

