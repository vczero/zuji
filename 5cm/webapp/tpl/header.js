/*TMODJS:{"version":14,"md5":"c1e610e03f26520eb055c62f112a3547"}*/
define(function(require) {
    return require("./template")("header", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), title = $data.title, $out = "";
        return $out += ' <header> <div class="header"> <div id="header_back" class="cursor_po"></div> <div id="header_title" class="cursor_po">', 
        $out += $escape(title), $out += "</div> </div> </header> ", new String($out);
    });
});