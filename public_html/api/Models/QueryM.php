<?php

namespace Models;

class QueryM extends Model
{
    const ITEM_IN_PAGE = 100;
    const TOP_COUNT_QUERY = 7;

    public function __construct($request = null)
    {
        parent::__construct($request);
    }

    // exequte query
    function getStatisticsQuery($arg)
    {
        $this->setWhere($arg);
//        'SELECT COUNT(query_text) AS y, query_text AS name, DATE_FORMAT( created, "%Y-%m") AS date
//FROM query u
//GROUP BY query_text ORDER BY y DESC LIMIT 7';
//
//        'SELECT COUNT(id) AS y, title AS name, DATE_FORMAT( created, "%Y-%m") AS date
//FROM active_queries u
//GROUP BY title ORDER BY y DESC LIMIT 7';
//where

        $sql = 'SELECT COUNT(id) AS y, title AS name, DATE_FORMAT( created, "%Y-%m") AS date
FROM active_queries u ?p
GROUP BY title ORDER BY y DESC LIMIT ?i';
        // WHERE date(created) = '2019-02-15'
//"SELECT COUNT(id) AS y, title AS name, DATE_FORMAT( created, \"%Y-%m\") AS date2
//FROM active_queries u WHERE date(created) > \"2019-02-15\" GROUP BY name ORDER BY id DESC LIMIT 7";

        return $this->connect->getAll($sql, $this->where, self::TOP_COUNT_QUERY);
    }

    function getStatisticsConnect($arg)
    {
        $this->setWhere($arg);
        $sql = 'SELECT COUNT(connect_datetime) AS count, DATE_FORMAT(connect_datetime, "%Y-%m") AS connect_datetime, DATE_FORMAT(connect_datetime, "%Y-%m-%d") AS datetime_full FROM connect_history u ?p GROUP BY connect_datetime';

        return $this->connect->getAll($sql, $this->where);
    }

    function getStatConnSpp($arg)
    {
        $this->setWhere($arg);
        $sql = 'SELECT COUNT(connect_datetime) AS count, DATE_FORMAT(connect_datetime, "%Y-%m") AS connect_datetime, DATE_FORMAT(connect_datetime, "%Y-%m-%d") AS datetime_full FROM galaxy_users q INNER JOIN connect_history h ON LOWER(q.login) = LOWER(h.login) ?p GROUP BY connect_datetime';

        return $this->connect->getAll($sql, $this->where);
    }

    function getStatQSpp($arg)
    {
        $this->setWhere($arg);
        $sql = 'SELECT COUNT(title) AS y, title AS name, DATE_FORMAT( created, "%Y-%m") AS date
        FROM galaxy_users q INNER JOIN active_queries u
        ON LOWER(u.login) = LOWER(q.login) ?p GROUP BY title ORDER BY y DESC LIMIT 7';

//        'SELECT COUNT(title) AS y, title AS name, DATE_FORMAT( created, "%Y-%m") AS date
//        FROM galaxy_users q INNER JOIN active_queries u
//        ON LOWER(u.login) = LOWER(q.login) ?p GROUP BY title ORDER BY y DESC LIMIT 7';

        return $this->connect->getAll($sql, $this->where);
    }

    function getQrContUser($arg)
    {
        $this->setWhere($arg);
        $sql = 'SELECT u.id, u.login, created, q.position, u.fio, title FROM active_queries u inner join galaxy_users q on LOWER(u.login) = LOWER(q.login) ?p ORDER BY fio ASC LIMIT ?i';
        return $this->connect->getAll($sql, $this->where, self::ITEM_IN_PAGE);
    }

    function getQrContSpp($arg)
    {
        $this->setWhere($arg);
        $sql = 'SELECT u.id, q.position, u.login, u.fio, created, title FROM active_queries u inner join galaxy_users q on LOWER(u.login) = LOWER(q.login) ?p ORDER BY fio ASC LIMIT ?i;';
        return $this->connect->getAll($sql, $this->where, self::ITEM_IN_PAGE);
    }

}

