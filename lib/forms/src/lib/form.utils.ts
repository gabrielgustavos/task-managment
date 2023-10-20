import * as moment from 'moment';

export function convertModelToFormData(
    model: any,
    form?: any,
    arrayName?: any
): FormData {
    const formData = form || new FormData();
    for (const propertyName in model) {
        if (model[propertyName] instanceof moment)
            model[propertyName] = new Date(model[propertyName]).toLocaleDateString();

        if (
            !model.hasOwnProperty(propertyName) ||
            model[propertyName] === undefined
        ) {
            continue;
        }

        const formKey = arrayName
            ? `${arrayName}.${propertyName}`
            : propertyName;
        if (model[propertyName] instanceof Array) {
            model[propertyName].forEach((element: any, index: number) => {
                if (typeof element !== 'object') {
                    formData.append(`${formKey}[]`, element);
                } else {
                    const tempFormKey = `${formKey}[${index}]`;
                    convertModelToFormData(element, formData, tempFormKey);
                }
            });
        } else if (typeof model[propertyName] === 'object') {
            if (model[propertyName] instanceof File) {
                formData.append(formKey, model[propertyName]);
            } else {
                convertModelToFormData(model[propertyName], formData, formKey);
            }
        } else {                       
            if (typeof model[propertyName] == 'number')
                formData.append(formKey, model[propertyName].toString().replace(".", ","));
            else 
                formData.append(formKey, model[propertyName].toString());            
        }
    }
    return formData;
}

export function addZerosVirgula(num: any) {
    if (!num)
        num = 0;

    // Convert input string to a number and store as a variable.
    let value = num;
    // Split the input string into two arrays containing integers/decimals
    const res = num.toString().split(".");
    // If there is no decimal point or only one decimal place found.
    if (res.length == 1 || res[1].length < 3) {
        // Set the number to two decimal places
        if (typeof value == 'string')
            value = parseFloat(value).toFixed(2);
        else
            value = value.toFixed(2);

    }
    // Return updated or original number.
    return value.replace(".", ",");
}

export function addZerosPonto(num: any) {
    // Convert input string to a number and store as a variable.
    let value = num;
    // Split the input string into two arrays containing integers/decimals
    const res = num.toString().split(".");
    // If there is no decimal point or only one decimal place found.
    if (res.length == 1 || res[1].length < 3) {
        // Set the number to two decimal places
        if (typeof value == 'string')
            value = parseFloat(value).toFixed(2);
        else
            value = value.toFixed(2);

    }
    // Return updated or original number.
    return value;
}

export function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}