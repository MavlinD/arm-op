import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'
// import 'assets/fonts/roboto/roboto.css'; // !!! on in build
// import 'assets/fonts/raleway/raleway.css'; // !!! on in build
// import 'assets/mylibs.scss';
// import 'assets/main.scss';
import 'assets/dev.scss';
// import 'assets/fonts/fontello/css/fontello.css'
// import 'assets/fonts/fontello/css/animation.css'

import './index.scss';
import * as Common from './Common';
import * as T from './Tools';
import {Form} from "./Tools";


// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import * as jsPDF from 'jspdf'
// Default export is a4 paper, portrait, using milimeters for units
// var doc = new jsPDF()
// doc.text('Hello world!', 10, 10)
// doc.save('a4.pdf')


let root, html, rnd, field_1, field_2, aria_desc_1, aria_desc_2, placeholder_1, placeholder_2, root_class, form, loader,
  link, fileName
rnd = Math.round(Math.random() * 1000)
form = 'form' + rnd
field_1 = 'field_1' + rnd
field_2 = 'field_2' + rnd
aria_desc_1 = 'field_3' + rnd
aria_desc_2 = 'field_4' + rnd
placeholder_1 = 'Field-1'
placeholder_2 = 'Field-2'
root_class = 'root' + rnd
loader = 'loader' + rnd
link = 'link' + rnd

root = T.gid('root')

html = `<div class="container-fluid div2">
<div class="row">
<h3 class="mx-auto p-3 w-100 text-align-center">Сервис выдачи паспортов качества</h3>
<form id="${form}" class="mx-auto p-4 col-12 col-sm-7 col-md-5 col-lg-4 col-xl-3 form-inline22">
  <div class="form-group">
    <label for="${field_1}">Field-1</label>
    <div class="row">
        <input type="text" class="form-control col-9" id="${field_1}" aria-describedby="${aria_desc_1}"
       placeholder="${placeholder_1}" value="1111111111">
        <div class="col-3">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_1}"><i class="icon-cancel"></i></button>
        </div>
    </div>
  </div>
  <div class="form-group">
    <label for="${field_2}">Field-2</label>
    <div class="row">
        <input type="text" class="form-control col-9" id="${field_2}" aria-describedby="${aria_desc_2}"
       placeholder="${placeholder_2}" value="3333333333">
        <div class="col-3">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_2}"><i class="icon-cancel"></i></button>
        </div>
    </div>
    <small id="${aria_desc_2}" class="form-text text-muted">Describe this field</small>
  </div>
<!--  <div class="form-group col-3">-->
<!--     <button>+++</button>-->
<!--  </div>-->
<!--  </div>-->
  <button type="submit" class="btn btn-primary mx-auto d-block" data-a="submit" data-r="submit">
  <i id="${loader}" class="d-none icon-spin2 animate-spin"></i>
  <i class="icon-paper-plane"></i>
  Search & Download</button>
<!--  <button></button>-->

</form>
</div></div>`
// https://www.philowen.co/blog/force-a-file-to-download-when-link-is-clicked/
root.innerHTML = html

const sels = {
  root,
  form: T.gid(form),
  loader: T.gid(loader),
  field_1: T.gid(field_1),
  field_2: T.gid(field_2),

}

const elements = {
  form: new Form(sels.form)
}

const query = {
  url: 'http://glass-backend.web.azot.kmr',
  type: 'POST',
  // url: 'http://0.0.0.0:8080/src/tests/fixtures/Test.pdf',
  // method: 'GET',
  // typeResp: 'pdf',
  data: {
    wagon: 1111111,
    consignment: 22222
  }
  // url: 'https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1'
}

const handlers = {

  clear(a){
    T.gid(a).value=''
    console.log(a)
  },

  async submit(arg) {
    // args.tst(555)
    // debugger
    elements.form.setDisable(true)
    sels.loader.classList.remove('d-none')

    // let response = await fetch('http://0.0.0.0:8080/src/tests/fixtures/test.pdf');
    // let blob = await response.blob(); // скачиваем как Blob-объект
    // console.log(blob)
    // const file = new Blob(
    //   [blob],
    //   {type: 'application/pdf'});

    //Build a URL from the file
// const fileURL = URL.createObjectURL(file);
//Open the URL on new Window
// window.open(fileURL);

    setTimeout(() => {
      new T.Fetch(query).run().then(response => {
        // console.log(response)
        elements.form.setDisable(false)
        sels.loader.classList.add('d-none')
        // debugger
        fileName = `Passport-${sels.field_1.value}-${sels.field_2.value}.pdf`
        if (!sels.link) {

          $(sels.form).append(`<div id="${link}" style="display: none;" class="w-100 d-flex justify-content-center">
<a class="mt-4" href="http://0.0.0.0:8080/src/tests/fixtures/test.pdf"
download="${fileName}">${fileName}</a></div>
`).find(`#${link}`).slideDown('fast')
          sels.link = T.gid(link)

        } else {
          // console.log(fileName)
          $(`#${link}`).find('a').html(fileName)
        }
      }).then(() => {
        setTimeout(() => {
          // console.log($(`#${link}`))
          // $(`#${link}`).slideUp()
          // $(sels.link).slideDown()
        }, 1500)
      })
    }, 0)
    // console.log($(form))

  }
}

const args = {
  tst(arg) {
    elements.form.setDisable(false)
    console.log(arg)
  }
}

sels.root.addEventListener("click", Common.facade.run.bind(handlers));
sels.root.addEventListener("submit", Common.facade.run.bind(handlers));


console.log(T.gid('root'))


