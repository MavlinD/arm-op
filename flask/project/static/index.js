!function(t){function e(e){for(var n,i,o=e[0],l=e[1],d=e[2],u=0,f=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&f.push(s[i][0]),s[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);for(c&&c(e);f.length;)f.shift()();return r.push.apply(r,d||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,o=1;o<a.length;o++){var l=a[o];0!==s[l]&&(n=!1)}n&&(r.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},s={0:0},r=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/static/";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var d=0;d<o.length;d++)e(o[d]);var c=l;r.push([6,1]),a()}([,,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){t.exports=a.p+"fixtures/Паспорт-ФБ123456789-ПЯ123456.pdf"},function(t,e,a){"use strict";a.r(e);a(1);var n=a(0),s=a.n(n);a(2),a(3),a(4);console.log("Common");const r={run:function(t,e,a){try{let e,a,n=t;if(null===n)return;if(void 0===n)return;if("submit"===n.type)return n.preventDefault();if("input"===n.type)return void(n.target&&void 0!==n.target.closest&&(a=n.target.closest([".i"]),a&&a&&a.dataset.r&&a.dataset.a&&(console.log(`${a.dataset.r}, ${a.dataset.a}`),"this"===a.dataset.a?this[a.dataset.r](a):this[a.dataset.r](a.dataset.a))));if("click"===n.type){if(a=n.target.closest(["button, a"]),a){if(a.hasAttribute("disabled"))return;a.dataset.r&&(t=>{if("function"==typeof t)return!0})(this[a.dataset.r])&&this[a.dataset.r](a.dataset.a)}if("INPUT"===n.target.tagName||"TEXTAREA"===n.target.tagName)return;return void("IMG"===n.target.tagName&&n.preventDefault())}if("string"==typeof t)return void console.log(t);if("object"!=typeof t)return;if(e=t,e&&e.dataset.r&&e.dataset.a)if(console.log(`${e.dataset.r}, ${e.dataset.a}`),"this"===e.dataset.a)this[e.dataset.r](e);else try{let t=JSON.parse(e.dataset.a);this[e.dataset.r](t)}catch(t){this[e.dataset.r](e.dataset.a)}}catch(t){if(10===t.code)return void console.warn(t.message);console.error(t)}}};function i(t){return document.getElementById(t)}function o(t){this.string=t.string||"",this.method=t.method||"post",this.body=t.body,this.typeResp=t.typeResp||"json",this.credentials=t.credentials||"include",this.url=()=>"get"===this.method.toLowerCase()?t.url+this.string:t.url,this.run=()=>new Promise((t,e)=>{fetch(this.url(),{method:this.method,body:"POST"===this.method?JSON.stringify(this.body):null,headers:{"Content-Type":"application/json"}}).then(t=>"json"===this.typeResp?t.text():t[this.typeResp]()).then(t=>"json"===this.typeResp?JSON.parse(t,this.reviver):t).then(e=>{e.xdebug_message?console.warn(e.data+" in file: "+e.file+" in line: "+e.line):t(e)}).catch(t=>{e(t)})}),this.reviver=(t,e)=>null===e?"":e}let l=function(t){t instanceof HTMLElement?this.form=t:this.form=i(t),this.valid=0,this.submitButt=this.form.querySelector('button[type="submit"]'),this.inputs=this.form.querySelectorAll("textarea, input"),this.inputsAll=this.form.querySelectorAll("input, textarea, button, select"),this.data={},this.name=this.form.name};l.prototype.setDisable=function(t){for(let e in this.inputsAll)this.inputsAll.hasOwnProperty(e)&&(this.inputsAll[e].disabled=t)},l.prototype.getData=function(){let t,e={},a=this.inputs;for(let n=0;n<a.length;++n){if(t=a[n],(t.name||t.dataset.name)&&t.innerHTML)switch(t.tagName){case"P":case"DIV":case"SPAN":e[t.dataset.name]=t.innerHTML;break;case"SELECT":e[t.name||t.dataset.name]=t.value;break;case"UL":let a=t.childNodes,n=[];for(let t=0;t<a.length;++t){let e=a[t].dataset.id||a[t].dataset.name;a.hasOwnProperty(t)&&e&&(n=n.concat(e))}a.length&&(e[t.dataset.name]=n)}switch("checkbox"===t.type&&t.checked&&(e[t.name]=1),"checkbox"===t.type&&!1===t.checked&&(e[t.name]=0),"radio"===t.type&&t.checked&&(e[t.name]=t.value),"date"===t.type&&(e[t.name]=t.value),"number"===t.type&&(e[t.name]=t.value),t.type){case"text":case"password":case"email":case"textarea":"number"===t.dataset.type?e[t.name]=t.value.replace(/\s+/g,""):t.value&&(e[t.name]=t.value)}}return this.data=e,this.data};class d{constructor(t){this.url=t.url||"init.php",this.type=t.type||"GET","string"==typeof t.data?this.data=JSON.parse(t.data):this.data=t.data,this.success=t.success,this.error=t.error}runQuery(t){new o({url:this.url,body:"POST"===this.type?this.data:null,method:this.type}).run().then(t=>{var e;"function"==typeof this.success&&0===t.code?this.success(t):"function"==typeof this.error?this.error(t.errors):(e=t,console.log(e))})}}a(5);document.addEventListener("DOMContentLoaded",()=>{let t,e,a,n,o,c,u,f,p,h,m,y,b,v,g;n=Math.round(1e3*Math.random()),m="form"+n,o="field_1"+n,c="field_2"+n,u="field_3"+n,f="field_4"+n,p="№ накладной",h="№ вагона или контейнера",y="loader"+n,b="link"+n,g="err"+n,e="root"+n,t=i(e),t||(document.body.insertAdjacentHTML("afterbegin",`<div id="${e}"></div>`),t=i(e)),a=`<div class="container-fluid div2">\n<div class="row mx-auto">\n<h3 class="mx-auto p-3 w-100 text-center">Паспорт качества</h3>\n<h3 class="mx-auto p-3 w-100 text-center">Для получения Паспорт качества на продукцию</h3>\n<form id="${m}" class="mx-auto px-4 py-2 col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4">\n  <div class="form-group">\n    <label for="${o}">№ накладной</label>\n    <div class="row mx-0">\n        <input type="text" required class="form-control col" id="${o}" aria-describedby="${u}"\n       placeholder="№ накладной" value="ФБ123456789">\n        <div class="col-auto">\n            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${o}"><i class="icon-cancel"></i></button>\n        </div>\n    </div>\n\x3c!--    <small id="${u}" class="form-text text-muted">Describe this field</small>--\x3e\n  </div>\n  <div class="form-group">\n    <label for="${c}">№ вагона или контейнера</label>\n    <div class="row mx-0">\n        <input type="text" required class="form-control col" id="${c}" aria-describedby="${f}"\n       placeholder="№ вагона или контейнера" value="ПЯ123456">\n        <div class="col-auto">\n            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${c}"><i class="icon-cancel"></i></button>\n        </div>\n    </div>\n\x3c!--    <small id="${f}" class="form-text text-muted">Describe this field</small>--\x3e\n  </div>\n  <button type="submit" class="btn btn-primary px-5 mx-auto d-block my-4" data-a="submit" data-r="submit">\n  <i id="${y}" class="d-none icon-spin2 animate-spin"></i>\n  <i class="icon-paper-plane"></i>\n  Получить паспорт</button>\n\n</form>\n</div></div>`,t.innerHTML=a;const x={root:t,form:i(m),loader:i(y),field_1:i(o),field_2:i(c)},w={form:new l(x.form)},$={clear(t){i(t).value=""},submit(t){x.field_1.value&&x.field_2.value?(w.form.setDisable(!0),x.loader.classList.remove("d-none"),s()(`#${g}`).slideUp("fast"),new d({url:"/api",type:"POST",data:{wagon_or_container:x.field_1.value,consignment:x.field_2.value},success(t){setTimeout(()=>{w.form.setDisable(!1),x.loader.classList.add("d-none"),v=`Паспорт-${x.field_1.value}-${x.field_2.value}.pdf`,t.data.is_file_exists?x.link?s()(`#${b}`).find("a").html(v).end().slideDown("fast"):(s()(x.form).append(`<div id="${b}" style="display: none;" class="alert alert-info" role="alert">\n<a class="my-4" href="http://arm-pq.web.azot.kmr/${t.data.path_to_file}"\ndownload="${t.data.path_to_file}">${v}</a></div>`),s()(`#${b}`).slideDown("fast"),x.link=i(b)):(console.log("data not found (!"),s()(x.form).append(`<div id="${g}" style="display: none;" role="alert" \nclass="alert alert-danger"><span>Запрашиваемый ${v} не найден по одной из нижеследующих причин:</br>\n<ul>\n<li>Некорректно введены данные в полях "№ накладной" и/или "№ вагона".\nПроверьте правильность данных и повторите запрос.</li>\n<li>На текущий момент ${v} не сформирован.</li>\n</ul>\n</span></div>`),s()(`#${b}`).slideUp("fast"),s()(`#${g}`).slideDown("fast"))},1e3)},error(t){setTimeout(()=>{console.log(t);let e="";for(let[a,n]of Object.entries(t))e+=`${a}: ${n}`;s()("#pq_err").html(e).slideDown("fast").delay(1500).slideUp("fast"),w.form.setDisable(!1),x.loader.classList.add("d-none")},1e3)}}).runQuery()):console.warn("empty field")}};x.root.addEventListener("click",r.run.bind($)),x.root.addEventListener("submit",r.run.bind($)),console.log("arm-pq root is mount")})}]);