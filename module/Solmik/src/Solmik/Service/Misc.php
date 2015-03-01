<?php

namespace Solmik\Service;

class Misc {

    static function getSoundKeys() {
        return self::getSoundKeysMajor() + self::getSoundKeysMinor();
    }

    static function getSoundKeysMajor() {
//        return array(1 => 'C', 2 => 'Des', 3 => 'D', 4 => 'Es', 5 => 'E', 6 => 'F', 8 => 'G', 9 => 'As', 10 => 'A', 11 => 'B', 12 => 'H');
        return array('C' => 'C', 'Des' => 'Des', 'D' => 'D', 'Es' => 'Es', 'E' => 'E', 'F' => 'F', 'G' => 'G', 'As' => 'As', 'A' => 'A', 'B' => 'B', 'H' => 'H');
    }

    static function getSoundKeysMinor() {
//        return array(101 => 'c', 102 => 'cis', 103 => 'd', 105 => 'e', 106 => 'f', 107 => 'fis', 108 => 'g', 109 => 'gis', 110 => 'a', 111 => 'b', 102 => 'h');
        return array('c' => 'c', 'cis' => 'cis', 'd' => 'd', 'e' => 'e', 'f' => 'f', 'fis' => 'fis', 'g' => 'g', 'gis' => 'gis', 'a' => 'a', 'b' => 'b', 'h' => 'h');
    }

}
