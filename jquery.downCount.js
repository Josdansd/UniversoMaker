﻿!function(t){t.fn.downCount=function(e,n){function r(){var t=new Date(o.date),e=i(),r=t-e;if(0>r)return clearInterval(a),void(n&&"function"==typeof n&&n());var d=1e3,s=60*d,u=60*s,l=24*u,h=Math.floor(r/l),c=Math.floor(r%l/u),g=Math.floor(r%u/s),v=Math.floor(r%s/d);h=String(h).length>=2?h:"0"+h,c=String(c).length>=2?c:"0"+c,g=String(g).length>=2?g:"0"+g,v=String(v).length>=2?v:"0"+v;var x=1===h?"day":"días",m=1===c?"hour":"horas",y=1===g?"minute":"minutos",D=1===v?"second":"segundos";f.find(".days").text(h),f.find(".hours").text(c),f.find(".minutes").text(g),f.find(".seconds").text(v),f.find(".days_ref").text(x),f.find(".hours_ref").text(m),f.find(".minutes_ref").text(y),f.find(".seconds_ref").text(D)}var o=t.extend({date:null,offset:null},e);o.date||t.error("Date is not defined."),Date.parse(o.date)||t.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");var f=this,i=function(){var t=new Date,e=t.getTime()+6e4*t.getTimezoneOffset(),n=new Date(e+36e5*o.offset);return n},a=setInterval(r,1e3)}}(jQuery);