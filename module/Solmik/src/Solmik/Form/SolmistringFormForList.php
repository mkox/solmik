<?php

namespace Solmik\Form;

use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Form;

class SolmistringFormForList extends Form {

    public function __construct(ObjectManager $objectManager) {
        parent::__construct('solmistring-form-for-list');

        // The form will hydrate an object of type "Solmistring"
        $this->setHydrator(new DoctrineHydrator($objectManager));

        // Add the solmistring fieldset, and set it as the base fieldset
        $solmistringFieldset = new SolmistringFieldset($objectManager);
        $solmistringFieldset->setUseAsBaseFieldset(true);
        $solmistringFieldset->remove('categories');
        $solmistringFieldset->remove('name');
        $solmistringFieldset->get('soundKey')->setOptions(array('label' => ''));
        $solmistringFieldset->get('baseScale')->setOptions(array('label' => '', 'empty_option' => false));
        $solmistringFieldset->get('string')->setOptions(array('label' => ''));
        $this->add($solmistringFieldset);

        // … add CSRF and submit elements …
        $this->add(array(
            'type' => 'Zend\Form\Element\Csrf',
            'name' => 'csrf'
        ));

        $this->add(array(
            'name' => 'go',
            'attributes' => array(
                'type' => 'button',
                'class' => 'go',
                'value' => 'Go'
            )
        ));

        // Optionally set your validation group here
    }

}
