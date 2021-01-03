/**
 * token 数据获取，存储，移除封装
 */

export const getItem = (name) => {
    const data = window.localStorage.getItem(name);  //本地持久化存储
    try {
        return JSON.parse(data);  //如果是字符串，转为js对象
    } catch (err) {
        return data;  //如果是js对象，直接返回
    }
}

export const setItem = (name, value) => {
    //如果value是js对象，转为JSON字符串再存储
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}

export const removeItem = (name) => {
    window.localStorage.removeItem(name)
}