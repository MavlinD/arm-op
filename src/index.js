import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'
import 'assets/fonts/roboto/roboto.css'; // !!! on in build
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

import 'src/tests/fixtures/Паспорт-ФБ123456789-ПЯ123456.pdf'


// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import * as jsPDF from 'jspdf'
// Default export is a4 paper, portrait, using milimeters for units
// var doc = new jsPDF()
// doc.text('Hello world!', 10, 10)
// doc.save('a4.pdf')

const Run = () => {
    let root, root_id, html, rnd, field_1, field_2, aria_desc_1, aria_desc_2, placeholder_1, placeholder_2, root_class,
        form, loader,
        link, fileName, err
    rnd = Math.round(Math.random() * 1000)
    form = 'form' + rnd
    field_1 = 'field_1' + rnd
    field_2 = 'field_2' + rnd
    aria_desc_1 = 'field_3' + rnd
    aria_desc_2 = 'field_4' + rnd
    placeholder_1 = '№ накладной'
    placeholder_2 = '№ вагона или контейнера'
    loader = 'loader' + rnd
    link = 'link' + rnd
    err = 'err' + rnd
    root_id = 'root' + rnd

    root = T.gid(root_id)
    if (!root) {
        document.body.insertAdjacentHTML('afterbegin', `<div id="${root_id}"></div>`)
        root = T.gid(root_id)
    }

    html = `<div class="container-fluid div2">
<div class="row mx-auto">
<h3 class="mx-auto p-3 w-100 text-center">Паспорт качества</h3>
<h3 class="mx-auto p-3 w-100 text-center">Для получения Паспорт качества на продукцию</h3>
<form id="${form}" class="mx-auto px-4 py-2 col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4">
  <div class="form-group">
    <label for="${field_1}">№ накладной</label>
    <div class="row mx-0">
        <input type="text" required class="form-control col" id="${field_1}" aria-describedby="${aria_desc_1}"
       placeholder="${placeholder_1}" value="ФБ123456789">
        <div class="col-auto">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_1}"><i class="icon-cancel"></i></button>
        </div>
    </div>
<!--    <small id="${aria_desc_1}" class="form-text text-muted">Describe this field</small>-->
  </div>
  <div class="form-group">
    <label for="${field_2}">№ вагона или контейнера</label>
    <div class="row mx-0">
        <input type="text" required class="form-control col" id="${field_2}" aria-describedby="${aria_desc_2}"
       placeholder="${placeholder_2}" value="ПЯ123456">
        <div class="col-auto">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_2}"><i class="icon-cancel"></i></button>
        </div>
    </div>
<!--    <small id="${aria_desc_2}" class="form-text text-muted">Describe this field</small>-->
  </div>
  <button type="submit" class="btn btn-primary px-5 mx-auto d-block my-4" data-a="submit" data-r="submit">
  <i id="${loader}" class="d-none icon-spin2 animate-spin"></i>
  <i class="icon-paper-plane"></i>
  Получить паспорт</button>

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
            url: '/api',
            type: 'POST',
            data: {
                wagon_or_container: sels.field_1.value,
                consignment: sels.field_2.value,
            },
            success(a) {
                console.log(a.data)
                setTimeout(() => {
                    elements.form.setDisable(false)
                    sels.loader.classList.add('d-none')
                    // debugger
                    fileName = `Паспорт-${sels.field_1.value}-${sels.field_2.value}.pdf`

                    if (a.data['is_file_exists']) {
                        // if (a.query.wagon_or_container !== '0') {
                        console.log(a.query)
                        if (!sels.link) {
                            // console.log('it found')
                            $(sels.form).append(`<div id="${link}" style="display: none;" class="alert alert-info" role="alert">
<a class="my-4" href="http://arm-pq.web.azot.kmr/${a.data['path_to_file']}"
download="${a.data['path_to_file']}">${fileName}</a></div>`)
                            $(`#${link}`).slideDown('fast')
                            sels.link = T.gid(link)
                        } else {
                            $(`#${link}`).find('a').html(fileName).end().slideDown('fast')
                        }
                    } else {
                        console.log('data not found (!')
                        $(sels.form).append(`<div id="${err}" style="display: none;" role="alert" 
class="alert alert-danger"><span>Запрашиваемый Паспорт качества не найден по одной из нижеследующих причин:</br>
<ul>
<li>Некорректно введены данные в полях "№ накладной" и/или "№ вагона".
Проверьте правильность данных и повторите запрос.</li>
<li>На текущий момент Паспорт качества не сформирован.</li>
</ul>
</span></div>`)//
                        $(`#${link}`).slideUp('fast')
                        $(`#${err}`).slideDown('fast')
                    }
                }, 1000)
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


    console.log('arm-pq root is mount')

}

document.addEventListener('DOMContentLoaded', Run)

