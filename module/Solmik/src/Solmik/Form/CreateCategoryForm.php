<?php

namespace Solmik\Form;

use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Form;

class CreateCategoryForm extends Form {

    public function __construct(ObjectManager $objectManager) {
        parent::__construct('create-category-form');

        // The form will hydrate an object of type "Category"
        $this->setHydrator(new DoctrineHydrator($objectManager));

        // Add the user fieldset, and set it as the base fieldset
        $categoryFieldset = new CategoryFieldset($objectManager);
        $categoryFieldset->setUseAsBaseFieldset(true);
//        $categoryFieldset->remove('solmistring');
        $this->add($categoryFieldset);

        // … add CSRF and submit elements …
        $this->add(array(
            'type' => 'Zend\Form\Element\Csrf',
            'name' => 'csrf'
        ));

        $this->add(array(
            'name' => 'submit',
            'attributes' => array(
                'type' => 'submit',
                'value' => 'Send'
            )
        ));

        // Optionally set your validation group here
    }

}
