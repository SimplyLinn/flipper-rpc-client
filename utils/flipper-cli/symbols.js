import readline_CB from 'node:readline';

/** @type {symbol | undefined} */
let _deleteLeft;
/** @type {symbol | undefined} */
let _refreshLine = undefined;
Object.getOwnPropertySymbols(readline_CB.Interface.prototype).some((s) => {
  if (s.description === '_refreshLine') _refreshLine = s;
  if (s.description === '_deleteLeft') _deleteLeft = s;
  return _deleteLeft != null && _refreshLine != null;
});
if (!_deleteLeft || !_refreshLine) {
  throw new Error(
    `Unable to locate ${Object.entries({
      _deleteLeft,
      _refreshLine,
    })
      .filter(([, v]) => v == null)
      .map(([s]) => s)
      .join(', ')} in the Readline.Interface prototype`,
  );
}

const Symbols = {
  _deleteLeft,
  _refreshLine,
};

const _global =
  typeof globalThis !== 'undefined'
    ? // eslint-disable-next-line no-undef
      globalThis
    : typeof global !== 'undefined'
      ? global
      : typeof window !== 'undefined'
        ? window
        : undefined;

if (!_global) throw new Error('Unable to locate global object');

const orgSymbol = _global.Symbol;

try {
  _global.Symbol = (...args) => {
    try {
      const s = Symbols[args[0]];
      console.log(Symbols, ...args);
      if (s) return s;
      return orgSymbol.call(_global, ...args);
    } catch (e) {
      _global.Symbol = orgSymbol;
      throw e;
    }
  };
} catch (e) {
  _global.Symbol = orgSymbol;
  throw e;
}

const kDeleteLeft = Symbol('_deleteLeft');
const kRefreshLine = Symbol('_refreshLine');
_global.Symbol = orgSymbol;

export { kDeleteLeft, kRefreshLine };
