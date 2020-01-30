<?php

namespace Models;

class Model
{
    public $config;
    public $connect;
    protected $where = []; // condition for query
    protected $limit = []; // limit for query

    public function __construct($db_cnf, $request = null)
    {
        $this->config = $db_cnf;
        $this->connect = $this->connect();
    }

    private function connect()
    {
        return new SafeMySQL($this->config);
    }

    /**
     * проверка наличия колонки в таблице
     *
     * @param $db string
     * @param $tbl string
     * @param $fld string
     * @return bool
     *
     * */
    public function isColumnExist($db, $tbl, $fld)
    {
        $sql = "SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema=?s and 
TABLE_NAME=?s and Column_Name=?s";
        return $this->connect->getOne($sql, $db, $tbl, $fld);
    }

    public function isTblExist($db, $tbl)
    {
        $sql = "SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema=?s and 
TABLE_NAME=?s";
        return $this->connect->getOne($sql, $db, $tbl);
    }

    function runQuery($sql, ...$a)
    {
        return $this->connect->query($sql, ...$a);
    }

    // query
    function getRow($sql, ...$a)
    {
        return $this->connect->getRow($sql, ...$a);
    }

    protected function isSet($val, $arr)
    {
        if (array_key_exists($val, $arr) && isset($arr[$val]) && $arr[$val] !== 'all') {
            return true;
        }
        return false;
    }

    private function setDate($date) // format date to Mysql format
    {
        return (new \DateTime($date))->format('Y-m-d');
    }


    protected function setWhere($arg)
    {
        $w = array();
        if ($this->isSet('login', $arg)) {
            $w[] = $this->connect->parse("u.login = ?s", $arg['login']);
        }
        if ($this->isSet('spp', $arg)) {
            $w[] = $this->connect->parse("q.position = ?s", $arg['spp']);
        }
        if ($this->isSet('date', $arg)) {
//            $w[] = $this->connect->parse("date(date_time) = ?s", $this->setDate($arg['date']));
            $w[] = $this->connect->parse("date(created) = ?s", $this->setDate($arg['date']));
        }
        if (count($w)) {
            $this->where = "WHERE " . implode(' AND ', $w);
        } else {
            $this->where = null;
        }
    }

    protected function setLimit($arg)
    {
        if ($this->isSet('l1', $arg)) {
            $this->limit[0] = $arg['l1'];
        }
        if ($this->isSet('l2', $arg)) {
            $this->limit[0] = $arg['l2'];
        }
    }


}
