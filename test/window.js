import jsdom from 'jsdom';

export let window = ((() => {

    const { JSDOM } = jsdom;
    global.window = new JSDOM('<!doctype html>').window;
    global.window.Error = Error;
    global.window.Function = Function;
    global.window.JSON = JSON;
    global.window.Object = Object;
    global.window.RegExp = RegExp;
    global.window.parseInt = parseInt;
    return global.window;

})());