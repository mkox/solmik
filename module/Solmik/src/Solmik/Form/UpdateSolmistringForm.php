<?php
namespace Solmik\Form;

use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Form;

class UpdateSolmistringForm extends Form
{
    public function __construct(ObjectManager $objectManager)
    {
        parent::__construct('update-solmistring-form');

        // The form will hydrate an object of type "Solmistring"
        $this->setHydrator(new DoctrineHydrator($objectManager));

        // Add the solmistring fieldset, and set it as the base fieldset
        $solmistringFieldset = new SolmistringFieldset($objectManager);
        $solmistringFieldset->setUseAsBaseFieldset(true);
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