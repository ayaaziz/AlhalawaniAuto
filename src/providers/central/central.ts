
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import php from 'php-serialize';
declare var Buffer: any;
var crypto = require('crypto');
declare function require(name:string);

/*
  Generated class for the CentralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  
*/
@Injectable()
export class CentralProvider {
  currentLang:any='ar'
  regid:any
  status:any
  appAccess:any;
  time:any;
  badge:any
  DeviceId:any;
  public apiKey = 'base64:v1ShGAmp2IOkG6vjD79Qe4GBoeZrkZvT4i2jYOdXPbs=';
  // public imgUrl='http://www.aldahayanautosa.com/aldahyan/public/images/'
  public imgUrl='http://alhalawani.aldahayanautosa.com/public/images/'

  public default='assets/imgs/default.png'
  public BASE_64_PREFIX='base64'
  // public serviceurl:string="http://www.aldahayanautosa.com/aldahyan/api/";
  public serviceurl:string="http://alhalawani.aldahayanautosa.com/api/";


  
  constructor(public http: HttpClient) {
    console.log('Hello CentralProvider Provider');
  }
  screen() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  decrypt(encryptedValue) {
    if (typeof this.apiKey === 'string' && this.apiKey.startsWith(this.BASE_64_PREFIX)) {
        this. apiKey = Buffer.from(this.apiKey.replace(this.BASE_64_PREFIX, ''), 'base64');
    }

    const main = JSON.parse(Buffer.from(encryptedValue, 'base64'));
    const iv = Buffer.from(main.iv, 'base64');

    // TODO Laravel does a bunch of checks to make sure the data was not tampered with.

    const decipher = crypto.createDecipheriv('AES-256-CBC', this.apiKey, iv);
    let payloadValue = decipher.update(main.value, 'base64', 'utf8');
    payloadValue += decipher.final('utf8');

    return php.unserialize(payloadValue);
}
encrypt(value) {
  if (typeof this.apiKey === 'string' && this.apiKey.startsWith(this.BASE_64_PREFIX)) {
      this.apiKey = Buffer.from(this.apiKey.replace(this.BASE_64_PREFIX, ''), 'base64');
  }

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('AES-256-CBC', this.apiKey, iv);
  let payloadValue = cipher.update(php.serialize(value), 'utf8', 'base64');
  payloadValue += cipher.final('base64');
  const ivStr = new Buffer(iv).toString('base64');
  const hmac = crypto.createHmac('sha256', this.apiKey);
  const mac = hmac.update(ivStr + payloadValue).digest('hex');
  return new Buffer(JSON.stringify({
      iv: ivStr,
      value: payloadValue,
      mac: mac
  })).toString('base64');
}
}
