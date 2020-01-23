import 'bootstrap/dist/css/bootstrap.min.css';
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
  link
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
<form id="${form}" class="mx-auto col-12 col-sm-7 col-md-5 col-lg-4 col-xl-3">
  <div class="form-group">
    <label for="${field_1}">Field-1</label>
    <input type="text" class="form-control" id="${field_1}" aria-describedby="${aria_desc_1}" 
    placeholder="${placeholder_1}" value="11111111111">
    <small id="${aria_desc_1}" class="form-text text-muted">Describe this field</small>
  </div>
  <div class="form-group">
    <label for="${field_2}">Field-2</label>
    <input type="text" class="form-control" id="${field_2}" aria-describedby="${aria_desc_2}"
     placeholder="${placeholder_2}" value="3333333333">
    <small id="${aria_desc_2}" class="form-text text-muted">Describe this field</small>
  </div>
  <button type="submit" class="btn btn-primary mx-auto d-block" data-a="submit" data-r="submit">
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
        console.log(response)
        elements.form.setDisable(false)
        sels.loader.classList.add('d-none')
        // debugger
        if (!sels.link) {
          sels.form.insertAdjacentHTML('afterend',
            `<div class="w-100 d-flex justify-content-center py-3"><a id="${link}" href="http://0.0.0.0:8080/src/tests/fixtures/test.pdf" 
download="Passport-${sels.field_1.value}-${sels.field_2.value}.pdf">Passport-${sels.field_1.value}-${sels.field_2.value}.pdf</a></div>
`)
          sels.link = T.gid(link)
        }
      })
    }, 0)
    // console.log(arg)

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


