var Class = (function(){
	var _mix = function(r,s){
		for(var p in s){
			if (s.hasOwnProperty(p)) {
				r[p] = s[p];
			}
		}
	}

	var _extend = function(){
		//开关 用来使生成原型时，不调用真正的构造流程init
		this.initPrototype = true;
		var prototype = new this();
		this.initPrototype = false;

		var items = Array.prototype.slice.call(arguments) || [];
		var item;

		// 支持混入多个属性，并且就是我们返回的子类
		while(item = items.shift()){
			_mix(prototype,item.prototype || item);
		}

		// 这边是返回的类，其实就是我们返回的子类
		function SubClass(){
			if (!SubClass.initPrototype && this.init) {
				this.init.apply(this,arguments); // 调用init真正的构造函数
			}
		}

		// 赋值原型链，完成继承
		SubClass.prototype = prototype;

		// 改变constructor引用
		SubClass.prototype.constructor = SubClass;

		// 为子类也添加extend方法
		SubClass.extend = _extend;

		return SubClass;
	}
	// 超级父类
	var Class = function(){};
	// 为超级父类添加extend方法
	Class.extend = _extend;

	return Class;
})();


var Base = Class.extend({
	init: function(config){
		// 自动保存配置项
		this._config = config;
		this.bind();
		this.render();
	},
	// 可以使用get来设置配置项
	get:function(key){
		return this._config[key];
	},
	// 可以用set来设置配置项
	set:function(key,value){
		return this._config[key] = value;
	},
	bind:function(){

	},
	render:function(){

	},
	// 定义销毁的方法，一些收尾工作都应该在这里
	destroy:function(){

	}
});

var TextCount = Base.extend({
	_getNum:function(){
		return this.get('input').val().length;
	},
	bind:function(){
		var self = this;
		self.get('input').on('keyup',function(){
			self.render();
		});
	},
	render:function(){
		var num = this._getNum();
		if ($("#J_input_count").length == 0) {
            this.get('input').after("<span id='J_input_count'></span>");
        };
        $("#J_input_count").html(num+"个字");
	},
	
});

$(function(){
	new TextCount({
		// 这边直接传input的节点了，因为属性的赋值都是自动的
		input:$('#J_input')
	});
})



