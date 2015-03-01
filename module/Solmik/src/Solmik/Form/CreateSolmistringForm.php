<?php

namespace Solmik\Form;

use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Form;

class CreateSolmistringForm extends Form {

    public function __construct(ObjectManager $objectManager) {
        parent::__construct('create-solmistring-form');

//        $hydrator = new DoctrineHydrator($entityManager);
        $this->setHydrator(new DoctrineHydrator($objectManager));
//        $this->setHydrator($hydrator);

        // Add the user fieldset, and set it as the base fieldset
        $solmistringFieldset = new SolmistringFieldset($objectManager);
        $solmistringFieldset->setUseAsBaseFieldset(true);
        $solmistringFieldset->remove('category');
        $this->add($solmistringFieldset);

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
