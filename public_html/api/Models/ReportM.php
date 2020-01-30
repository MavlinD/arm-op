<?php


namespace Models;


class ReportM extends Model
{

    public function __construct($request = null)
    {
        parent::__construct($request);
    }

//    function
    function getRows()
    {
        $sql = 'SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS cnt,
 DATE_FORMAT(q.date_time, "%m") AS month,
 u.position
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) GROUP BY u.position, month ORDER BY u.position, month';
        $this->connect->query("SET lc_time_names = 'ru_RU'");

        return $this->connect->getAll($sql);
    }
    
    function getSh2(){
        $sql = 'SELECT count(query_text) as count, q.query_text, q.login, q.fio ,u.position, user.position post FROM query q inner join galaxy_users u  on LOWER(u.login) = LOWER(q.login) inner join user on LOWER(user.login) = LOWER(q.login) GROUP BY q.login';

        return $this->connect->getAll($sql);
    }

    function getExport()
    {

        $sql = 'SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position, q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=01 GROUP BY position union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=02 GROUP BY position union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=03 GROUP BY position union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=04 GROUP BY position  union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=05 GROUP BY position  union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=06 GROUP BY position  union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=07 GROUP BY position  union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=08 GROUP BY position  union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=09 GROUP BY position  union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=10 GROUP BY position  union SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=11 GROUP BY position  union  SELECT COUNT(DATE_FORMAT(q.date_time, "%m")) AS count,
 DATE_FORMAT(q.date_time, "%m") AS query_datetime,
 u.position,
 q.login
FROM galaxy_users u INNER JOIN query q
ON LOWER(u.login) = LOWER(q.login) where  DATE_FORMAT(q.date_time, "%m")=12 GROUP BY position ';


        return $this->connect->getAll($sql, $this->where);
//        return $arrayResult;
//        return null;
    }

}