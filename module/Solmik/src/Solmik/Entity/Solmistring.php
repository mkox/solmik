<?php

namespace Solmik\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Solmistring {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="integer")
     */
    protected $baseScale;

    /**
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="solmistrings")
     * */
    private $categories;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;
    
    /**
     * @ORM\Column(type="string", length=3)
     */
    protected $soundKey;

    /**
     * @ORM\Column(type="string")
     */
    protected $string;

    public function __construct() {
        $this->categories = new ArrayCollection();
    }

    /**
     * Get the id
     * @return int
     */
    public function getId() {
        return $this->id;
    }

//    /**
//     * @param Category $category
//     */
//    public function addCategory(Category $category) {
//        $this->categories->add($category);
//    }
//
//    /**
//     * @param Category $category
//     */
//    public function removeCategory(Category $category) {
//        $this->categories->removeElement($category);
//    }
    
    /**
     * @param Collection $categories
     */
    public function addCategories(Collection $categories) {
        foreach ($categories as $category) {
            $category->addSolmistring($this);
            $this->categories->add($category);
        }
    }

    /**
     * @param Collection $categories
     */
    public function removeCategories(Collection $categories) {
        foreach ($categories as $category) {
            $category->removeSolmistring($this);
            $this->categories->removeElement($category);
        }
    }
    
    /**
     * @return Collection
     */
    public function getCategories() {
        return $this->categories;
    }
    

//    /**
//     * Allow null to remove association
//     *
//     * @param Category $category
//     */
//    public function setCategory(Category $category = null) {
//        $this->category = $category;
//    }
//
//    /**
//     * @return Category
//     */
//    public function getCategory() {
//        return $this->category;
//    }


    function getBaseScale() {
        return $this->baseScale;
    }

    /**
     * @return string
     */
    public function getName() {
        return $this->name;
    }
    
    function getSoundKey() {
        return $this->soundKey;
    }

    function getString() {
        return $this->string;
    }

    function setBaseScale($baseScale) {
        $this->baseScale = $baseScale;
    }

    /**
     * @param string $name
     */
    public function setName($name) {
        $this->name = $name;
    }

    function setSoundKey($soundKey) {
        $this->soundKey = $soundKey;
    }
    
    function setString($string) {
        $this->string = $string;
    }

}
