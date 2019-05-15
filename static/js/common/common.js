var url = "http://127.0.0.1:8080/hyespt/common.hy";
var hyesptk = "hyespt_v_1.0_YYY";
var data = {
	me: 'hyesptk',
	data: null
};
$.post(url, {
	data: encrypt(JSON.stringify(data)),
	hyesptk: hyesptk
}, function(e) {
	if(e.respCode == 2018) {
		hyesptk = e.respData.hyesptk;
	}
}, 'json');

function encrypt(word) {
	return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(word), CryptoJS.enc.Utf8.parse(hyesptk), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	}).toString();
}
$.ajaxSetup({
	crossDomain: true,
	xhrFields: {
		withCredentials: true
	}
});