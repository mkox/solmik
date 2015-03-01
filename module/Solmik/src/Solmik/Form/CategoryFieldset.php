<?php

namespace Solmik\Form;

use Solmik\Entity\Category;
use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Fieldset;
use Zend\InputFilter\InputFilterProviderInterface;

class CategoryFieldset extends Fieldset implements InputFilterProviderInterface {

    public function __construct(ObjectManager $objectManager) {
        parent::__construct('category');

        $this->setHydrator(new DoctrineHydrator($objectManager))
                ->setObject(new Category());

        $this->add(array(
            'type' => 'Zend\Form\Element\Hidden',
            'name' => 'id'
        ));
        
        $this->add(array(
            'type' => 'Zend\Form\Element\Text',
            'name' => 'name',
            'options' => array(
                'label' => 'Name'
            )
        ));
        $this->add(array(
            'type' => 'Zend\Form\Element\Checkbox',
            'name' => 'public',
            'options' => array(
                'label' => 'Public'
            )
        ));

//        $solmistringFieldset = new SolmistringFieldset($objectManager);
//        $this->add(array(
//            'type' => 'Zend\Form\Element\Collection',
//            'name' => 'solmistring',
//            'options' => array(
//                'count' => 2,
//                'target_element' => $solmistringFieldset
//            )
//        ));
    }

    public function getInputFilterSpecification() {
        return array(
//            'title' => array(
//                'required' => true
//            ),
        );
    }

}
