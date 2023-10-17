(function(){var Xvi=function(){if(this.GIe){this.GIe();return;}var Le=Xvi.prototype;Le.GIe=function(){this.HZS="";this.qig="";};Le.setServerURL=function(y_){
this.HZS=y_;};Le.setServerIP=function(tNY){this.qig=tNY;};Le.createSecureOutputStream=function(P8,mh){var HQe=new ByteArray();var KY=0;var T6e;
for(T6e in mh){KY++;}HQe.writeInt(KY);for(T6e in mh){var bFk=mh[T6e];this.oa(HQe,T6e);this.oa(HQe,bFk);}HQe.writeBytes(P8,0,P8.length);HQe.position=0;
return HQe;};Le.createSecureInputStream=function(P8,mh){var size=P8.readInt();for(var i=0; i<size; i++){var T6e=this.JM(P8);var bFk=this.JM(P8);
mh[T6e]=bFk;}var HQe=new ByteArray();HQe.writeBytes(P8,P8.position,P8.length-P8.position);HQe.position=0;return HQe;};Le.oa=function(P8,d5){var i;
var ES5=d5.length;P8.writeInt(ES5);var v;for(i=0; i<ES5; i++){v=d5.charCodeAt(i);P8.writeByte((v>>>8)&255);P8.writeByte((v>>>0)&255);}};Le.JM=function(P8){
var ES5;var DvY,beT;ES5=P8.readInt();if(ES5==-1){return "<NULL>";}else{if(ES5<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var d5="";var position=P8.position;for(var i=0; i<ES5; i++){DvY=P8[position+i*2];beT=P8[position+i*2+1];if((DvY|beT)<0){throw new Error("A malformed string has been read in a data input stream.");
}d5+=String.fromCharCode((DvY<<8)+(beT<<0));}P8.position+=ES5*2;return d5;};this.GIe();};return Xvi;})();
