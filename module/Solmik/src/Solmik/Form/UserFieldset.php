<?php

namespace Solmik\Form;

use Solmik\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Fieldset;
use Zend\InputFilter\InputFilterProviderInterface;

class UserFieldset extends Fieldset implements InputFilterProviderInterface {

    public function __construct(ObjectManager $objectManager) {
        parent::__construct('user');

        $this->setHydrator(new DoctrineHydrator($objectManager))
                ->setObject(new User());
        
        $this->add(array(
            'type' => 'Zend\Form\Element\Text',
            'name' => 'username',
            'options' => array(
                'label' => 'Username'
            )
        ));
        
        $this->add(array(
            'type' => 'Zend\Form\Element\Password',
            'name' => 'password',
            'options' => array(
                'label' => 'Password'
            )
        ));
    }

    public function getInputFilterSpecification() {
        return array(
//            'title' => array(
//                'required' => true
//            ),
        );
    }

}
