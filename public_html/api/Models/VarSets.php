<?php

namespace Models;


class VarSets extends Model
{
    const TBL_NAME = 'tbl_vars';
    protected $vars = [];

    public function __construct($request = null)
    {
        parent::__construct($request);
        // create tbl if not exist
        if (!$this->isTblExist($request['db'], self::TBL_NAME)) {
            $this->connect->query("CREATE TABLE `tbl_vars` (
  `var_name` varchar(30) NOT NULL,
  `var_data` varchar(1024),
  `var_dtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`var_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8");
        }
    }

    public function set($name, $data)
    {
        $data = array('var_name' => $name, 'var_data' => $data);
        $sql = "INSERT INTO ?n SET ?u ON DUPLICATE KEY UPDATE ?u";
        return $this->connect->query($sql, self::TBL_NAME, $data, $data);
    }

    public function getAll()
    {
        $sql = "SELECT * FROM ?n ORDER BY var_name";
        $this->vars = $this->connect->getIndCol('var_name', $sql, self::TBL_NAME);
        return $this->vars;
    }

    public function getVar($name, $defaultValue)
    {
        $this->getAll();
        return (isset($this->vars[$name]) AND $this->vars[$name]) ? $this->vars[$name] : $defaultValue;
    }
}