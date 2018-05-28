"use strict";

// 合约地址
var dappAddress = "n1t2CcDymoGNVcKQHZN61QB2bY4ixe4cxEA";

// 直接访问星云链的api
var nebulas = require("nebulas"),
	Account = nebulas.Account,
	neb = new nebulas.Neb();
// 设置使用的网络
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));

// NebPay SDK 为不同平台的交易提供了统一的支付接口
// 开发者在Dapp页面中使用NebPay API可以通过浏览器插件钱包、手机app钱包等实现交易支付和合约调用。
var NebPay = require("nebpay");
var nebPay = new NebPay();

var from = Account.NewAccount().getAddressString();
var value = "0";   // 金额
var nonce = "0";   // 交易序号
var gas_price = "1000000"; // 手续费价格
var gas_limit = "2000000"; // 手续费限制

//获取所有数据条数
function getAllDateNumber(){
	if(typeof(webExtensionWallet) === "undefined") {
		alert("你必须安装Chrome钱包插件才能正常使用本产品");
		return;
	}
	var callFunction = "len";
	var contract = { // 合约
		"function": callFunction  // 方法名
	}

	// 使用api.call执行合约中的方法
	neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
		//总记录数
		var total = resp.result;
		//每页显示的记录数
		//int pageCount=5;  
		//页数
		//int sum=(total-1)/pageCount+1;

		getAllDate(total,0);
		
	}).catch(function (err) {
		console.log("error:" + err.message)
	})
}

function getAllDate(limit,offset){
	var callFunction = "read";
	var callArgs = "[" +limit+ "," +offset+ "]"; 
	var contract = { // 合约
		"function": callFunction,  // 方法名
		"args": callArgs            // 参数
	}

	// 使用api.call执行合约中的方法
	neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
	
		var arr =eval(resp.result);
		
		
			
		var person=new Object();
		person.nickname="Bill";
		person.content="好心塞，我也是贫困地区出来的，看到这些很难受，尽点绵薄之力吧";
		person.author="n1X4YNgEgYrnUEpSTnxc9rGv7HH99vw24cW";
		person.value=100;
		arr.push(person);
		
		var person1=new Object();
		person1.nickname="Gates";
		person1.content="唉，钱不多，能帮一点是一点吧。";
		person1.value=20;
		person1.author="n1Rvrsz9efbVz62LDz6Ven2F4kVSqXNbC2g";
		arr.push(person1);
		
		//排序
		var compare = function (obj1, obj2) {
			var val1 = obj1.value;
			var val2 = obj2.value;
			if (val1 < val2) {
				return 1;
			} else if (val1 > val2) {
				return -1;
			} else {
				return 0;
			}            
		} 
		arr.sort(compare);
		
		//填充数据
		var t =  document.getElementById("left-1");
		for(var i = 0 ; i<arr.length;i++){
			var d1 = document.createElement('div');
			d1.className="wrap";
			
			var d2 = document.createElement('div');
			d2.className="number";
			var d2txt = document.createTextNode(i+1);
			d2.appendChild(d2txt);
			d1.appendChild(d2);
			
		
			var p = document.createElement('p');
			p.className="extra-wrap border-bot-1";
			
			var s =  document.createElement('span');
			s.className="clr-1";
			var stxt = document.createTextNode(arr[i].nickname+" ");
			s.appendChild(stxt);
			p.appendChild(s);
			
			var a =  document.createElement('a');
			a.className="link";
			var atxt = document.createTextNode(arr[i].value+" NAS");
			a.appendChild(atxt);
			p.appendChild(a);
			
			var b =  document.createElement('br');
			p.appendChild(b);
			
			var addressText = document.createTextNode(arr[i].author);
			p.appendChild(addressText);
			
			var b2 =  document.createElement('br');
			p.appendChild(b2);
			
			var ptxt = document.createTextNode(arr[i].content);
			p.appendChild(ptxt);
			d1.appendChild(p);
			t.appendChild(d1);
		}

	}).catch(function (err) {
		console.log("error:" + err.message)
	})
	
	function par(){
		$.parser.parse();
	}
}
