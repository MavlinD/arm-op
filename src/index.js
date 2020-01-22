import 'bootstrap/dist/css/bootstrap.min.css';
// import 'assets/fonts/roboto/roboto.css'; // !!! on in build
// import 'assets/fonts/raleway/raleway.css'; // !!! on in build
// import 'assets/mylibs.scss';
// import 'assets/main.scss';
import 'assets/dev.scss';

import './index.scss';
import * as Common from './Common';
import * as T from './Tools';


let html='', root, rnd, field_1, field_2, field_3, field_4, placeholder_1, placeholder_2, root_class
rnd=Math.round(Math.random()*1000)
field_1 = 'field_1' + rnd
field_2 = 'field_2' + rnd
field_3 = 'field_3' + rnd
field_4 = 'field_4' + rnd
placeholder_1 = 'Field-1'
placeholder_2 = 'Field-2'
root_class = 'root' + rnd

root = T.gid('root')

html=`<div class="container-fluid div2">
<div class="row">
<form class="mx-auto col-12 col-sm-7 col-md-5 col-lg-4 col-xl-3">
  <div class="form-group">
    <label for="${field_1}">Field-1</label>
    <input type="text" class="form-control" id="${field_1}" aria-describedby="${field_3}" placeholder="${placeholder_1}">
    <small id="${field_3}" class="form-text text-muted">Describe this field</small>
  </div>
  <div class="form-group">
    <label for="${field_2}">Field-2</label>
    <input type="text" class="form-control" id="${field_2}" aria-describedby="${field_4}" placeholder="${placeholder_2}">
    <small id="${field_4}" class="form-text text-muted">Describe this field</small>
  </div>
  <button type="submit" class="btn btn-primary" data-a="tst" data-r="submit">Search & Download</button>
</form></div></div>`

root.innerHTML = html

const handlers ={
  submit(arg){
    args.tst(555)
    console.log(arg)
  }
}

const args ={
  tst(arg){
    console.log(arg)
  }
}

// root.addEventListener("click", Common.facade.bind(this).run);
root.addEventListener("click", Common.facade.run.bind(handlers));
root.addEventListener("submit", Common.facade.run.bind(handlers));



console.log(T.gid('root'))


