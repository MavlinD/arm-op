!function(e){function t(t){for(var n,i,o=t[0],l=t[1],d=t[2],u=0,f=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&f.push(s[i][0]),s[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(c&&c(t);f.length;)f.shift()();return r.push.apply(r,d||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],n=!0,o=1;o<a.length;o++){var l=a[o];0!==s[l]&&(n=!1)}n&&(r.splice(t--,1),e=i(i.s=a[0]))}return e}var n={},s={0:0},r=[];function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/static/";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var c=l;r.push([6,1]),a()}([,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){e.exports=a.p+"passports/Паспорт-ФБ1234567-ПЯ123456.pdf"},function(e,t,a){"use strict";a.r(t);a(1);var n=a(0),s=a.n(n);a(2),a(3),a(4);console.log("Common");const r={run:function(e,t,a){try{let t,a,n=e;if(null===n)return;if(void 0===n)return;if("submit"===n.type)return n.preventDefault();if("input"===n.type)return void(n.target&&void 0!==n.target.closest&&(a=n.target.closest([".i"]),a&&a&&a.dataset.r&&a.dataset.a&&(console.log(`${a.dataset.r}, ${a.dataset.a}`),"this"===a.dataset.a?this[a.dataset.r](a):this[a.dataset.r](a.dataset.a))));if("click"===n.type){if(a=n.target.closest(["button, a"]),a){if(a.hasAttribute("disabled"))return;a.dataset.r&&(e=>{if("function"==typeof e)return!0})(this[a.dataset.r])&&this[a.dataset.r](a.dataset.a)}if("INPUT"===n.target.tagName||"TEXTAREA"===n.target.tagName)return;return void("IMG"===n.target.tagName&&n.preventDefault())}if("string"==typeof e)return void console.log(e);if("object"!=typeof e)return;if(t=e,t&&t.dataset.r&&t.dataset.a)if(console.log(`${t.dataset.r}, ${t.dataset.a}`),"this"===t.dataset.a)this[t.dataset.r](t);else try{let e=JSON.parse(t.dataset.a);this[t.dataset.r](e)}catch(e){this[t.dataset.r](t.dataset.a)}}catch(e){if(10===e.code)return void console.warn(e.message);console.error(e)}}};function i(e){return document.getElementById(e)}let o=function(e){e instanceof HTMLElement?this.form=e:this.form=i(e),this.valid=0,this.submitButt=this.form.querySelector('button[type="submit"]'),this.inputs=this.form.querySelectorAll("textarea, input"),this.inputsAll=this.form.querySelectorAll("input, textarea, button, select"),this.data={},this.name=this.form.name};o.prototype.setDisable=function(e){for(let t in this.inputsAll)this.inputsAll.hasOwnProperty(t)&&(this.inputsAll[t].disabled=e)},o.prototype.getData=function(){let e,t={},a=this.inputs;for(let n=0;n<a.length;++n){if(e=a[n],(e.name||e.dataset.name)&&e.innerHTML)switch(e.tagName){case"P":case"DIV":case"SPAN":t[e.dataset.name]=e.innerHTML;break;case"SELECT":t[e.name||e.dataset.name]=e.value;break;case"UL":let a=e.childNodes,n=[];for(let e=0;e<a.length;++e){let t=a[e].dataset.id||a[e].dataset.name;a.hasOwnProperty(e)&&t&&(n=n.concat(t))}a.length&&(t[e.dataset.name]=n)}switch("checkbox"===e.type&&e.checked&&(t[e.name]=1),"checkbox"===e.type&&!1===e.checked&&(t[e.name]=0),"radio"===e.type&&e.checked&&(t[e.name]=e.value),"date"===e.type&&(t[e.name]=e.value),"number"===e.type&&(t[e.name]=e.value),e.type){case"text":case"password":case"email":case"textarea":"number"===e.dataset.type?t[e.name]=e.value.replace(/\s+/g,""):e.value&&(t[e.name]=e.value)}}return this.data=t,this.data};class l{constructor(e){this.form=i(e.form),this.lenSens=e.lenSens,this.btnSubmit=i(e.btnSubmit),this.inputs=e.inputs,this.errArea="",this.listeners=(e.listeners||"keypress keydown keyup").split(" "),this.valid=!1,this.listenOn=this.listenOn.bind(this)}listenOn(){this.listeners.forEach(e=>{for(let[t,a]of Object.entries(this.inputs))i(t).addEventListener(e,e=>{e.target.value.length>this.lenSens&&(this.errArea=i(a.errArea),a.regex.test(e.target.value)?(e.target.classList.remove("invalid"),this.errArea.classList.add("d-none"),this.btnSubmit.removeAttribute("disabled"),this.valid=!0):(e.target.classList.add("invalid"),this.errArea.innerHTML=a.message,this.errArea.classList.remove("d-none"),this.btnSubmit.setAttribute("disabled","disabled"),this.valid=!1))})})}}a(5);document.addEventListener("DOMContentLoaded",()=>{let e,t,a,n,d,c,u,f,p,m,h,b,v,y,g,$;n=Math.round(1e3*Math.random()),h="form"+n,d="field_1"+n,c="field_2"+n,u="field_3"+n,f="field_4"+n,p="№ накладной",m="№ вагона или контейнера",b="loader"+n,v="link"+n,g="err"+n,t="root"+n,$="btn"+n,e=i(t),e||(document.body.insertAdjacentHTML("afterbegin",`<div id="${t}"></div>`),e=i(t)),a=`<div class="container-fluid div2">\n<div class="row mx-auto">\n<h3 class="mx-auto p-3 w-100 text-center">Паспорт качества</h3>\n<h3 class="mx-auto p-3 w-100 text-center">Для получения Паспорт качества на продукцию</h3>\n<form id="${h}" class="passpq mx-auto px-4 py-2 col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4">\n  <div class="form-group">\n    <label for="${d}">№ накладной</label>\n    <div class="row mx-0">\n        <input type="text" name="wagon_or_container" required class="form-control col wagon_or_container" id="${d}" aria-describedby="${u}"\n       placeholder="№ накладной" value="ФБ1234567">\n        <div class="col-auto">\n            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${d}"><i class="icon-cancel"></i></button>\n        </div>\n    </div>\n    <small id="${u}" class="form-text d-none alert alert-danger border-0 p-2 px-3 rounded-0 mt-2" role="alert">Validate this field</small>\n  </div>\n  <div class="form-group">\n    <label for="${c}">№ вагона или контейнера</label>\n    <div class="row mx-0">\n        <input type="text" required class="form-control col" id="${c}" aria-describedby="${f}"\n       placeholder="№ вагона или контейнера" value="ПЯ123456">\n        <div class="col-auto">\n            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${c}"><i class="icon-cancel"></i></button>\n        </div>\n    </div>\n    <small id="${f}" class="form-text d-none alert alert-danger border-0 p-2 px-3 rounded-0 mt-2" role="alert">Validate this field</small>\n  </div>\n  <button id="${$}" type="submit" autofocus class="btn btn-primary px-5 mx-auto d-block my-4" data-a="submit" data-r="submit" disabled="disabled">\n  <i id="${b}" class="d-none icon-spin2 animate-spin"></i>\n  <i class="icon-paper-plane"></i>\n  Получить паспорт</button>\n<div id="${g}" style="display: none;" role="alert" class="alert alert-danger"></div>\n</form>\n</div></div>`,e.innerHTML=a;let x=new l({form:h,btnSubmit:$,lenSens:5,inputs:{[d]:{regex:/^([А-Я]{2,4}\d{7})$/u,errArea:u,message:"данные должны соответствовать маске АБ1234567 или АБВГ1234567"},[c]:{regex:/^([А-Я]{2}\d{6})$/u,errArea:f,message:"данные должны соответствовать маске АБ123456"}}});x.listenOn();const w={root:e,form:i(h),loader:i(b),field_1:i(d),field_2:i(c)},_={form:new o(w.form)},O={clear(e){i(e).value=""},submit(e){if(x.valid)if(w.field_1.value&&w.field_2.value){_.form.setDisable(!0),w.loader.classList.remove("d-none"),s()(`#${g}`).slideUp("fast");let e={url:"/api/",method:"POST",data:{select:"Passport",mode:{get_file:{wagon_or_container:w.field_1.value,consignment:w.field_2.value}}},success(e){console.log(e.data),setTimeout(()=>{if(_.form.setDisable(!1),w.loader.classList.add("d-none"),y=`Паспорт-${w.field_1.value}-${w.field_2.value}.pdf`,e.data.is_file_exists)w.link?s()(`#${v}`).find("a").html(y).end().slideDown("fast"):(s()(w.form).append(`<div id="${v}" style="display: none;" class="alert alert-info" role="alert">\n<a class="my-4" href="${document.location.href}${e.data.path_to_file}"\ndownload="${e.data.path_to_file}">${y}</a></div>`),s()(`#${v}`).slideDown("fast"),w.link=i(v));else{console.log("data not found (!");let e=i(g),t=`<span>Запрашиваемый ${y} не найден по одной из нижеследующих причин:</br>\n<ul>\n<li>Некорректно введены данные в полях "№ накладной" и/или "№ вагона".\nПроверьте правильность данных и повторите запрос.</li>\n<li>На текущий момент ${y} не сформирован.</li>\n</ul></span>`;e&&(e.innerHTML=t),s()(`#${v}`).slideUp("fast"),s()(`#${g}`).slideDown("fast")}},0)},error(e){setTimeout(()=>{console.log(e);let t="";for(let[a,n]of Object.entries(e))t+=`${a}: ${n}`;s()("#pq_err").html(t).slideDown("fast").delay(1500).slideUp("fast"),_.form.setDisable(!1),w.loader.classList.add("d-none")},1e3)}},t=new FormData;t.set("payload",JSON.stringify(e.data)),fetch(e.url,{...e,body:t}).then(e=>(console.log("response"),e.json())).then(t=>{console.log(t),e.success(t)}).catch(t=>{e.error(t)})}else console.warn("empty field")}};w.root.addEventListener("click",r.run.bind(O)),w.root.addEventListener("submit",r.run.bind(O)),console.log("arm-pq root is mount")})}]);