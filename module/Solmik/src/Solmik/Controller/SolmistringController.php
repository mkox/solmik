<?php

namespace Solmik\Controller;

use Zend\Mvc\Controller\AbstractActionController;
//use Zend\View\Model\ViewModel;
use Solmik\Entity;
use Solmik\Form;
use Zend\Debug\Debug;

class SolmistringController extends AbstractActionController {

    /**
     *
     * @var type Doctrine\ORM\EntityManager
     */
    protected $objectManager;

    public function createAction() {
        
        // Create the form and inject the ObjectManager
        $form = new Form\CreateSolmistringForm($this->objectManager);

        // Create a new, empty entity and bind it to the form
        $solmistring = new Entity\Solmistring();
        $form->bind($solmistring);

        if ($this->request->isPost()) {

            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                $this->objectManager->persist($solmistring);
                $this->objectManager->flush();
                return $this->redirect()->toRoute('solmik');
            }
        }

        return array('form' => $form);
    }

    public function editAction() {
        $id = (int) $this->params()->fromRoute('id', 0);

        // Create the form and inject the ObjectManager
        $form = new Form\UpdateSolmistringForm($this->objectManager);

        // Create a new, empty entity and bind it to the form
        $solmistring = $this->objectManager->find('Solmik\Entity\Solmistring', $id);
        $form->bind($solmistring);

        if ($this->request->isPost()) {
            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                // Save the changes
                $this->objectManager->flush();
                return $this->redirect()->toRoute('solmik');
            }
        }

        return array('form' => $form, 'id' => $id);
    }

    protected function attachDefaultListeners() {
        parent::attachDefaultListeners();
        $this->objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
    }

}
