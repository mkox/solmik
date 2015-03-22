<?php

namespace Solmik\Form;

use Solmik\Entity\Solmistring;
use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Fieldset;
use Zend\InputFilter\InputFilterProviderInterface;
use Solmik\Service;

class SolmistringFieldset extends Fieldset implements InputFilterProviderInterface {

    public function __construct(ObjectManager $objectManager) {
        parent::__construct('solmistring');

        $this->setHydrator(new DoctrineHydrator($objectManager))
                ->setObject(new Solmistring());

        $this->add(array(
            'type' => 'Zend\Form\Element\Hidden',
            'name' => 'id'
        ));

        $this->add(array(
            'type' => 'Zend\Form\Element\Text',
            'name' => 'name',
            'options' => array(
                'label' => 'Name: '
            )
        ));
        
        $soundKeyValueOptions = array();
        $soundKeys =  Service\Misc::getSoundKeys();
        foreach ($soundKeys as $value => $label) {
            $soundKeyOption = array();
            $soundKeyOption['value'] = $value;
            $soundKeyOption['label'] = $label;
            $soundKeyValueOptions[] = $soundKeyOption;
        }
        $this->add(array(
            'type' => 'Zend\Form\Element\Select',
            'name' => 'soundKey',
            'attributes' => array(
                'class' => 'sound-keys',
            ),
            'options' => array(
                'label' => 'Sound Key: ',
                'value_options' => $soundKeyValueOptions
            )
        ));

        $baseScaleValueOptions = array();
        for ($i = 1; $i <= 9; $i++) {
            $baseScaleOption = array();
            $baseScaleOption['value'] = $i;
            $baseScaleOption['label'] = $i;
            $baseScaleValueOptions[] = $baseScaleOption;
        }
        $this->add(array(
            'type' => 'Zend\Form\Element\Select',
            'name' => 'baseScale',
            'attributes' => array(
                'class' => 'scales',
            ),
            'options' => array(
                'label' => 'Base scale: ',
                'empty_option' => 'Please choose a base scale',
                'value_options' => $baseScaleValueOptions
            )
        ));

        $this->add(array(
            'type' => 'Zend\Form\Element\Text',
            'name' => 'string',
            'options' => array(
                'label' => 'Solmization string: '
            )
        ));


//        $categoryFieldset = new CategoryFieldset($objectManager);
//        $this->add(array(
//            'type' => 'Zend\Form\Element\Collection',
//            'name' => 'category',
//            'options' => array(
//                'count' => 2,
//                'target_element' => $categoryFieldset
//            )
//        ));
//        $catgoryRepository = $objectManager->getRepository('Solmik\Entity\Category');
//        $allCategories = $catgoryRepository->findAll();
//        $categoryValueOptions = array();
//        for ($i = 0; $i < count($allCategories); $i++) {
////            $categoryValueOptions[$allCategories[$i]->getID()] = $allCategories[$i]->getName();
//            $categoryOption = array();
//            $categoryOption['value'] = $allCategories[$i]->getID();
//            $categoryOption['label'] = $allCategories[$i]->getName();
//            $categoryValueOptions[] = $categoryOption;
//        }
//        $this->add(array(
//            'type' => 'Zend\Form\Element\Select',
//            'name' => 'categories',
//            'options' => array(
//                'label' => 'Categories',
//                'empty_option' => 'Please choose one or more categories',
//                'value_options' => $categoryValueOptions
//            )
//        ));

        $this->add(array(
            'type' => 'DoctrineModule\Form\Element\ObjectSelect',
            'name' => 'categories',
            'attributes' => array(
                'multiple' => 'multiple',
            ),
            'options' => array(
                'label' => 'Categories',
                'object_manager' => $objectManager,
                'target_class' => 'Solmik\Entity\Category',
                'property' => 'name',
                'empty_option' => 'Please choose one or more categories'
            ),
        ));
    }

    public function getInputFilterSpecification() {
        return array(
            'id' => array(
                'required' => false
            ),
            'name' => array(
                'required' => true
            )
        );
    }

}
