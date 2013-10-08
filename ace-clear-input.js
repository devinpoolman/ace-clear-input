/*
 * Based on angular-clearable
 *
 * Copyright (c) 2013 Giacomo Antolini <giacomo.antolini@gmail.com>
 * All rights reserved.
 *
 * This file is part of angular-clearable.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */



angular.module('appglu.ace-clear-input', []).
directive('aceClearInput', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            compile: function(tElement, tAttrs) {

                var clearClass = 'icon-remove',
                	buttonSize,
                    divClass = 'parent_'+clearClass;

            	if (tAttrs['aceClearInput']) {
            		clearClass = tAttrs['aceClearInput'];
            	}

                if (!tElement.parent().hasClass(divClass)) {
                    buttonSize = tElement.outerHeight()+'px';
                    tElement.wrap('<div style="position: relative;" class="' + divClass + '">' + tElement.html() + '</div>');
                    tElement.after('<button style="position: absolute;right:0px;background-color: rgba(0, 0, 0, 0);top:0px;border:0;height:'+buttonSize+';width:'+buttonSize+';cursor: pointer;" tabindex="-1" class="' + clearClass + '"></button>');
                    tElement.css('padding-right',buttonSize);

                    // @TODO: handle resizing and orientation changes
                    tElement.parent().css('height',buttonSize);
                    tElement.parent().css('width',tElement.outerWidth());

                    var btn = tElement.next();
                    return function(scope, iElement, iAttrs) {
                        if (iElement[0].tagName == 'DIV') {
                            var text = angular.element(iElement.children()[0]);

                            btn.bind('click', function(e) {
                                text.val('');
                                text.triggerHandler('input');
                                e.preventDefault();
                            });

                            scope.$watch(iAttrs.ngModel, function (v) {
                                if (v && v.length > 0) {
                                    btn.css('display', 'block');
                                } else {
                                    btn.css('display', 'none');
                                }
                            });
                        }
                    }
                }
            }
        }
});
