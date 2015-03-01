<?php
namespace Solmik\Form;

use Doctrine\Common\Persistence\ObjectManager;
use DoctrineModule\Stdlib\Hydrator\DoctrineObject as DoctrineHydrator;
use Zend\Form\Form;

class LoginForm extends Form
{
    public function __construct(ObjectManager $objectManager)
    {
        parent::__construct('login-form');

        // The form will hydrate an object of type "Category"
        $this->setHydrator(new DoctrineHydrator($objectManager));

        // Add the category fieldset, and set it as the base fieldset
        $userFieldset = new UserFieldset($objectManager);
        $userFieldset->setUseAsBaseFieldset(true);
        $this->add($userFieldset);

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