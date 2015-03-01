define(['views/forms'], function (forms) {
    var solmiStrings = new Array(
            {"string": "d,-d-d'-d''-d'-d-d,", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'-t-l-s-f-m-r-d", "base_scale": 3},
    {"string": "d-d-r-d-d-r-m-r-d-d-r-m-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-t-d'-t-l-s-f-m-r", "base_scale": 3},
    {"string": "d-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s-d-d-r-m-f-s-l-s-f-m-r-d-l-d-l-d-d-r-m-f-s-l-t-l-s-f-m-r-d-t-d-t-d-d-r-m-f-s-l-t-d'-t-l-s-f-m-r-d-d'-d-d'", "base_scale": 3},
    {"string": "s,-s,-l,-s,-s,-l,-t,-l,-s,-t,-s,-t,-s,-s,-l,-t,-d-t,-l,-s,-d-s,-d-s,-s,-l,-t,-d-r-d-t,-l,-s,-r-s,-r-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-m-s,-m", "base_scale": 4},
    {"string": "d-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s", "base_scale": 4},
    {"string": "m-m-f-m-m-f-s-f-m-s-m-s-m-m-f-s-l-s-f-m-l-m-l", "base_scale": 4},
    {"string": "s,-s,-l,-s,-s,-l,-t,-l,-s,-s,-l,-t,-d-t,-l,-s,-s,-l,-t,-d-r-d-t,-l,-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-s-f-m-r-d-t,-l,", "base_scale": 3},
    {"string": "r-m-f-s-l-t-d'-t-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-m-r-d-d-r-m-r-d-d-r-d-d", "base_scale": 3},
    {"string": "d-d-r-d-m-d-f-d-s-d-l-d-t-d-d'-r-r-m-r-f-r-s-r-l-r-t-r-d'-r-r'-m-m-f-m-s-m-l-m-t-m-d'-m-r'-m-m'-f-f-s-f-l-f-t-f-d'-f-r'-f-m'-f-f'-s-s-l-s-t-s-d'-s-r'-s-m'-s-f'-s-s'-l-l-t-l-d'-l-r'-l-m'-l-f'-l-s'-l-l'-t-t-d'-t-r'-t-m'-t-f'-t-s'-t-l'-t-t'-d'-d'-r'-d'-m'-d'-f'-d'-s'-d'-l'-d'-t'-d'-d''", "base_scale": 3},
    {"string": "d-d-r-d-m-d-f-d-s-d-l-d-t-d-d'-m-m-f-m-s-m-l-m-t-m-d'-m-r'-m-m'-s-s-l-s-t-s-d'-s-r'-s-m'-s-f'-s-s'-d'-d'-r'-d'-m'-d'-f'-d'-s'-d'-l'-d'-t'-d'-d''", "base_scale": 3},
    {"string": "d-r-m-f-s-l-t-d'-r'-m'-f'-s'-l'-t'-d''-d,,-r,,-m,,-f,,-s,,-l,,-t,,-d,-r,-m,-f,-s,-l,-t,-d", "base_scale": 4},
    {"string": "d,-m,-s,-d-m-s-d'-m'-s'-d''-s'-m'-d'-s-m-d-s,-m,-d,", "base_scale": 4},
    {"string": "d,-r,-m,-d-r-m-d'-r'-m'-d''-m'-r'-d'-m-r-d-m,-r,-d,", "base_scale": 4},
    {"string": "m-ru-di", "base_scale": 4},
    {"string": "m,-ru,-di,", "base_scale": 4},
    {"string": "m'-ru'-di'", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'-d-di-r-ri-mi-f-fi-s-si-l-li-t-d'", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'", "base_scale": 5},
    {"string": "d-r|2-m|0.5-f-s-l-t-d'", "base_scale": 4},
    {"string": "d-r|2-m|0.5-f|4-s|0.25-l|0.125-t-d'", "base_scale": 4},
    {"string": "d,-r,-m,-f,-s,-l,-t,-d", "base_scale": 4},
    {"string": "d'-r'-m'-f'-s'-l'-t'-d''", "base_scale": 4},
    {"string": "d-r,,-m'''-f-s-l'''''-t,,,", "base_scale": 4},
    {"string": "d-r,-m'-f-s'-l'-d,", "base_scale": 4}
    );
    
        /*
     * 
     * @returns {String}
     */
//    function getListOfSolmiStrings() {
//        var list = '';
//        for (var i = 0; i < solmiStrings.length; i++) {
//            list += '<li>' + forms.solmiStringForm(solmiStrings[i]) + '</li>' + "\n";
//        }
//        return list;
//    }
//    return {
//        solmiStrings: solmiStrings,
//        getListOfSolmiStrings: getListOfSolmiStrings()
//    };
});