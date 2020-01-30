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
import {Form, Validator} from "./Tools";
import 'jquery-validation'

import './tests/fixtures/Паспорт-ФБ1234567-ПЯ123456.pdf'

const Run = () => {
    let root, root_id, html, rnd, field_1, field_2, aria_desc_1, aria_desc_2, placeholder_1, placeholder_2,
        form, loader,
        link, namePassport, err, btnSubmit
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
    btnSubmit = 'btn' + rnd

    root = T.gid(root_id)
    if (!root) {
        document.body.insertAdjacentHTML('afterbegin', `<div id="${root_id}"></div>`)
        root = T.gid(root_id)
    }
    // ФБ123456789
    // ПЯ123456
    html = `<div class="container-fluid div2">
<div class="row mx-auto">
<h3 class="mx-auto p-3 w-100 text-center">Паспорт качества</h3>
<h3 class="mx-auto p-3 w-100 text-center">Для получения Паспорт качества на продукцию</h3>
<form id="${form}" class="passpq mx-auto px-4 py-2 col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4">
  <div class="form-group">
    <label for="${field_1}">№ накладной</label>
    <div class="row mx-0">
        <input type="text" name="wagon_or_container" autofocus required class="form-control col wagon_or_container" id="${field_1}" aria-describedby="${aria_desc_1}"
       placeholder="${placeholder_1}" value="">
        <div class="col-auto">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_1}"><i class="icon-cancel"></i></button>
        </div>
    </div>
    <small id="${aria_desc_1}" class="form-text d-none alert alert-danger border-0 p-2 px-3 rounded-0 mt-2" role="alert">Validate this field</small>
  </div>
  <div class="form-group">
    <label for="${field_2}">№ вагона или контейнера</label>
    <div class="row mx-0">
        <input type="text" required class="form-control col" id="${field_2}" aria-describedby="${aria_desc_2}"
       placeholder="${placeholder_2}" value="">
        <div class="col-auto">
            <button class="btn btn-secondary" type="button" data-r="clear" data-a="${field_2}"><i class="icon-cancel"></i></button>
        </div>
    </div>
    <small id="${aria_desc_2}" class="form-text d-none alert alert-danger border-0 p-2 px-3 rounded-0 mt-2" role="alert">Validate this field</small>
  </div>
  <button id="${btnSubmit}" type="submit" class="btn btn-primary px-5 mx-auto d-block my-4" data-a="submit" data-r="submit">
  <i id="${loader}" class="d-none icon-spin2 animate-spin"></i>
  <i class="icon-paper-plane"></i>
  Получить паспорт</button>
<div id="${err}" style="display: none;" role="alert" class="alert alert-danger"></div>
</form>
</div></div>`
// https://www.philowen.co/blog/force-a-file-to-download-when-link-is-clicked/
    root.innerHTML = html

    const validateArg = {
        form,
        btnSubmit,
        lenSens: 5,
        inputs: {
            [field_1]: {// wagon_or_container
                regex: /^([А-Я]{2,4}\d{7})$/u,
                errArea: aria_desc_1,
                message: 'данные должны соответствовать маске АБ1234567 или АБВГ1234567',
            },
            [field_2]: {// consignment
                regex: /^([А-Я]{2}\d{6})$/u,
                errArea: aria_desc_2,
                message: 'данные должны соответствовать маске АБ123456',
            },
        }
    }

    let frmValidator = new Validator(validateArg)
    frmValidator.listenOn()

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
                select: 'Passport',
                mode: 'get_file',
                data: {
                    wagon_or_container: sels.field_1.value,
                    consignment: sels.field_2.value,
                }
            },
            success(a) {
                // console.log(a.data)
                setTimeout(() => {
                    elements.form.setDisable(false)
                    sels.loader.classList.add('d-none')
                    // debugger
                    namePassport = `Паспорт-${sels.field_1.value}-${sels.field_2.value}.pdf`

                    if (a.data['is_file_exists']) {
                        // console.log(a.query)
                        if (!sels.link) {
                            // console.log('it found')
                            $(sels.form).append(`<div id="${link}" style="display: none;" class="alert alert-info" role="alert">
<a class="my-4" href="http://arm-pq.web.azot.kmr/${a.data['path_to_file']}"
download="${a.data['path_to_file']}">${namePassport}</a></div>`)
                            $(`#${link}`).slideDown('fast')
                            sels.link = T.gid(link)
                        } else {
                            $(`#${link}`).find('a').html(namePassport).end().slideDown('fast')
                        }
                    } else {
                        console.log('data not found (!')
                        let err_place = T.gid(err),
                            err_mess = `<span>Запрашиваемый ${namePassport} не найден по одной из нижеследующих причин:</br>
<ul>
<li>Некорректно введены данные в полях "№ накладной" и/или "№ вагона".
Проверьте правильность данных и повторите запрос.</li>
<li>На текущий момент ${namePassport} не сформирован.</li>
</ul></span>`
                        if (err_place) {
                            err_place.innerHTML = err_mess
                        }
                        // $(sels.form).append()//
                        $(`#${link}`).slideUp('fast')
                        $(`#${err}`).slideDown('fast')
                    }
                }, 1000)
            },
            error(a) {
                // debugger
                setTimeout(() => {
                    console.log(a)
                    let errs = ''
                    for (let [key, val] of Object.entries(a)) {
                        errs += `${key}: ${val}`
                    }
                    $(`#pq_err`).html(errs).slideDown('fast').delay(1500).slideUp('fast')
                    elements.form.setDisable(false)
                    sels.loader.classList.add('d-none')
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
            if (!frmValidator.valid) return
            // return;
            if (sels.field_1.value && sels.field_2.value) {
                elements.form.setDisable(true)
                sels.loader.classList.remove('d-none')
                $(`#${err}`).slideUp('fast')

                new T.Query({...query()}).runQuery();
            } else {
                console.warn('empty field')
            }
        }
    }

    sels.root.addEventListener("click", Common.facade.run.bind(handlers));
    sels.root.addEventListener("submit", Common.facade.run.bind(handlers));

    console.log('arm-pq root is mount')

}

document.addEventListener('DOMContentLoaded', Run)
