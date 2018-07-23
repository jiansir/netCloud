

export const addZero=s=>{
  return s<10?'0'+s:s
}
export const formatTime=s=>{
  let minute=Math.floor(s/60);
  let second=Math.floor(s%60);
  return `${addZero(minute)}:${addZero(second)}`
}

//播放次数
export const formatPlayCount=s=>{
  return (s/10000)>9?((s/10000)>10000?`${(s/100000000).toFixed(1)}亿`:`${Math.ceil(s/10000)}万`):Math.floor(s)
}
export function inputValueIsValid(value) {
  if (value === null || value === '') {
    return false;
  }
  return existy(value);
}

//验证手机号
export function inputCheckPhone(value) {
  if ((/^1[3456789]\d{9}$/.test(value))) {
    return true;
  }
  return false;
}
export function existy(variableName) {
  try {
    if (typeof (variableName) === "undefined") {
      return false;
    } else {
      return true;
    }
  } catch (e) { }
  return false;
}
export const LS_Set=(key,val)=>{
  window.localStorage.setItem(key, JSON.stringify(val))
}
export const LS_Get = (key, defaultValue) => {
  var val = window.localStorage.getItem(key)
  var decoded = JSON.parse(val);

  if (decoded) {
    return decoded;
  }
  return defaultValue;
}
export const LS_Remove=(key)=>{
  window.localStorage.removeItem(key)
}