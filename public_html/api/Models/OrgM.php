<?php

namespace Models;

class OrgM extends Model
{
    public function __construct($request = null)
    {
        parent::__construct($request);
    }

    function getSpp()
    {
        $sql = 'SELECT distinct galaxy_users.position 
                        FROM galaxy_users INNER JOIN user 
                        ON LOWER(galaxy_users.login) = LOWER(user.login)';
        return $this->connect->getAll($sql);
    }

    function getFioUser($fio = null)
    {
        $sql = 'SELECT * FROM user WHERE fio LIKE ?s ORDER BY fio ASC';
        return $this->connect->getAll($sql, $fio);
    }

    function getUsers($arg)
    {
        $this->setWhere($arg);
        $sql = 'SELECT * FROM user ?p ORDER BY fio ASC';
        return $this->connect->getAll($sql, $this->where);
//        return $this->connect->getInd('fio', $sql, $this->where);
    }

}

