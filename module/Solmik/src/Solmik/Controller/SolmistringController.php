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
    protected $em;

    public function createAction() {

        // Create the form and inject the EntityManager
        $form = new Form\CreateSolmistringForm($this->em);

        // Create a new, empty entity and bind it to the form
        $solmistring = new Entity\Solmistring();
        $form->bind($solmistring);

        if ($this->request->isPost()) {

            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                $this->em->persist($solmistring);
                $this->em->flush();
                return $this->redirect()->toRoute('solmik');
            }
        }

        return array('form' => $form);
    }

    public function editAction() {
        $id = (int) $this->params()->fromRoute('id', 0);

        // Create the form and inject the ObjectManager
        $form = new Form\UpdateSolmistringForm($this->em);

        $solmistring = $this->em->find('Solmik\Entity\Solmistring', $id);
        $form->bind($solmistring);

        if ($this->request->isPost()) {
            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                // Save the changes
                $this->em->flush();
                return $this->redirect()->toRoute('solmik');
            }
        }

        return array('form' => $form, 'id' => $id);
    }

    public function deleteAction() {
        $id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('solmik');
        }

        $request = $this->getRequest();
        if ($request->isPost()) {
            $del = $request->getPost('del', 'No');

            if ($del == 'Yes') {
                $id = (int) $request->getPost('id');
                $this->em->remove($this->em->find('Solmik\Entity\Solmistring', $id));
                $this->em->flush();
            }

            return $this->redirect()->toRoute('solmik');
        }
        
        return array(
            'id' => $id,
            'solmistring' => $this->em->find('Solmik\Entity\Solmistring', $id)
        );
    }

    protected function attachDefaultListeners() {
        parent::attachDefaultListeners();
        $this->em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
    }

}
