console.log('Common')

/**
 * фасад А, все действия пользователя проходят через данный модуль
 *
 * @return {object} arg
 * */
const checkFunction = a => {
  if (typeof a === 'function') return true;
}


const facade = (() => {
  let run = function (event, a, b) {
    try {
      let e = event, ac, ai;
      if (e === null) return;
      if (e === undefined) return;
      if (e.type === 'submit') {
        return e.preventDefault();
      }
      if (e.type === 'input') {
        if (e.target && e.target.closest !== undefined) {
          // ac = e.target.closest(['.a']);
          ai = e.target.closest(['.i']);
          if (ai) {
            if (ai && ai.dataset.r && ai.dataset.a) {
              console.log(`${ai.dataset.r}, ${ai.dataset.a}`)
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
      if (e.type === 'click') {
        ai = e.target.closest(['button, a']);
        if (ai) {
          if (ai.hasAttribute('disabled')) return;
          // console.log(ai)
          if (ai.dataset.r && checkFunction(this[ai.dataset.r])) {
            this[ai.dataset.r](ai.dataset.a)
          }
        }
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
        return

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
})()


export {facade}
