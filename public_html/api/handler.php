<?php
define('IRB_ERROR_HANDLER', true);
define('DEBUG_MODE', true); // change in prod
if (IRB_ERROR_HANDLER === true) {
    set_error_handler('setAllException');
//    set_error_handler('setExceptionHandler');
    set_exception_handler('setExceptionHandler');
}
function setAllException($code, $message, $file, $line)
{
    if (error_reporting() && $code) {
        throw new AllException($message, $code, $file, $line);
    }
}

function setExceptionHandler($e)
{
    $code = $e->getCode();
    switch ($code) {
        case E_NOTICE :
            break;
        case E_WARNING :
            break;
        default :
    }
    $aj = new Controllers\Controller($e);

    $aj->setResponse('data', $e->getMessage());
    $aj->setResponse('file', $e->getFile());
    $aj->setResponse('line', $e->getLine());
    $aj->setResponse('code', $e->getCode() ? $e->getCode() : 100);
    if (property_exists($e, 'xdebug_message')) {
        $aj->setResponse('xdebug_message', $e->xdebug_message);
    }
    $aj->setResponse('status', 'err');
    $aj->encodeResponse();
    if (DEBUG_MODE) {
//        print "something went wrong((";
        $aj->showResponse();
    } else {
        print "something went wrong((";
    }
}

class AllException extends Exception
{
    public function __construct($message, $code, $file, $line)
    {
        $this->file = $file;
        $this->line = $line;
        parent::__construct($message, $code);
//        setExceptionHandler($this);
    }
}

