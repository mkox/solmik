<?php

namespace Solmik;

use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
use Zend\ModuleManager\Feature\ConfigProviderInterface;
//use Album\Model\Album;
//use Album\Model\AlbumTable;
//use Zend\Db\ResultSet\ResultSet;
//use Zend\Db\TableGateway\TableGateway;
use Zend\Authentication\AuthenticationService;

class Module implements AutoloaderProviderInterface, ConfigProviderInterface {

    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig() {
        return include __DIR__ . '/config/module.config.php';
    }

    // not needed for doctrine
//    public function getServiceConfig() {
//        return array(
//            'factories' => array(
//                'Album\Model\AlbumTable' => function($sm) {
//                    $tableGateway = $sm->get('AlbumTableGateway');
//                    $table = new AlbumTable($tableGateway);
//                    return $table;
//                },
//                'AlbumTableGateway' => function ($sm) {
//                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
//                    $resultSetPrototype = new ResultSet();
//                    $resultSetPrototype->setArrayObjectPrototype(new Album());
//                    return new TableGateway('album', $dbAdapter, null, $resultSetPrototype);
//                },
//            ),
//        );
//    }

    public function getServiceConfig() {
        return array(
            'factories' => array(
                'Zend\Authentication\AuthenticationService' => function($serviceManager) {
                    // If you are using DoctrineORMModule:
                    return $serviceManager->get('doctrine.authenticationservice.orm_default');

                    // If you are using DoctrineODMModule:
//                    return $serviceManager->get('doctrine.authenticationservice.odm_default');
                }
            )
        );
    }

}
