/*
Design By : Lori LikTik (Aslori)
Facebook   : https://www.facebook.com/aslori2
Type : Premium (Not Free)
*/

var KeyAslori=KeyAslori||function(t,e){var n={},r=n.lib={},i=r.Base=function(){function t(){}return{extend:function(e){t.prototype=this;var n=new t;return e&&n.mixIn(e),n.hasOwnProperty("init")||(n.init=function(){n.$super.init.apply(this,arguments)}),n.init.prototype=n,n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),a=r.WordArray=i.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||o).stringify(this)},concat:function(t){var e=this.words,n=t.words,r=this.sigBytes,i=t.sigBytes;if(this.clamp(),r%4)for(var a=0;i>a;a++){var s=n[a>>>2]>>>24-a%4*8&255;e[r+a>>>2]|=s<<24-(r+a)%4*8}else if(n.length>65535)for(a=0;i>a;a+=4)e[r+a>>>2]=n[a>>>2];else e.push.apply(e,n);return this.sigBytes+=i,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-n%4*8,e.length=t.ceil(n/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var n=[],r=0;e>r;r+=4)n.push(4294967296*t.random()|0);return new a.init(n,e)}}),s=n.enc={},o=s.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],i=0;n>i;i++){var a=e[i>>>2]>>>24-i%4*8&255;r.push((a>>>4).toString(16)),r.push((15&a).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;e>r;r+=2)n[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new a.init(n,e/2)}},c=s.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],i=0;n>i;i++){var a=e[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(a))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;e>r;r++)n[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new a.init(n,e)}},u=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},f=r.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=u.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var n=this._data,r=n.words,i=n.sigBytes,s=this.blockSize,o=i/(4*s),c=(o=e?t.ceil(o):t.max((0|o)-this._minBufferSize,0))*s,u=t.min(4*c,i);if(c){for(var f=0;c>f;f+=s)this._doProcessBlock(r,f);var h=r.splice(0,c);n.sigBytes-=u}return new a.init(h,u)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),h=(r.Hasher=f.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new h.HMAC.init(t,n).finalize(e)}}}),n.algo={});return n}(Math);!function(){var t=KeyAslori,e=t.lib.WordArray;t.enc.Base64={stringify:function(t){var e=t.words,n=t.sigBytes,r=this._map;t.clamp();for(var i=[],a=0;n>a;a+=3)for(var s=(e[a>>>2]>>>24-a%4*8&255)<<16|(e[a+1>>>2]>>>24-(a+1)%4*8&255)<<8|e[a+2>>>2]>>>24-(a+2)%4*8&255,o=0;4>o&&n>a+.75*o;o++)i.push(r.charAt(s>>>6*(3-o)&63));var c=r.charAt(64);if(c)for(;i.length%4;)i.push(c);return i.join("")},parse:function(t){var n=t.length,r=this._map,i=r.charAt(64);if(i){var a=t.indexOf(i);-1!=a&&(n=a)}for(var s=[],o=0,c=0;n>c;c++)if(c%4){var u=r.indexOf(t.charAt(c-1))<<c%4*2,f=r.indexOf(t.charAt(c))>>>6-c%4*2;s[o>>>2]|=(u|f)<<24-o%4*8,o++}return e.create(s,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(t){function e(t,e,n,r,i,a,s){var o=t+(e&n|~e&r)+i+s;return(o<<a|o>>>32-a)+e}function n(t,e,n,r,i,a,s){var o=t+(e&r|n&~r)+i+s;return(o<<a|o>>>32-a)+e}function r(t,e,n,r,i,a,s){var o=t+(e^n^r)+i+s;return(o<<a|o>>>32-a)+e}function i(t,e,n,r,i,a,s){var o=t+(n^(e|~r))+i+s;return(o<<a|o>>>32-a)+e}var a=KeyAslori,s=a.lib,o=s.WordArray,c=s.Hasher,u=a.algo,f=[];!function(){for(var e=0;64>e;e++)f[e]=4294967296*t.abs(t.sin(e+1))|0}();var h=u.MD5=c.extend({_doReset:function(){this._hash=new o.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,a){for(var s=0;16>s;s++){var o=a+s,c=t[o];t[o]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}var u=this._hash.words,h=t[a+0],d=t[a+1],l=t[a+2],p=t[a+3],g=t[a+4],v=t[a+5],_=t[a+6],y=t[a+7],k=t[a+8],B=t[a+9],m=t[a+10],x=t[a+11],b=t[a+12],S=t[a+13],z=t[a+14],w=t[a+15],C=u[0],M=u[1],D=u[2],O=u[3];C=e(C,M,D,O,h,7,f[0]),O=e(O,C,M,D,d,12,f[1]),D=e(D,O,C,M,l,17,f[2]),M=e(M,D,O,C,p,22,f[3]),C=e(C,M,D,O,g,7,f[4]),O=e(O,C,M,D,v,12,f[5]),D=e(D,O,C,M,_,17,f[6]),M=e(M,D,O,C,y,22,f[7]),C=e(C,M,D,O,k,7,f[8]),O=e(O,C,M,D,B,12,f[9]),D=e(D,O,C,M,m,17,f[10]),M=e(M,D,O,C,x,22,f[11]),C=e(C,M,D,O,b,7,f[12]),O=e(O,C,M,D,S,12,f[13]),D=e(D,O,C,M,z,17,f[14]),C=n(C,M=e(M,D,O,C,w,22,f[15]),D,O,d,5,f[16]),O=n(O,C,M,D,_,9,f[17]),D=n(D,O,C,M,x,14,f[18]),M=n(M,D,O,C,h,20,f[19]),C=n(C,M,D,O,v,5,f[20]),O=n(O,C,M,D,m,9,f[21]),D=n(D,O,C,M,w,14,f[22]),M=n(M,D,O,C,g,20,f[23]),C=n(C,M,D,O,B,5,f[24]),O=n(O,C,M,D,z,9,f[25]),D=n(D,O,C,M,p,14,f[26]),M=n(M,D,O,C,k,20,f[27]),C=n(C,M,D,O,S,5,f[28]),O=n(O,C,M,D,l,9,f[29]),D=n(D,O,C,M,y,14,f[30]),C=r(C,M=n(M,D,O,C,b,20,f[31]),D,O,v,4,f[32]),O=r(O,C,M,D,k,11,f[33]),D=r(D,O,C,M,x,16,f[34]),M=r(M,D,O,C,z,23,f[35]),C=r(C,M,D,O,d,4,f[36]),O=r(O,C,M,D,g,11,f[37]),D=r(D,O,C,M,y,16,f[38]),M=r(M,D,O,C,m,23,f[39]),C=r(C,M,D,O,S,4,f[40]),O=r(O,C,M,D,h,11,f[41]),D=r(D,O,C,M,p,16,f[42]),M=r(M,D,O,C,_,23,f[43]),C=r(C,M,D,O,B,4,f[44]),O=r(O,C,M,D,b,11,f[45]),D=r(D,O,C,M,w,16,f[46]),C=i(C,M=r(M,D,O,C,l,23,f[47]),D,O,h,6,f[48]),O=i(O,C,M,D,y,10,f[49]),D=i(D,O,C,M,z,15,f[50]),M=i(M,D,O,C,v,21,f[51]),C=i(C,M,D,O,b,6,f[52]),O=i(O,C,M,D,p,10,f[53]),D=i(D,O,C,M,m,15,f[54]),M=i(M,D,O,C,d,21,f[55]),C=i(C,M,D,O,k,6,f[56]),O=i(O,C,M,D,w,10,f[57]),D=i(D,O,C,M,_,15,f[58]),M=i(M,D,O,C,S,21,f[59]),C=i(C,M,D,O,g,6,f[60]),O=i(O,C,M,D,x,10,f[61]),D=i(D,O,C,M,l,15,f[62]),M=i(M,D,O,C,B,21,f[63]),u[0]=u[0]+C|0,u[1]=u[1]+M|0,u[2]=u[2]+D|0,u[3]=u[3]+O|0},_doFinalize:function(){var e=this._data,n=e.words,r=8*this._nDataBytes,i=8*e.sigBytes;n[i>>>5]|=128<<24-i%32;var a=t.floor(r/4294967296),s=r;n[15+(i+64>>>9<<4)]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8),n[14+(i+64>>>9<<4)]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),e.sigBytes=4*(n.length+1),this._process();for(var o=this._hash,c=o.words,u=0;4>u;u++){var f=c[u];c[u]=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8)}return o},clone:function(){var t=c.clone.call(this);return t._hash=this._hash.clone(),t}});a.MD5=c._createHelper(h),a.HmacMD5=c._createHmacHelper(h)}(Math),function(){var t=KeyAslori,e=t.lib,n=e.Base,r=e.WordArray,i=t.algo,a=i.MD5,s=i.EvpKDF=n.extend({cfg:n.extend({keySize:4,hasher:a,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var n=this.cfg,i=n.hasher.create(),a=r.create(),s=a.words,o=n.keySize,c=n.iterations;s.length<o;){u&&i.update(u);var u=i.update(t).finalize(e);i.reset();for(var f=1;c>f;f++)u=i.finalize(u),i.reset();a.concat(u)}return a.sigBytes=4*o,a}});t.EvpKDF=function(t,e,n){return s.create(n).compute(t,e)}}(),KeyAslori.lib.Cipher||function(t){var e=KeyAslori,n=e.lib,r=n.Base,i=n.WordArray,a=n.BufferedBlockAlgorithm,s=e.enc,o=(s.Utf8,s.Base64),c=e.algo.EvpKDF,u=n.Cipher=a.extend({cfg:r.extend(),createamankanor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createbukaor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,n){this.cfg=this.cfg.extend(n),this._xformMode=t,this._key=e,this.reset()},reset:function(){a.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?y:v}return function(e){return{amankan:function(n,r,i){return t(r).amankan(e,n,r,i)},buka:function(n,r,i){return t(r).buka(e,n,r,i)}}}}()}),f=(n.StreamCipher=u.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),e.mode={}),h=n.BlockCipherMode=r.extend({createamankanor:function(t,e){return this.amankanor.create(t,e)},createbukaor:function(t,e){return this.bukaor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),d=f.CBC=function(){function e(e,n,r){var i=this._iv;if(i){var a=i;this._iv=t}else a=this._prevBlock;for(var s=0;r>s;s++)e[n+s]^=a[s]}var n=h.extend();return n.amankanor=n.extend({processBlock:function(t,n){var r=this._cipher,i=r.blockSize;e.call(this,t,n,i),r.amankanBlock(t,n),this._prevBlock=t.slice(n,n+i)}}),n.bukaor=n.extend({processBlock:function(t,n){var r=this._cipher,i=r.blockSize,a=t.slice(n,n+i);r.bukaBlock(t,n),e.call(this,t,n,i),this._prevBlock=a}}),n}(),l=(e.pad={}).Pkcs7={pad:function(t,e){for(var n=4*e,r=n-t.sigBytes%n,a=r<<24|r<<16|r<<8|r,s=[],o=0;r>o;o+=4)s.push(a);var c=i.create(s,r);t.concat(c)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},p=(n.BlockCipher=u.extend({cfg:u.cfg.extend({mode:d,padding:l}),reset:function(){u.reset.call(this);var t=this.cfg,e=t.iv,n=t.mode;if(this._xformMode==this._ENC_XFORM_MODE)var r=n.createamankanor;else{r=n.createbukaor;this._minBufferSize=1}this._mode=r.call(n,this,e&&e.words)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var e=this._process(!0)}else{e=this._process(!0);t.unpad(e)}return e},blockSize:4}),n.CipherParams=r.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),g=(e.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,n=t.salt;if(n)var r=i.create([1398893684,1701076831]).concat(n).concat(e);else r=e;return r.toString(o)},parse:function(t){var e=o.parse(t),n=e.words;if(1398893684==n[0]&&1701076831==n[1]){var r=i.create(n.slice(2,4));n.splice(0,4),e.sigBytes-=16}return p.create({ciphertext:e,salt:r})}},v=n.SerializableCipher=r.extend({cfg:r.extend({format:g}),amankan:function(t,e,n,r){r=this.cfg.extend(r);var i=t.createamankanor(n,r),a=i.finalize(e),s=i.cfg;return p.create({ciphertext:a,key:n,iv:s.iv,algorithm:t,mode:s.mode,padding:s.padding,blockSize:t.blockSize,formatter:r.format})},buka:function(t,e,n,r){return r=this.cfg.extend(r),e=this._parse(e,r.format),t.createbukaor(n,r).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),_=(e.kdf={}).OpenSSL={execute:function(t,e,n,r){r||(r=i.random(8));var a=c.create({keySize:e+n}).compute(t,r),s=i.create(a.words.slice(e),4*n);return a.sigBytes=4*e,p.create({key:a,iv:s,salt:r})}},y=n.PasswordBasedCipher=v.extend({cfg:v.cfg.extend({kdf:_}),amankan:function(t,e,n,r){var i=(r=this.cfg.extend(r)).kdf.execute(n,t.keySize,t.ivSize);r.iv=i.iv;var a=v.amankan.call(this,t,e,i.key,r);return a.mixIn(i),a},buka:function(t,e,n,r){r=this.cfg.extend(r),e=this._parse(e,r.format);var i=r.kdf.execute(n,t.keySize,t.ivSize,e.salt);return r.iv=i.iv,v.buka.call(this,t,e,i.key,r)}})}(),function(){var t=KeyAslori,e=t.lib.BlockCipher,n=t.algo,r=[],i=[],a=[],s=[],o=[],c=[],u=[],f=[],h=[],d=[];!function(){for(var t=[],e=0;256>e;e++)t[e]=128>e?e<<1:e<<1^283;var n=0,l=0;for(e=0;256>e;e++){var p=l^l<<1^l<<2^l<<3^l<<4;p=p>>>8^255&p^99,r[n]=p,i[p]=n;var g=t[n],v=t[g],_=t[v],y=257*t[p]^16843008*p;a[n]=y<<24|y>>>8,s[n]=y<<16|y>>>16,o[n]=y<<8|y>>>24,c[n]=y;y=16843009*_^65537*v^257*g^16843008*n;u[p]=y<<24|y>>>8,f[p]=y<<16|y>>>16,h[p]=y<<8|y>>>24,d[p]=y,n?(n=g^t[t[t[_^g]]],l^=t[t[l]]):n=l=1}}();var l=[0,1,2,4,8,16,32,64,128,27,54],p=n.ABDI=e.extend({_doReset:function(){for(var t=this._key,e=t.words,n=t.sigBytes/4,i=4*((this._nRounds=n+6)+1),a=this._keySchedule=[],s=0;i>s;s++)if(n>s)a[s]=e[s];else{var o=a[s-1];s%n?n>6&&s%n==4&&(o=r[o>>>24]<<24|r[o>>>16&255]<<16|r[o>>>8&255]<<8|r[255&o]):(o=r[(o=o<<8|o>>>24)>>>24]<<24|r[o>>>16&255]<<16|r[o>>>8&255]<<8|r[255&o],o^=l[s/n|0]<<24),a[s]=a[s-n]^o}for(var c=this._invKeySchedule=[],p=0;i>p;p++){s=i-p;if(p%4)o=a[s];else o=a[s-4];c[p]=4>p||4>=s?o:u[r[o>>>24]]^f[r[o>>>16&255]]^h[r[o>>>8&255]]^d[r[255&o]]}},amankanBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,a,s,o,c,r)},bukaBlock:function(t,e){var n=t[e+1];t[e+1]=t[e+3],t[e+3]=n,this._doCryptBlock(t,e,this._invKeySchedule,u,f,h,d,i);n=t[e+1];t[e+1]=t[e+3],t[e+3]=n},_doCryptBlock:function(t,e,n,r,i,a,s,o){for(var c=this._nRounds,u=t[e]^n[0],f=t[e+1]^n[1],h=t[e+2]^n[2],d=t[e+3]^n[3],l=4,p=1;c>p;p++){var g=r[u>>>24]^i[f>>>16&255]^a[h>>>8&255]^s[255&d]^n[l++],v=r[f>>>24]^i[h>>>16&255]^a[d>>>8&255]^s[255&u]^n[l++],_=r[h>>>24]^i[d>>>16&255]^a[u>>>8&255]^s[255&f]^n[l++],y=r[d>>>24]^i[u>>>16&255]^a[f>>>8&255]^s[255&h]^n[l++];u=g,f=v,h=_,d=y}g=(o[u>>>24]<<24|o[f>>>16&255]<<16|o[h>>>8&255]<<8|o[255&d])^n[l++],v=(o[f>>>24]<<24|o[h>>>16&255]<<16|o[d>>>8&255]<<8|o[255&u])^n[l++],_=(o[h>>>24]<<24|o[d>>>16&255]<<16|o[u>>>8&255]<<8|o[255&f])^n[l++],y=(o[d>>>24]<<24|o[u>>>16&255]<<16|o[f>>>8&255]<<8|o[255&h])^n[l++];t[e]=g,t[e+1]=v,t[e+2]=_,t[e+3]=y},keySize:8});t.ABDI=e._createHelper(p)}();var MantanCoding={};function t(t){return t.replace(/^\s+/,"").replace(/\s+$/,"")}!function(t){"use strict";t.formatter={prefix:"",stringify:function(t){var e=this.prefix;return(e+=t.salt.toString())+t.ciphertext.toString()},parse:function(t){var e=KeyAslori.lib.CipherParams.create({}),n=this.prefix.length;return 0!==t.indexOf(this.prefix)?e:(e.ciphertext=KeyAslori.enc.Hex.parse(t.substring(16+n)),e.salt=KeyAslori.enc.Hex.parse(t.substring(n,16+n)),e)}},t.amankan=function(e,n){try{return KeyAslori.ABDI.amankan(e,n,{format:t.formatter}).toString()}catch(t){return""}},t.buka=function(e,n){try{return KeyAslori.ABDI.buka(e,n,{format:t.formatter}).toString(KeyAslori.enc.Utf8)}catch(t){return""}}}(MantanCoding);
