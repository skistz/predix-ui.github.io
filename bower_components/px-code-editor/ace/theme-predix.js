/*
 * Copyright (c) 2014 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 *
 * Based on code released by Ajax.org B.V.. See applicable license for original
 * code below:
 *
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * NOTE: This is a source file that will be built by the gulp task `gulp editor`
 * with its final production-ready form placed at ace/theme-predix.js.
 */
ace.define("ace/theme/predix", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
  t.isDark = !0;
  t.cssClass = "ace-predix";
  t.cssText = ".ace-predix .ace_gutter{background:#23343f;color:#748b99}.ace-predix .ace_print-margin{width:1px;background:#23343f}.ace-predix{background-color:#05090c;color:#b6c3cc}.ace-predix .ace_cursor{color:#ebeff2}.ace-predix .ace_marker-layer .ace_selection{background:#1b2a33}.ace-predix.ace_multiselect .ace_selection.ace_start{box-shadow:0 0 3px 0 #4c6472}.ace-predix .ace_marker-layer .ace_step{background:#665200}.ace-predix .ace_marker-layer .ace_bracket{margin:-1px 0 0 -1px;border:1px solid #49483E}.ace-predix .ace_marker-layer .ace_active-line{background:#23343f}.ace-predix .ace_gutter-active-line{background-color:#0c1419}.ace-predix .ace_marker-layer .ace_selected-word{border:1px solid #49483E}.ace-predix .ace_invisible{color:#52524d}.ace-predix .ace_entity.ace_name.ace_tag,.ace-predix .ace_keyword,.ace-predix .ace_meta.ace_tag,.ace-predix .ace_storage{color:#ff2db0}.ace-predix .ace_punctuation,.ace-predix .ace_punctuation.ace_tag{color:#a3b5bf}.ace-predix .ace_constant.ace_character,.ace-predix .ace_constant.ace_language,.ace-predix .ace_constant.ace_numeric,.ace-predix .ace_constant.ace_other{color:#2ec4f8}.ace-predix .ace_invalid{color:#F8F8F0;background-color:#F92672}.ace-predix .ace_invalid.ace_deprecated{color:#F8F8F0;background-color:#AE81FF}.ace-predix .ace_support.ace_constant,.ace-predix .ace_support.ace_function{color:#66D9EF}.ace-predix .ace_fold{background-color:#A6E22E;border-color:#F8F8F2}.ace-predix .ace_storage.ace_type,.ace-predix .ace_support.ace_class,.ace-predix .ace_support.ace_type{font-style:italic;color:#2ec4f8}.ace-predix .ace_entity.ace_name.ace_function,.ace-predix .ace_entity.ace_other,.ace-predix .ace_entity.ace_other.ace_attribute-name,.ace-predix .ace_variable{color:#958efe}.ace-predix .ace_variable.ace_parameter{font-style:italic;color:#f7882c}.ace-predix .ace_string{color:#fff}.ace-predix .ace_comment{color:#59717f}.ace-predix .ace_indent-guide{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y}";
  var r = e("../lib/dom");
  r.importCssString(t.cssText, t.cssClass);
});
