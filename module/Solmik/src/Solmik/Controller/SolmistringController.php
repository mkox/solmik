<?php

namespace Solmik\Controller;

use Zend\Mvc\Controller\AbstractActionController;
//use Zend\View\Model\ViewModel;
use Solmik\Entity;
use Solmik\Form;
use Zend\Debug\Debug;

class SolmistringController extends AbstractActionController {
    
    public function createAction() {
        // Get your ObjectManager from the ServiceManager
        $objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');

        // Create the form and inject the ObjectManager
        $form = new Form\CreateSolmistringForm($objectManager);

        // Create a new, empty entity and bind it to the form
        $solmistring = new Entity\Solmistring();
        $form->bind($solmistring);

        if ($this->request->isPost()) {
//print_r($this->request);
            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                $objectManager->persist($solmistring);
                $objectManager->flush();
                return $this->redirect()->toRoute('solmik');
            }
        }

        return array('form' => $form);
    }

    public function editAction() {
        $id = (int) $this->params()->fromRoute('id', 0);
        
        // Get your ObjectManager from the ServiceManager
        $objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
        // Create the form and inject the ObjectManager
        $form = new Form\UpdateSolmistringForm($objectManager);

        // Create a new, empty entity and bind it to the form
//        $solmistring = $this->userService->get($this->params('id'));
        $solmistring = $objectManager->find('Solmik\Entity\Solmistring', $id);
        $form->bind($solmistring);

        if ($this->request->isPost()) {
            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                // Save the changes
                $objectManager->flush();
                return $this->redirect()->toRoute('solmik');
            }
        }

        return array('form' => $form, 'id' => $id);
    }

}
