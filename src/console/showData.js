import xhtml from '@hai2007/browser/xhtml';
import { isString, isFunction, isUndefined, isNull, isNumber, isBoolean } from '@hai2007/tool/type';

let doit = (target, obj) => {

    console.log(target.getElementsByTagName('i')[0]);

    xhtml.bind(target.getElementsByTagName('i')[0], 'click', () => {

        // 如果是字符串，就不需要展开了
        if (isString(obj)) return;

        // 如果没有加载过
        if (target.getAttribute('hadload') != 'yes') {

            target.setAttribute('hadload', 'yes');
            target.setAttribute('isopen', 'yes');

            let template = "<div class='item'>";

            for (let key in obj) {
                try {
                    template += `<span isopen='no'><i><em style='font-style:normal;color:#905'>${key}</em>:${obj[key]}</i></span>`;
                } catch (e) {
                    // todo
                }
            }
            template += "</div>";
            xhtml.append(target, template);

            // 添加交互
            let index = 0, lis = target.getElementsByTagName('span');
            for (let key in obj) {
                doit(lis[index++], obj[key]);
            }
        }

        // 如果加载过了，直接控制打开或者关闭即可
        else {
            if (target.getAttribute('isopen') == 'no') target.setAttribute('isopen', 'yes');
            else target.setAttribute('isopen', 'no');
        }

    });

};

export default function (target, msg) {

    // 如果是字符串、函数、数字等
    if (isString(msg) || isFunction(msg) || isNumber(msg) || isBoolean(msg)) {
        target.innerText = msg;
    }

    else if (isUndefined(msg)) target.innerText = 'undefined';
    else if (isNull(msg)) target.innerText = 'null';

    else {
        target.setAttribute('defType', 'showobject');

        // 默认作为对象显示
        target.setAttribute('hadload', 'no');
        target.setAttribute('isopen', 'no');
        target.innerHTML = `<i>${msg}</i>`;
        doit(target, msg);
    }
};
