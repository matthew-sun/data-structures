var Class = function(){
    var length = arguments.length;
    var option = arguments[length-1];
    option.init = option.init || function(){};

    if(length === 2){
        var superClass = arguments[0];

        var tempClass = function() {};
        tempClass.prototype = superClass.prototype;

        var subClass = function() {
            return new subClass.prototype._init(arguments);
        }
      
        subClass.superClass = superClass.prototype;
        subClass.callSuper = function(context,func){
            var slice = Array.prototype.slice;
            var a = slice.call(arguments, 2);
            var func = subClass.superClass[func];
       
            if(func){
                func.apply(context, a.concat(slice.call(arguments)));
            }
        };
        subClass.prototype = new tempClass();
        subClass.prototype.constructor = subClass;
        
        $.extend(subClass.prototype, option);

        subClass.prototype._init = function(args){
            this.init.apply(this, args);
        };
        subClass.prototype._init.prototype = subClass.prototype;
        return subClass;

    }else if(length === 1){
        var newClass = function() {
            return new newClass.prototype._init(arguments);
        }
        newClass.prototype = option;
        newClass.prototype._init = function(arg){
            this.init.apply(this,arg);
        };
        newClass.prototype.constructor = newClass;
        newClass.prototype._init.prototype = newClass.prototype;
        return newClass;
    }   
}