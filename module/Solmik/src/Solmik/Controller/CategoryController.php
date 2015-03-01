<?php

namespace Solmik\Controller;

use Zend\Mvc\Controller\AbstractActionController;
//use Zend\View\Model\ViewModel;
use Solmik\Entity;
use Solmik\Form;
use Zend\Debug\Debug;

class CategoryController extends AbstractActionController {
    
    public function createAction() {
        // Get your ObjectManager from the ServiceManager
        $objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');

        // Create the form and inject the ObjectManager
        $form = new Form\CreateCategoryForm($objectManager);

        // Create a new, empty entity and bind it to the form
        $category = new Entity\Category();
        $form->bind($category);

        if ($this->request->isPost()) {
            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                $objectManager->persist($category);
                $objectManager->flush();
                return $this->redirect()->toRoute('solmik');
            }
        }

        return array('form' => $form);
    }

    public function editAction() {
        // Get your ObjectManager from the ServiceManager
        $objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');

        // Create the form and inject the ObjectManager
        $form = new UpdateBlogPostForm($objectManager);

        // Create a new, empty entity and bind it to the form
        $blogPost = $this->userService->get($this->params('blogPost_id'));
        $form->bind($blogPost);

        if ($this->request->isPost()) {
            $form->setData($this->request->getPost());

            if ($form->isValid()) {
                // Save the changes
                $objectManager->flush();
            }
        }

        return array('form' => $form);
    }

}
