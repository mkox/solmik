<?php
namespace Solmik;

$actionConstraints = '[a-zA-Z][a-zA-Z0-9_-]*';
$idConstraints = '[0-9]+';

return array(
    'controllers' => array(
        'invokables' => array(
            'Solmik\Controller\Solmik' => 'Solmik\Controller\SolmikController',
            'Solmik\Controller\Category' => 'Solmik\Controller\CategoryController',
            'Solmik\Controller\Solmistring' => 'Solmik\Controller\SolmistringController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'solmik' => array(
                'type' => 'segment',
                'options' => array(
//                    'route' => '/solmik[/][:action][/:id]',
//                    'route' => '/[:controller][/][:action][/:id]',
                    'route' => '/solmik[/][:action][/:id]',
                    'constraints' => array(
                        'action' => $actionConstraints,
                        'id' => $idConstraints,
                    ),
                    'defaults' => array(
                        'controller' => 'Solmik\Controller\Solmik',
                        'action' => 'index',
                    ),
                ),
            ),
            'solmik-category' => array(
                'type' => 'segment',
                'options' => array(
//                    'route' => '/solmik[/][:action][/:id]',
                    'route' => '/solmik-category[/][:action][/:id]',
                    'constraints' => array(
                        'action' => $actionConstraints,
                        'id' => $idConstraints,
                    ),
                    'defaults' => array(
                        'controller' => 'Solmik\Controller\Category',
//                        'action' => 'create',
                    ),
                ),
            ),
            'solmik-string' => array(
                'type' => 'segment',
                'options' => array(
//                    'route' => '/solmik[/][:action][/:id]',
                    'route' => '/solmik-string[/][:action][/:id]',
                    'constraints' => array(
                        'action' => $actionConstraints,
                        'id' => $idConstraints,
                    ),
                    'defaults' => array(
                        'controller' => 'Solmik\Controller\Solmistring',
//                        'action' => 'create',
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'solmik' => __DIR__ . '/../view',
        ),
    ),
    'doctrine' => array(
        'driver' => array(
            __NAMESPACE__ . '_driver' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
//                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . 'Driver'
                )
            )
        ),
        'authentication' => array(
            'orm_default' => array(
                'object_manager' => 'Doctrine\ORM\EntityManager',
                'identity_class' => 'Solmik\Entity\User',
                'identity_property' => 'username',
                'credential_property' => 'password',
            ),
        ),
    )
);
