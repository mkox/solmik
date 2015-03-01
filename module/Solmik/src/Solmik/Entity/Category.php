<?php

namespace Solmik\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

//use Solmik\Entity\Category;

/**
 * @ORM\Entity(repositoryClass="Solmik\Entity\Repository\CategoryRepository")
 */
class Category {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="Category", mappedBy="parent")
     * */
    protected $children;

    /**
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="children")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id")
     * */
    protected $parent;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $public;

    /**
     * @ORM\ManyToMany(targetEntity="Solmik\Entity\Solmistring", mappedBy="categories", cascade={"persist"})
     * @ORM\OrderBy({"name" = "ASC"})
     */
    protected $solmistrings;

    /**
     * Never forget to initialize all your collections !
     */
    public function __construct() {
        $this->children = new ArrayCollection();
        $this->solmistrings = new ArrayCollection();
    }

    /**
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

//    /**
//     * @param Collection $solmistrings
//     */
//    public function addSolmistrings(Collection $solmistrings) {
//        foreach ($solmistrings as $solmistring) {
////            $solmistring->setCategory($this);
//            $solmistring->addCategory($this);
//            $this->solmistrings->add($solmistring);
//        }
//    }
//
//    /**
//     * @param Collection $solmistrings
//     */
//    public function removeSolmistrings(Collection $solmistrings) {
//        foreach ($solmistrings as $solmistring) {
////            $solmistring->setCategory(null);
//            $solmistring->removeCategory($this);
//            $this->solmistrings->removeElement($solmistring);
//        }
//    }

    /**
     * @param Solmistring $solmistring
     */
    public function addSolmistring(Solmistring $solmistring) {
        $this->solmistrings->add($solmistring);
    }

    /**
     * @param Solmistring $solmistring
     */
    public function removeSolmistring(Solmistring $solmistring) {
        $this->solmistrings->removeElement($solmistring);
    }

    /**
     * @return Collection
     */
    public function getSolmistrings() {
        return $this->solmistrings;
    }

    public function getName() {
        return $this->name;
    }

    public function getPublic() {
        return $this->public;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setPublic($public) {
        $this->public = $public;
    }

}
