/**
 * Created by mac on 26/06/2017.
 */
import jsonp from '../../common/js/jsonp';
import {commonParams, options} from './config';

export function getRec () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });
  return jsonp(url, data, options);
}