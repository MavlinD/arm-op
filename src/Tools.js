function gid(a) {
  return document.getElementById(a);
}

function gs(sel=document, a) {
  return sel.querySelector(a);
}

function Fetch(arg) {
  this.string = arg.string || "";
  // debugger
  this.method = arg.method || "post";
  this.body = arg.body;
  this.typeResp = arg.typeResp || "json";
  this.credentials = arg.credentials || "include"; // отослать куки - пока требуется только в отладке
  this.url = () => {
    // console.log(arg)
    return this.method.toLowerCase() === "get" ? arg.url + this.string : arg.url;
  };
  this.run = () => {
    // log(this.body)
    return new Promise((resolve, reject) => {
      // debugger
      fetch(this.url(), {
        method: this.method,
        body: this.method === 'POST' ? JSON.stringify(this.body) : null,
        headers: {
          // 'Content-Type': 'application/pdf',
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // credentials: this.credentials
      })
        .then(response => {
          if (this.typeResp === 'json') {
            return response.text()
          } else {
            return response[this.typeResp]();
          }
        })
        .then(response => {
          if (this.typeResp === 'json') {
            // console.log(response);
            return JSON.parse(response, this.reviver)
          } else {
            // console.log(response);
            return response;
          }
        })
        .then(data => {
          // console.log(data)
          if (data.xdebug_message) {
            console.warn(data.data + " in file: " + data.file + " in line: " + data.line);
            // document.body.insertAdjacentHTML('afterBegin', data.xdebug_message)
            return;
          }
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  this.reviver = (k, v) => {
    if (v === null) {
      return ""
    } else {
      return v
    }
  }
}

/**
 * объект для работы с формами
 *
 * @param {string || HTMLElement} el
 * @set {this}
 * */
let Form = function (el) {
  // debugger
  if (el instanceof HTMLElement) {
    this.form = el;
  } else {
    this.form = gid(el);
  }
  this.valid = 0;
  this.submitButt = this.form.querySelector('button[type="submit"]');
  // debugger
  this.inputs = this.form.querySelectorAll('textarea, input');
  this.inputsAll = this.form.querySelectorAll('input, textarea, button, select');
  this.data = {};
  this.name = this.form['name'];
};

Form.prototype.setDisable = function (a) {
  for (let input in this.inputsAll) {
    if (this.inputsAll.hasOwnProperty(input)) {
      this.inputsAll[input].disabled = a
    }
  }
}
/**
 * формирование массива данных с формы
 *
 * @this Form
 * @set {object} this.data
 * */
Form.prototype.getData = function () {
  let data = {};
  let arr = this.inputs, item;
  for (let i = 0; i < arr.length; ++i) {
    item = arr[i];
    //console.log ( item.dataset.name + ' - ' +  + ' == ' + item.innerHTML );
    if ((item.name || item.dataset.name) && item.innerHTML) {
      switch (item.tagName) { // для DOM элементов
        case 'P':
        case 'DIV':
        case 'SPAN':
          data[item.dataset.name] = item.innerHTML;
          break;
        case 'SELECT':
          data[item.name || item.dataset.name] = item.value;
          break;
        case 'UL':
          /**
           * чтобы использовать список, нужно ему присвоить класс для отправки данных
           * датасет name, а элементам списка датасет id
           * */
            //console.log ( item.tagName +' ---- '+ item.innerHTML );
            //console.log ( item.name + ' --- ' + item.value );
            //console.log ( item.innerHTML );
          let lis = item.childNodes, ar = [];
          for (let i = 0; i < lis.length; ++i) {
            let id = lis[i].dataset.id || lis[i].dataset.name;
            if (lis.hasOwnProperty(i) && id) ar = ar.concat(id)
          }
          if (lis.length) data[item.dataset.name] = ar;
      }
    }
    if (item.type === 'checkbox' && item.checked) data[item.name] = 1;
    if (item.type === 'checkbox' && item.checked === false) data[item.name] = 0;
    if (item.type === 'radio' && item.checked) data[item.name] = item.value;
    if (item.type === 'date') data[item.name] = item.value;
    if (item.type === 'number') data[item.name] = item.value;
    switch (item.type) {
      case 'text':
      case 'password':
      case 'email':
      case 'textarea':
        if (item.dataset.type === 'number') data[item.name] = item.value.replace(/\s+/g, '');
        else if (item.value) data[item.name] = item.value;
        break;
      case 'file':
        break;
    }
  }
  this.data = data;
  return this.data;
};

function getDate(arg) {
  let date;
  if (arg) {
    date = new Date(arg.substr(0, 10));
  } else {
    date = new Date();
  }
  let month = 1 + Number(date.getMonth()),
    day = date.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  return date.getFullYear() + '-' + month + '-' + day; // среда, 31 декабря 2014 г. н.э. 12:30:00
}

function log(a) {
  console.log(a);
}

// let obj = {
//     foo: [
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-09'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-11'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-10'
//             }
//         },
//     ],
//     bar: [
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-10'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-11'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-10'
//             }
//         },
//     ],
// }
// // return:
// let ordered = {
//     bar: [
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-10'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-11'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-10'
//             }
//         },
//     ],
//     foo: [
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-09'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-11'
//             }
//         },
//         {
//             A: {
//                 a: 'knkn',
//                 b: '2019-09-10'
//             }
//         },
//     ],
// }
class Sort {
  constructor(obj) {
    // debugger
    this.obj = obj;
    this.ordered = {};
  }

  __sortByDate(arg) {
    //сортировка по дате
    this.__sort((a, b) => {
      // debugger
      let dateA = new Date(this.obj[a][0].created),
        dateB = new Date(this.obj[b][0].created);
      if (arg === "desc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }

  __sort(arg) {
    Object.keys(this.obj)
      .sort(arg)
      .forEach(key => {
        this.ordered[key] = this.obj[key];
      });
  }

  sortByDate(arg = null) {
    this.__sortByDate(arg);
    return this.ordered;
  }
}

// T.log(JSON.stringify(result))
// T.log(JSON.stringify(ordered))
function loadJsCss(filename, filetype) {
  let fileref;
  if (filetype === "js") {
    //if filename is a external JavaScript file
    // debugger
    fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
  } else if (filetype === "css") {
    //if filename is an external CSS file
    fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
  }
  if (typeof fileref != "undefined") return document.getElementsByTagName("head")[0].appendChild(fileref);
}

// https://medium.com/nuances-of-programming/расширения-для-visual-studio-code-которые-поднимут-процесс-разработки-на-новый-уровень-a24f29173079
// https://nikomedvedev.ru/other/vscodeshortcuts/hotkeys.html

class Query {
  constructor(arg) {
    this.url = arg.url || "init.php";
    this.type = arg.type || "GET";
    if (typeof arg.data === "string") {
      this.data = JSON.parse(arg.data)
    } else {
      this.data = arg.data;
    }
    this.success = arg.success;
  }

  runQuery(arg) {
    // debugger
    new Fetch({
      url: this.url,
      // st: arg,
      body: this.type === 'POST' ? this.data : null,
      method: this.type,
    }).run().then(response => {
      if (typeof this.success === "function" && response.code === 0) {
        // log(response)
        // debugger
        // console.log(arg)
        // if (typeof arg.fn === "function") {
        //   arg.fn(response)
        // }
        this.success(response);
      } else {
        log(response.message, response.data);
      }
    })
  }
}

let Act = {}; // save current state actions

export class Events {
  constructor(arg) {
    (this.url = arg.url), (this.INTERVAL = arg.interval || 5000); // msec
    this.source = arg.url;
    this.action = Act;
    this.Func = arg.action || {
      reloadPage() {
        document.location.reload(true);
      }
    };
  }

  run() {
    new Fetch({
      url: this.url,
      method: "get",
      cache: "no-store"
    })
      .run()
      .then(resp => {
        this.getEvent(resp);
      });
  }

  getEvent(events) {
    for (let [key, val] of Object.entries(events)) {
      // console.log(key, val);
      // debugger;
      if (!this.action[key]) {
        // console.log("setup");
        this.action[key] = {
          state: val.state
        };
      } else if (this.action[key].state && this.action[key].state !== val.state) {
        // debugger
        // console.log("set run");
        this.action[key] = {
          state: val.state,
          run: 1
        };
      } else {
        // console.log("update");
        this.action[key].run = 0;
      }
    }
    this.runAct();
  }

  runAct() {
    for (let [key, val] of Object.entries(this.action)) {
      // console.log(key, val);
      if (val.run && this.Func[key]) {
        this.Func[key]();
      }
    }
  }
}

/**
 * @return {string}
 */
export function Summ(a, ind) {
  let summ = 0;
  // debugger
  if (Array.isArray(a)) {
    a.forEach(val => {
      if (val[ind]) summ += +val[ind];
    });
  }
  return summ.toLocaleString("ru");
}

export function servLocation(act) {
  const pushState = history.pushState;
  history.pushState = function (state) {
    if (typeof history.onpushstate == "function") {
      history.onpushstate({state: state});
    }
    if (typeof act == "function") {
      act();
      window.addEventListener("popstate", act);
    }
    return pushState.apply(history, arguments);
  };
}

export class myTime {
  constructor(arg) {
    arg = arg || {};
    // debugger
    this.options = arg.opt || {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
      // timeZone: "UTC" // UTC тк сервер уже потрудился вернуть с учетом нашей TZone, поэтому чтобы нивелировать ТЗ клиента делаем так
      // TODO нужно отнимать смещение Asia/Novosibirsk, к полученному прибавлять клиентскую TZ
    };
    // debugger
    if (arg.date) {
      // приводим время к UTC
      this.date = new Date(arg.date + Const.dbTimeZone);
    } else {
      if (!arg.empty) {
        this.date = Date.now(); // рез-т с клиентской TZ
      }
    }
    this.locale = "ru-RU";
    this.empty = "---" || arg.empty;
    this.formatter = Intl.DateTimeFormat(this.locale, this.options);
  }

  format() {
    // debugger
    if (this.date) {
      try {
        return this.formatter.format(this.date);
      } catch (e) {
        return 'Error time'
      }
    } else {
      return this.empty;
    }
  }
}

export class myTimeDiff extends myTime {
  // https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
  constructor(arg) {
    super();
    // log(arg)
    this.dt1 = new myTime({date: arg.dt1});
    this.dt2 = new myTime({date: arg.dt2});
    // log(this.dt1)
    // log(this.dt2)
  }

  getDiff() {
    let diffInMillscs,
      nHours,
      // milliInDay = 1000 * 60 * 60 * 24,
      milliInHour = 1000 * 60 * 60,
      milliInMin = 1000 * 60,
      resp;
    if (this.dt2.date instanceof Date && this.dt1.date instanceof Date) {
      diffInMillscs = this.dt2.date - this.dt1.date;
    } else if (this.dt1.date instanceof Date) {
      // здесь V8 учитывает разницу в TZ в аргументах
      diffInMillscs = Date.now() - this.dt1.date;
    } else {
      diffInMillscs = "---";
    }
    nHours = Math.floor(diffInMillscs / milliInHour);
    if (nHours) {
      resp = `${nHours} ч. ${Math.round((diffInMillscs - nHours * milliInHour) / milliInMin)} мин.`;
    } else {
      resp = `${Math.round(diffInMillscs / milliInMin)} мин.`;
    }
    // debugger
    return resp;
  }
}

export function throttle(func, ms) {
  //https://learn.javascript.ru/task/throttle
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(() => {
      window.requestAnimationFrame(run);
    }, ms);
  }

  function run() {
    isThrottled = false; // (3)
    if (savedArgs) {
      wrapper.apply(savedThis, savedArgs);
      savedArgs = savedThis = null;
    }
  }

  return wrapper;
}

export class Store {
  constructor(arg) {
    this.store = this.constructor.make(arg)
  }

  static make(arg) {
    return new Map(Object.entries(arg || {}))
  }

  set(key, val) {
    // debugger
    this.store.set(key, val)
  }

  get(key) {
    // debugger
    return this.store.get(key)
  }

  clear() {
    this.store.clear()
  }

  static toObj(data, ind) {
    let obj = {}
    data.map((val, key) => {
      // console.log(val, key)
      obj[val[ind]] = val
    })
    return obj
  }

  saveResponse(response, ind) {
    // debugger
    this.store.set(response.query.path, this.constructor.make())
      .get(response.query.path)
      .set(response.query.box, this.constructor.make(this.constructor.toObj(response.data, ind)))
  }

  print(count_to_print = 0, obj = null) {
    if (!obj) obj = this.store
    if (obj instanceof Map) {
      if (obj.size) {
        let n = 0
        obj.forEach((val, key) => {
          if (count_to_print === 0 || n++ < count_to_print) {
            console.log(`key: ${key}`)
            this.print(count_to_print, val)
          }
        })
      } else {
        console.log(`Store is empty:`)
        console.log(obj)
      }
    } else {
      console.log(obj)
    }
  }
}

export class Tpl {
  constructor(arg) {
    arg = arg || {};
    this.url = arg.url
    this.data = arg.data
    this.tpl = ''
  }

  async getTpl() {
    this.tpl = await new Fetch({
      url: Const.location + "/" + this.url + `?rnd=${Math.random()}`,
      method: "get",
      typeResp: "text"
    }).run();
  }

  render() {
    console.log(this.tpl)
  }
}


export {gid, log, gs, Fetch, Sort, Query, Form, loadJsCss};
