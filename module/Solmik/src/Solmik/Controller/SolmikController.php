<?php

namespace Solmik\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Solmik\Entity;
use Solmik\Form;
use Zend\Debug\Debug;

class SolmikController extends AbstractActionController {

    public function indexAction() {

        $objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
//Debug::Dump($objectManager->findAll(), '$objectManager->findAll():');
        $repository = $objectManager->getRepository('Solmik\Entity\Category');
//        $categoriesList = $repository->findAll();
        $categoriesList = $repository->findBy(array(), array('name' => 'ASC'));
//    Debug::Dump($categoriesList, '$categoriesList:');
//    for($i=0;$i<count($categoriesList);$i++){
////    Debug::Dump($categoriesList[$i]->getSolmistrings(), '$categoriesList single, '$i' . ':');
//        Debug::Dump($categoriesList[$i]->getSolmistrings(), '$categoriesList single, ' . $i . ', getSolmistrings():');
//        $solmistrings = $categoriesList[$i]->getSolmistrings();
//        for($j=0;$j<count($solmistrings);$j++){
//            Debug::Dump($solmistrings[$j]->getString(), '$solmistrings[$j]->getString(), ' . $j . ':');
//        }
//    }

        $stringForms = array();
        for ($i = 0; $i < count($categoriesList); $i++) {
//    Debug::Dump($categoriesList[$i]->getSolmistrings(), '$categoriesList single, '$i' . ':');
//            Debug::Dump($categoriesList[$i]->getSolmistrings(), '$categoriesList single, ' . $i . ', getSolmistrings():');
            $solmistrings = $categoriesList[$i]->getSolmistrings();
            if ($solmistrings) {
//                Debug::Dump($solmistrings, '$solmistrings: ');
                $stringForms[$i] = array();
                for ($j = 0; $j < count($solmistrings); $j++) {
//                    Debug::Dump($solmistrings[$j]->getString(), '$solmistrings[$j]->getString(), ' . $j . ':');
                    $stringForm = new Form\SolmistringFormForList($objectManager);
                    $stringForms[$i][] = $stringForm->bind($solmistrings[$j]);
                }
            }
        }
//Debug::Dump($stringForms, '$stringForms: ');
//exit;
        $loginForm = new Form\LoginForm($objectManager);
        $user = new Entity\User();
        $loginForm->bind($user);

//        $authenticationService = $this->serviceLocator()->get('Zend\Authentication\AuthenticationService');
//        $loggedUser = $authenticationService->getIdentity();

        return new ViewModel(array(
//            'categories' => $this->getAlbumTable()->fetchAll(),
//            'categories' => $objectManager->findAll()
            'categories' => $categoriesList,
            'stringForms' => $stringForms,
            'loginForm' => $loginForm
//            'user' => $loggedUser
        ));
    }

    public function loginAction() {
        $data = $this->getRequest()->getPost();

        // If you used another name for the authentication service, change it here
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');

        $adapter = $authService->getAdapter();
//        $adapter->setIdentityValue($data['login']);
        $adapter->setIdentityValue($data['username']);
        $adapter->setCredentialValue($data['password']);
        $adapter->setIdentityValue($data['user']['username']);
        $adapter->setCredentialValue($data['user']['password']);
        $authResult = $authService->authenticate();

        if ($authResult->isValid()) {
            return $this->redirect()->toRoute('solmik');
        }

        return new ViewModel(array(
            'error' => 'Your authentication credentials are not valid',
        ));
    }

    public function logoutAction() {
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');
//        $this->authService->getStorage()->clear();
        $authService->getStorage()->clear();
        return $this->redirect()->toRoute('solmik');
    }

}
