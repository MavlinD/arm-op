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
  link, fileName, err
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
err = 'err' + rnd

root = T.gid('root')

html = `<div class="container-fluid div2">
<div class="row">
<h3 class="mx-auto p-3 w-100 text-align-center">Сервис выдачи паспортов качества</h3>
<form id="${form}" class="mx-auto px-4 py-2 col-12 col-sm-7 col-md-5 col-lg-4 col-xl-3">
  <div class="form-group">
    <label for="${field_1}">Field-1</label>
    <div class="row">
        <input type="text" required class="form-control col-9" id="${field_1}" aria-describedby="${aria_desc_1}"
       placeholder="${placeholder_1}" value="10">
        <div class="col-3">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_1}"><i class="icon-cancel"></i></button>
        </div>
    </div>
    <small id="${aria_desc_1}" class="form-text text-muted">Describe this field</small>
  </div>
  <div class="form-group">
    <label for="${field_2}">Field-2</label>
    <div class="row">
        <input type="text" required class="form-control col-9" id="${field_2}" aria-describedby="${aria_desc_2}"
       placeholder="${placeholder_2}" value="3333333333">
        <div class="col-3">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_2}"><i class="icon-cancel"></i></button>
        </div>
    </div>
    <small id="${aria_desc_2}" class="form-text text-muted">Describe this field</small>
  </div>
  <button type="submit" class="btn btn-primary mx-auto d-block my-4" data-a="submit" data-r="submit">
  <i id="${loader}" class="d-none icon-spin2 animate-spin"></i>
  <i class="icon-paper-plane"></i>
  Search & Download</button>

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

const query = () => {
  return {
    url: 'http://glass-backend.web.azot.kmr/api',
    type: 'POST',
    data: {
      box: 'LNTR2',
      act: 'lntr',
      wagon: sels.field_1.value,
      consignment: sels.field_2.value,
    },
    success(a) {
      console.log(a.query)
      setTimeout(() => {
        elements.form.setDisable(false)
        sels.loader.classList.add('d-none')
        // debugger
        fileName = `Passport-${sels.field_1.value}-${sels.field_2.value}.pdf`

        if (a.query.wagon !== '0') {
          if (!sels.link) {
            console.log('it found')
            $(sels.form).append(`<div id="${link}" style="display: none;" class="alert alert-info" role="alert">
<a class="my-4" href="http://0.0.0.0:8080/src/tests/fixtures/test.pdf"
download="${fileName}">${fileName}</a></div>
`)
              $(`#${link}`).slideDown('fast')
            sels.link = T.gid(link)
          } else {
            $(`#${link}`).find('a').html(fileName).end().slideDown('fast')
          }
        } else {
          console.log('data not found (!')
          $(sels.form).append(`<div id="${err}" style="display: none;" role="alert" 
class="alert alert-danger"><span>not found</span></div>`)//
          $(`#${link}`).slideUp('fast')
          $(`#${err}`).slideDown('fast')//.delay(1500).slideUp()

        }
      }, 500)
    },
  }
}

const handlers = {

  clear(a) {
    T.gid(a).value = ''
    // console.log(a)
  },

  submit(arg) {
    // args.tst(555)
    // console.log(arg)
    // debugger
    if (sels.field_1.value && sels.field_2.value) {
      elements.form.setDisable(true)
      sels.loader.classList.remove('d-none')
      $(`#${err}`).slideUp('fast')

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

      new T.Query({...query()}).runQuery();
    } else {
      console.warn('empty field')
    }
  }
}

// const args = {
//   tst(arg) {
//     elements.form.setDisable(false)
//     // console.log(arg)
//   }
// }

sels.root.addEventListener("click", Common.facade.run.bind(handlers));
sels.root.addEventListener("submit", Common.facade.run.bind(handlers));


console.log('root is mount')


