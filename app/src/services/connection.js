const BASE_URL = window.location.href + 'api/';

const AJAX = function (action, data, callback, type = "POST") {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(evt) {
        if (this.readyState == 4) {
            if (this.status == 200) callback(this, evt);
            else console.error('Server Error:-', evt);
        };
    };
    xmlhttp.open(type, BASE_URL + action, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    const query = JSON.stringify({ data });
    xmlhttp.send(query);
};

const query = function(table = "users", action = "get", val = {}) {
    return new Promise(function(resolve, reject) {
        const callback = function(xhttp) {
            const data = JSON.parse(xhttp.responseText);
            if (data.status === 200) {
                resolve(data.data);
                console.log(data.data)
            } else {
                console.error('Response is O.K. but something went wrong on the server');
                console.error('status: ', data.status, ', message: ', data.message);
                reject(data);
            }
        }
        AJAX(`${table}/${action}`, val, callback);
    });
};

export default query;

// for debugging pupose
window.query = query;
