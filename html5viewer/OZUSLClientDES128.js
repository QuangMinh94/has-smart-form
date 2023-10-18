(function(){var ARK=function(){if(this.GIe){this.GIe();return;}var Le=ARK.prototype;Le.GIe=function(){this.HZS="";this.qig="";};Le.setServerURL=function(y_){
this.HZS=y_;};Le.setServerIP=function(tNY){this.qig=tNY;};Le.createSecureOutputStream=function(P8,mh){var HQe=new ByteArray();var KY=0;var T6e;
for(T6e in mh){KY++;}HQe.writeInt(KY);for(T6e in mh){var bFk=mh[T6e];this.oa(HQe,T6e);this.oa(HQe,bFk);}var X8T=new ByteArray();var kGa=new this.bKg("forcs@#$",X8T);
kGa.write(P8,0,P8.length);HQe.writeBytes(X8T,0,X8T.length);HQe.position=0;return HQe;};Le.createSecureInputStream=function(P8,mh){var size=P8.readInt();
for(var i=0; i<size; i++){var T6e=this.JM(P8);var bFk=this.JM(P8);mh[T6e]=bFk;}var HQe=new ByteArray();var nQg=new this.OKg("forcs@#$",P8);var OP2=new ByteArray();
nQg.Cl(OP2,0,P8.length-P8.position);HQe.writeBytes(OP2,0,OP2.length);HQe.position=0;return HQe;};Le.oa=function(P8,d5){var i;var ES5=d5.length;
P8.writeInt(ES5);var v;for(i=0; i<ES5; i++){v=d5.charCodeAt(i);P8.writeByte((v>>>8)&255);P8.writeByte((v>>>0)&255);}};Le.JM=function(P8){var ES5;
var DvY,beT;ES5=P8.readInt();if(ES5==-1){return "<NULL>";}else{if(ES5<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var d5="";var position=P8.position;for(var i=0; i<ES5; i++){DvY=P8[position+i*2];beT=P8[position+i*2+1];if((DvY|beT)<0){throw new Error("A malformed string has been read in a data input stream.");
}d5+=String.fromCharCode((DvY<<8)+(beT<<0));}P8.position+=ES5*2;return d5;};var OKg=function(JU,uiM){if(this.uvC){this.uvC(JU,uiM);return;}var oEe=OKg.prototype;
oEe.uvC=function(JU,uiM){this.Yqn=JU;this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.j5=0;this.wlg=0;this.Goe=0;this.i=0;this.y8e=0;this.Txe=new Array();
this.QjZ=0;this.CjZ=0;this.ASk=0;this.Lv=uiM;this.UXe=new ByteArray();this.UXe.setLength(17);var KMe=new ByteArray();KMe.writeMultiByte(JU,"iso-8859-1");
this.UXe.writeBytes(KMe,0,KMe.length>16?16:KMe.length);this.UXe.set(16,0);this.clear();};oEe.clear=function(){this.ax=0;this.bx=0;this.cx=0;this.dx=0;
this.si=0;this.j5=0;this.wlg=0;this.Goe=0;this.i=0;this.y8e=0;this.QjZ=0;this.CjZ=0;this.ASk=0;for(var i=0; i<8; i++){this.Txe[i]=0;}};oEe.tTT=function(){
var c=this.Lv.readByte();if(c==-1){return -1;}this.DNZ();this.QjZ=this.y8e>>>8;this.CjZ=this.y8e&255;c=c^(this.QjZ^this.CjZ);for(this.ASk=0; this.ASk<=15; this.ASk++){
this.UXe.set(this.ASk,this.UXe.get(this.ASk)^c);}return c;};oEe.Cl=function(b,off,KT,OPk){if(b===undefined){b=null;}if(off===undefined){off=-1;
}if(KT===undefined){KT=-1;}if(OPk===undefined){OPk=-1;}if((b==null)||this.Lv==null){Vie("Null point exception");return -1;}if(KT<1){return 0;
}this.Lv.readBytes(b,off,KT);var rt=KT;if(rt<=0){return rt;}var c=0;var i=0;for(i=0; i<rt; i++){this.DNZ();this.QjZ=this.y8e>>>8;this.CjZ=this.y8e&255;
c=b.get(i+off);c=c^(this.QjZ^this.CjZ);for(var j=0; j<16; j++){this.UXe.set(j,this.UXe.get(j)^c);}b.set(i+off,c);}return rt;};oEe.Is=function(){
return 0;};oEe.Ydk=function(){this.dx=this.wlg+this.i;this.ax=this.Txe[this.i];this.cx=346;this.bx=20021;this.j5=this.ax;this.ax=this.si;this.si=this.j5;
this.j5=this.ax;this.ax=this.dx;this.dx=this.j5;this.ax=this.ax*this.bx&65535;this.j5=this.ax;this.ax=this.cx;this.cx=this.j5;if(this.ax!=0){
this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;}this.j5=this.ax;this.ax=this.si;this.si=this.j5;this.ax=(this.ax*this.bx)&65535;
this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.wlg=this.dx;this.Txe[this.i]=this.ax;this.Goe=this.ax^this.dx;this.i=this.i+1;};oEe.DNZ=function(){
this.Txe[0]=(this.UXe.get(0)*256)+this.UXe.get(1);this.Ydk();this.y8e=this.Goe;this.Txe[1]=this.Txe[0]^((this.UXe.get(2)*256)+this.UXe.get(3));
this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[2]=this.Txe[1]^((this.UXe.get(4)*256)+this.UXe.get(5));this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[3]=this.Txe[2]^((this.UXe.get(6)*256)+this.UXe.get(7));
this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[4]=this.Txe[3]^((this.UXe.get(8)*256)+this.UXe.get(9));this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[5]=this.Txe[4]^((this.UXe.get(10)*256)+this.UXe.get(11));
this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[6]=this.Txe[5]^((this.UXe.get(12)*256)+this.UXe.get(13));this.Ydk();this.y8e=this.y8e^this.Goe;
this.Txe[7]=this.Txe[6]^((this.UXe.get(14)*256)+this.UXe.get(15));this.Ydk();this.y8e=this.y8e^this.Goe;this.i=0;};this.uvC(JU,uiM);};Le.OKg=OKg;
var bKg=function(JU,VhH){if(this.nvC){this.nvC(JU,VhH);return;}var oEe=bKg.prototype;oEe.nvC=function(JU,VhH){this.ax=0;this.bx=0;this.cx=0;this.dx=0;
this.si=0;this.j5=0;this.wlg=0;this.Goe=0;this.i=0;this.y8e=0;this.Txe=new Array();this.QjZ=0;this.CjZ=0;this.ASk=0;this.Gq=VhH;this.Txe.length=8;
this.UXe=new ByteArray();this.UXe.setLength(17);var KMe=new ByteArray();KMe.writeMultiByte(JU,"iso-8859-1");this.UXe.writeBytes(KMe,0,KMe.length>16?16:KMe.length);
this.UXe.set(16,0);this.clear();};oEe.clear=function(){this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.j5=0;this.wlg=0;this.Goe=0;this.i=0;
this.y8e=0;this.QjZ=0;this.CjZ=0;this.ASk=0;for(var i=0; i<8; i++){this.Txe[i]=0;}};oEe.QSe=function(b){this.DNZ();this.QjZ=this.y8e>>>8;this.CjZ=this.y8e&255;
for(this.ASk=0; this.ASk<=15; this.ASk++){this.UXe.set(this.ASk,this.UXe.get(this.ASk)^b);}b=b^(this.QjZ^this.CjZ);this.Gq.writeByte(b);};oEe.write=function(b,off,KT){
if(b===undefined){b=null;}if(off===undefined){off=-1;}if(KT===undefined){KT=-1;}if((b==null)||this.Gq==null){Vie("Null point exception");return;
}if(KT<1){return;}var c=0;var PWZ=new ByteArray();PWZ.setLength(KT);for(var i=0; i<KT; i++){this.DNZ();this.QjZ=this.y8e>>>8;this.CjZ=this.y8e&255;
c=b.get(i+off);for(var j=0; j<16; j++){this.UXe.set(j,this.UXe.get(j)^c);}c=c^(this.QjZ^this.CjZ);PWZ.set(i,c);}this.Gq.writeBytes(PWZ,0,KT);
PWZ=null;};oEe.flush=function(){};oEe.close=function(){};oEe.Ydk=function(){this.dx=this.wlg+this.i;this.ax=this.Txe[this.i];this.cx=346;this.bx=20021;
this.j5=this.ax;this.ax=this.si;this.si=this.j5;this.j5=this.ax;this.ax=this.dx;this.dx=this.j5;this.ax=this.ax*this.bx&65535;this.j5=this.ax;
this.ax=this.cx;this.cx=this.j5;if(this.ax!=0){this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;}this.j5=this.ax;this.ax=this.si;
this.si=this.j5;this.ax=(this.ax*this.bx)&65535;this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.wlg=this.dx;this.Txe[this.i]=this.ax;this.Goe=this.ax^this.dx;
this.i=this.i+1;};oEe.DNZ=function(){this.Txe[0]=(this.UXe.get(0)*256)+this.UXe.get(1);this.Ydk();this.y8e=this.Goe;this.Txe[1]=this.Txe[0]^((this.UXe.get(2)*256)+this.UXe.get(3));
this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[2]=this.Txe[1]^((this.UXe.get(4)*256)+this.UXe.get(5));this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[3]=this.Txe[2]^((this.UXe.get(6)*256)+this.UXe.get(7));
this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[4]=this.Txe[3]^((this.UXe.get(8)*256)+this.UXe.get(9));this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[5]=this.Txe[4]^((this.UXe.get(10)*256)+this.UXe.get(11));
this.Ydk();this.y8e=this.y8e^this.Goe;this.Txe[6]=this.Txe[5]^((this.UXe.get(12)*256)+this.UXe.get(13));this.Ydk();this.y8e=this.y8e^this.Goe;
this.Txe[7]=this.Txe[6]^((this.UXe.get(14)*256)+this.UXe.get(15));this.Ydk();this.y8e=this.y8e^this.Goe;this.i=0;};this.nvC(JU,VhH);};Le.bKg=bKg;
this.GIe();};return ARK;})();
