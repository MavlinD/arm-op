<?php

namespace Controllers;

//require '../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
//use PhpOffice\PhpSpreadsheet\Style\Border;
//use PhpOffice\PhpSpreadsheet\Style\Borders;

class ReportC extends Controller
{
    //https://tableexport.v5.travismclarke.com/#tableexport
    protected $WorkLog; // ссылка на модель

    public function __construct($req)
    {
        parent::setCfg();
        $this->WorkLog = new \Models\ReportM($this->config);
        if ($req !== null) {
            parent::__construct($req);
        }
    }

    function getVal()
    {
//        $function = $_POST['function'];
//        $mysqli = new mysqli('localhost:3306', 'root', 'root', 'phpmyadmin');
//        $mysqli->set_charset('UTF-8');
//        switch ($function) {
//            case 'ExcelExport':
//                $result = exportExcel($mysqli);
//                echo json_encode($result);
//                break;
//        }
    }

    function mergeCountPos($arr)
    {
        $keys = [];
        foreach ($arr as $item) {
            $count = $item['count'];
            $position = $item['position'];

            if (isset($keys[$position])) {
                $keys[$position]['count']++;
            } else {
                $keys[$position] = [
                    'id' => $count,
                    'count' => 1
                ];
            }
        }

        $result = [];
        foreach ($keys as $position => $item) {
            $result[] = [
                'count' => $item['count'] > 1 ? $item['count'] : $item['id'],
                'position' => $position,
                '01' => '',
                '02' => '',
                '03' => '',
                '04' => '',
                '05' => '',
                '06' => '',
                '07' => '',
                '08' => '',
                '09' => '',
                '10' => '',
                '11' => '',
                '12' => ''
            ];
        }

        return $result;
    }

    function getExcel2(){
        require 'vendor/autoload.php';

//    use PhpOffice\PhpSpreadsheet\Spreadsheet;
//    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setCellValue('A1', 'Hello Привет World !');

        \PhpOffice\PhpSpreadsheet\Shared\File::setUseUploadTempDirectory(true);

        $pFilename = @tempnam(\PhpOffice\PhpSpreadsheet\Shared\File::sysGetTempDir(), 'phpxltmp');
        $originalFilename = $pFilename;

        $writer = new Xlsx($spreadsheet);
        $writer->save($pFilename);
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment; filename="export.xlsx"');
//        $writer->save("php://output");
//        exit;
        ob_start();
        $writer->save("php://output");
        $xlsData = ob_get_contents();
        ob_end_clean();

        $response = array(
            'op' => 'ok',
            'file' => "data:application/vnd.ms-excel;base64," . base64_encode($xlsData)
        );

        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;
        $this->result['data'] = $response;

        $this->setResp();

    }

    function getExcel()
    {
//        $query_stat = $this->WorkLog->getRows();
        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;
        $this->result['data'] = $this->WorkLog->getRows();

        $this->setResp();
    }
    function getExcel3()
    {
        //    Используется в 1 листе
//        require '../vendor/autoload.php';
        require 'vendor/autoload.php';
//        require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setCellValue('A1', 'Hello Привет World !');

        \PhpOffice\PhpSpreadsheet\Shared\File::setUseUploadTempDirectory(true);

        $pFilename = @tempnam(\PhpOffice\PhpSpreadsheet\Shared\File::sysGetTempDir(), 'phpxltmp');

//        $this->decodeRequest($this->request[(string)__FUNCTION__]['data']);
//        $this->getArg();
//
//        $this->result['where'] = $this->arg;
//        $this->result['select'] = (string)__CLASS__;
//        $this->result['mode'] = (string)__FUNCTION__;
//        $this->setResp();
//        return;

        $mounth = array();

        $query_stat = $this->WorkLog->getRows();

        $result = $this->mergeCountPos($query_stat);

        // Записываем в массив кол-во запросов, по месяцам
        for ($i = 0; $i < count($result); $i++) {
            for ($j = 0; $j < count($mounth); $j++) {
                $str1 = $result[$i]['position'];
                $str2 = $mounth[$j]['position'];
                if (strcmp($str1, $str2) == 0) {
                    $k = '' . $mounth[$j]['query_datetime'] . '';
                    $result[$i][$k] = (int)$result[$i][$k] + (int)$mounth[$j]['count'];
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        //    Шапка
        $sheet->setCellValue('A1', '№ п/п');
        $sheet->setCellValue('B1', 'СПП');
        $sheet->setCellValue('C1', 'Кол-во запросов всего');
        $sheet->setCellValue('D1', 'По месяцам');
        $sheet->setCellValue('D2', 'Янваврь');
        $sheet->setCellValue('E2', 'Февраль');
        $sheet->setCellValue('F2', 'Март');
        $sheet->setCellValue('G2', 'Апрель');
        $sheet->setCellValue('H2', 'Май');
        $sheet->setCellValue('I2', 'Июнь');
        $sheet->setCellValue('J2', 'Июль');
        $sheet->setCellValue('K2', 'Август');
        $sheet->setCellValue('L2', 'Сентябрь');
        $sheet->setCellValue('M2', 'Октябрь');
        $sheet->setCellValue('N2', 'Ноябрь');
        $sheet->setCellValue('O2', 'Декабрь');

        //  Объединение ячеек
        $sheet->mergeCells('A1:A2');
        $sheet->mergeCells('B1:B2');
        $sheet->mergeCells('C1:C2');
        $sheet->mergeCells('D1:O1');

        //    Жирный текст
        $sheet->getStyle('A1:O1')->getFont()->setBold(true);
        $sheet->getStyle('A2:O2')->getFont()->setBold(true);

        //  Авторазмер текста
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);
        $sheet->getColumnDimension('C')->setAutoSize(true);
        $sheet->getColumnDimension('D')->setAutoSize(true);

        //  Выравнивание текста в ячейках
        $sheet->getStyle('A1:O2')->getAlignment()->setHorizontal('center');
        $sheet->getStyle('A1:A2')->getAlignment()->setVertical('center');
        $sheet->getStyle('B1:B2')->getAlignment()->setVertical('center');
        $sheet->getStyle('C1:C2')->getAlignment()->setVertical('center');

        //  Границы ячеек
//        $r = Style\Border::BORDER_THIN;
        $sheet->getStyle('A1:O2')->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
//        $r = 0;
//            (PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
//        $sheet->getStyle('A1:O2')->getBorders()->getAllBorders()->setBorderStyle(PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

        for ($i = 0; $i < count($result); $i++) {
            $arg = 3 + $i;
            $result[$i]['cellA'] = 'A' . $arg;
            $result[$i]['cellB'] = 'B' . $arg;
            $result[$i]['cellC'] = 'C' . $arg;
            //  Mounth
            $result[$i]['cellD'] = 'D' . $arg;
            $result[$i]['cellE'] = 'E' . $arg;
            $result[$i]['cellF'] = 'F' . $arg;
            $result[$i]['cellG'] = 'G' . $arg;
            $result[$i]['cellH'] = 'H' . $arg;
            $result[$i]['cellI'] = 'I' . $arg;
            $result[$i]['cellJ'] = 'J' . $arg;
            $result[$i]['cellK'] = 'K' . $arg;
            $result[$i]['cellL'] = 'L' . $arg;
            $result[$i]['cellM'] = 'M' . $arg;
            $result[$i]['cellN'] = 'N' . $arg;
            $result[$i]['cellO'] = 'O' . $arg;
            //  Границы ячеек
            $sheet->getStyle('A3:O' . $arg)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellA'], $i + 1);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellB'], $result[$i]['position']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellC'], $result[$i]['count']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellD'], $result[$i]['01']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellE'], $result[$i]['02']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellF'], $result[$i]['03']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellG'], $result[$i]['04']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellH'], $result[$i]['05']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellI'], $result[$i]['06']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellJ'], $result[$i]['07']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellK'], $result[$i]['08']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellL'], $result[$i]['09']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellM'], $result[$i]['10']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellN'], $result[$i]['11']);
            $spreadsheet->getActiveSheet()->setCellValue($result[$i]['cellO'], $result[$i]['12']);
        }

        //    Используется во 2 листе
//        $exportPeople = array();
//        $query = array();
//
//        $sql = 'select u.position
//             FROM galaxy_users u INNER JOIN query q ON LOWER(u.login) = LOWER(q.login)
//            group by u.position';
//
//        $connect = $mysqli->query($sql);
//
//        while ($row = $connect->fetch_assoc()) {
//            array_push($query, $row);
//        }
//
//        //  Подготавливаем второй лист
//        $spreadsheet->createSheet(1);
//        $spreadsheet->setActiveSheetIndex(1);
//        $sheet = $spreadsheet->getActiveSheet(1);
//        $sheet->setCellValue('A1', '№ п/п');
//        $sheet->setCellValue('B1', 'ФИО');
//        $sheet->setCellValue('C1', 'СПП');
//        $sheet->setCellValue('D1', 'Должность');
//        $sheet->setCellValue('E1', 'Кол-во запросов (за всё время)');
//        $sheet->setCellValue('F1', 'Самый популярный запрос');
//
//        //  Жирный текст
//        $sheet->getStyle('A1:F1')->getFont()->setBold(true);
//
//        //  Авторазмер текста
//        $sheet->getColumnDimension('A')->setAutoSize(true);
//        $sheet->getColumnDimension('B')->setAutoSize(true);
//        $sheet->getColumnDimension('C')->setAutoSize(true);
//        $sheet->getColumnDimension('D')->setAutoSize(true);
//        $sheet->getColumnDimension('E')->setAutoSize(true);
//        $sheet->getColumnDimension('F')->setAutoSize(true);
//
//        //  Выравнивание текста в ячейках
//        $sheet->getStyle('A1:F1')->getAlignment()->setHorizontal('center');
//        $sheet->getStyle('A1:F1')->getAlignment()->setVertical('center');
//
//        for ($i = 0; $i < count($exportPeople); $i++) {
//            $arg = 2 + $i;
//            $exportPeople[$i]['cellA'] = 'A' . $arg;
//            $exportPeople[$i]['cellB'] = 'B' . $arg;
//            $exportPeople[$i]['cellD'] = 'D' . $arg;
//            $exportPeople[$i]['cellE'] = 'E' . $arg;
//            $exportPeople[$i]['cellF'] = 'F' . $arg;
//            //  Границы ячеек
//            $sheet->getStyle('A1:F' . $arg)->getBorders()->getAllBorders()->setBorderStyle(PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
//            //  Выравнивание текста в ячейках A2:D
//            $sheet->getStyle('A2:D' . $arg)->getAlignment()->setHorizontal('left');
//            $sheet->getStyle('A2:D' . $arg)->getAlignment()->setVertical('center');
//            //  Выравнивание текста в ячейках E2:E
//            $sheet->getStyle('E2:E' . $arg)->getAlignment()->setHorizontal('center');
//            $sheet->getStyle('E2:E' . $arg)->getAlignment()->setVertical('center');
//            //  Выравнивание текста в ячейках F2:F
//            $sheet->getStyle('F2:F' . $arg)->getAlignment()->setHorizontal('left');
//            $sheet->getStyle('F2:F' . $arg)->getAlignment()->setVertical('center');
//
//            $spreadsheet->getActiveSheet()->setCellValue($exportPeople[$i]['cellA'], $i + 1);
//            $spreadsheet->getActiveSheet()->setCellValue($exportPeople[$i]['cellB'], $exportPeople[$i]['fio']);
//            $spreadsheet->getActiveSheet()->setCellValue($exportPeople[$i]['cellD'], $exportPeople[$i]['post']);
//            $spreadsheet->getActiveSheet()->setCellValue($exportPeople[$i]['cellE'], $exportPeople[$i]['count']);
//            $spreadsheet->getActiveSheet()->setCellValue($exportPeople[$i]['cellF'], $exportPeople[$i]['query_text']);
//            for ($j = 0; $j < count($query); $j++) {
//                $str1 = $query[$j]['position'];
//                $str2 = $exportPeople[$i]['position'];
//                if (strcmp($str1, $str2) == 0) {
//                    $query[$j]['cellC'] = 'C' . $arg;
//
//                    $spreadsheet->getActiveSheet()->setCellValue($query[$j]['cellC'], $query[$j]['position']);
//                }
//            }
//        }

        //  Writing to file
        $writer = new Xlsx($spreadsheet);
        $writer->save($pFilename);
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment; filename="export.xlsx"');
//        $writer->save("php://output");
//        exit;
        ob_start();
        $writer->save("php://output");
        $xlsData = ob_get_contents();
        ob_end_clean();

        $response = array(
            'op' => 'ok',
            'file' => "data:application/vnd.ms-excel;base64," . base64_encode($xlsData)
        );

        $this->result = $response;

        $this->result['where'] = $this->arg;
        $this->result['select'] = (string)__CLASS__;
        $this->result['mode'] = (string)__FUNCTION__;

        $this->setResp();
    }


}