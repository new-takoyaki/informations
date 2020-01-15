const async_hooks = require('async_hooks');

const eid = async_hooks.executionAsyncId();
const tid = async_hooks.triggerAsyncId();

const asyncHook = async_hooks.createHook({init, before, after, destroy, promiseResolve});

asyncHook.enable();
asyncHook.disable();

function init(asyncId, type, triggerAsyncId, resource) {}
function before(asyncId) {}
function after(asyncId) {}
function destroy(asyncId) {}
function promiseResolve(asyncId) {}