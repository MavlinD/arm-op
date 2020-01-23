console.log('Common')

/**
 * фасад А, все действия пользователя проходят через данный модуль
 *
 * @return {object} arg
 * */
const checkFunction = a => {
  if (typeof a === 'function') return true;
}


let facade = (
  function () {
    let run = function (event, a, b) {
      // debugger
      try {
        let e = event, ac, ai;
        if (e === null) return;
        if (e === undefined) return;
        if (e.type === 'submit') {
          // console.log(event)
          // console.log(event)
          // debugger
          // console.log(this)
          return e.preventDefault();
        }
        if (e.type === 'input') {
          if (e.target && e.target.closest !== undefined) {
            // ac = e.target.closest(['.a']);
            ai = e.target.closest(['.i']);
            if (ai) {
              console.log(ai)
              if (ai && ai.dataset.r && ai.dataset.a) {
                console.log(`${ai.dataset.r}, ${ai.dataset.a}`)
                // S.ac = ac
                if (ai.dataset.a === 'this') {
                  this[ai.dataset.r](ai)
                } else {
                  this[ai.dataset.r](ai.dataset.a)
                }
              }
            }
          }
          return
        }
        // if (e.target && e.target.closest !== undefined && e.type !== 'click') {
        //     ac = e.target.closest(['.a']);
        //     // ai = e.target.closest(['.i']);
        //     console.log(ac)
        //     // T.log(e)
        //     if (ac) {
        //         fn.everyClick(e)
        //     }
        //     if (ac && ac.hasAttribute('disabled')) return;
        //     if (ac === null || e.target.disabled || e.target.parentNode.disabled) return;
        //     if (ac.dataset.a === null || !ac.dataset.a) return;
        if (e.type === 'click') {
          // console.log(event)
          // if (e.target.tagName) {
          //   if (e.target.tagName === 'BUTTON') {
          // console.log(e.target)
          ai = e.target.closest(['button, a']);
          // ai = e.target.closest(['.i']);
          // if (ai) {
          // console.log(ai)
          if (ai && ai.dataset.r && checkFunction(this[ai.dataset.r])) {
          // if (ai.target.dataset.r && checkFunction(this[ai.target.dataset.r])) {
            // console.log(`${e.target.dataset.r}, ${e.target.dataset.a}`)
            // debugger
              this[ai.dataset.r](ai.dataset.a)
            // if () {
            // }
          }
          // }
          // }
          // if (e.target.tagName === 'A') e.preventDefault();
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
          if (e.target.tagName === 'IMG') {
            e.preventDefault();
          }
          // if (ac.tagName === 'LABEL' || ac.tagName === 'INPUT') return;
          return
          // }

        } else if (typeof (event) === 'string') {
          console.log(event)
          return
        } else if (typeof (event) === 'object') {
          // T.log(event)
          // return
          ac = event
        } else {
          return;
        }
        if (ac && ac.dataset.r && ac.dataset.a) {
          console.log(`${ac.dataset.r}, ${ac.dataset.a}`)
          // S.ac = ac
          if (ac.dataset.a === 'this') {
            this[ac.dataset.r](ac)
          } else {
            try {
              let dr = JSON.parse(ac.dataset.a)
              this[ac.dataset.r](dr)
            } catch (e) {
              this[ac.dataset.r](ac.dataset.a)
            }
          }
        }
      } catch (e) {
        if (e.code === 10) { // пользователь не авторизован
          console.warn(e.message);
          return;
        }
        // T.log(e)
        // debugger
        console.error(e)
        // err.run( arg );
      }
    };
    return {
      run: run
    }
  })();


export {facade}
