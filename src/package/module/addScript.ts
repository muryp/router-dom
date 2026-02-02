type ScriptFn = () => void;

const scripts: ScriptFn[] = [];

export const addScript = (fn: ScriptFn) => scripts.push(fn);

export const executeScripts = () => scripts.forEach((fn) => fn());

export const resetScripts = () => (scripts.length = 0);

export const getScriptSize = () => scripts.length;
