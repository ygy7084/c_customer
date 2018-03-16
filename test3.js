const version = '2.7';
'use strict';
var izooto = { client: '22059', url_redirect: 'https://tracking.izooto.com/mnotifyRedirect.php?id=1&client=', fetchData: 'https://fetch.izooto.com/getCachedCampaignTemplate.php', requireInteraction: !0, logReciever: 'https://sw.izooto.com/sw.php', campData: null, debug: !1, ERROR_OP: 'error', VIEW_OP: 'view', CLICK_OP: 'click', log(a) { !0 === izooto.debug && console.log(a); } }; izooto.url_redirect += izooto.client; izooto.log(`SW ${version} : Debug mode on`);
function getCampaignLink(a, d) {
  izooto.log('getCampaignLink ---'); let c = izooto.url_redirect,
    b = d.substr(d.indexOf('?') + 1).split('&'); a == 'act' ? (b = b[0].split('='), c = b[0] == 'campUrl' ? decodeURIComponent(b[1]) : izooto.url_redirect) : a == 'act1' ? (b = b[1].split('='), c = b[0] == 'act1' ? decodeURIComponent(b[1]) : izooto.url_redirect) : a == 'act2' && (b = b[2].split('='), c = b[0] == 'act2' ? decodeURIComponent(b[1]) : izooto.url_redirect); return c;
}
function getEndPoint(a) {
  izooto.log('getEndpoint ---'); let d = 'https://android.googleapis.com/gcm/send/',
    c = a.endpoint; navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && (d = 'https://updates.push.services.mozilla.com/wpush/'); if (c.indexOf(d) === 0) return c.replace(d, ''); sendLog(izooto.logReciever, { client: izooto.client, op: izooto.ERROR_OP, endpoint: c, response: encodeURIComponent(`Endpoint Mismatch :: ${c}`) }); return a.subscriptionId;
}
function showNotification(a) {
  izooto.log('showNotification ---'); let d = a.campaignDetails.title,
    c = a.campaignDetails.message,
    b,
    f = a.campaignDetails.tag,
    e; a.campaignDetails.hasOwnProperty('reqInt') && a.campaignDetails.reqInt == 0 && (izooto.requireInteraction = !1); a.campaignDetails.hasOwnProperty('banner') && a.campaignDetails.banner != '' && (e = a.campaignDetails.banner); izooto.url_redirect = a.campaignDetails.link; izooto.url_redirect = izooto.url_redirect.replace('{BROWSERKEYID}', izooto.bKey); b = `${a.campaignDetails.icon
  }?campUrl=${encodeURIComponent(izooto.url_redirect)}`; return a.campaignDetails.act_num == 0 ? self.registration.showNotification(d, { body: c, icon: b, requireInteraction: izooto.requireInteraction, tag: f, image: e }) : a.campaignDetails.act_num == 1 ? (izooto.action_link1 = a.campaignDetails.act1link, izooto.action_link1 = izooto.action_link1.replace('{BROWSERKEYID}', izooto.bKey), self.registration.showNotification(d, { body: c,
    icon: `${b}&act1=${encodeURIComponent(izooto.action_link1)}`,
    requireInteraction: izooto.requireInteraction,
    tag: f,
    link: izooto.url_redirect,
    image: e,
    actions: [{ action: 'action1', title: a.campaignDetails.act1name }] })) : a.campaignDetails.act_num == 2 ? (izooto.action_link1 = a.campaignDetails.act1link, izooto.action_link1 = izooto.action_link1.replace('{BROWSERKEYID}', izooto.bKey), izooto.action_link2 = a.campaignDetails.act2link, izooto.action_link2 = izooto.action_link2.replace('{BROWSERKEYID}', izooto.bKey), self.registration.showNotification(d, { body: c,
    icon: `${b}&act1=${encodeURIComponent(izooto.action_link1)}&act2=${encodeURIComponent(izooto.action_link2)}`,
    requireInteraction: izooto.requireInteraction,
    tag: f,
    link: izooto.url_redirect,
    image: e,
    actions: [{ action: 'action1', title: a.campaignDetails.act1name }, { action: 'action2', title: a.campaignDetails.act2name }] })) : self.registration.showNotification(d, { body: c, icon: b, requireInteraction: izooto.requireInteraction, tag: f, image: e });
}
function sendLog(a, d) {
  let c = [],
    b; for (b in d)c.push(`${b}=${d[b]}`); c = `${a}?${c.join('&')}`; izooto.log(`--\x3e URL : ${a}`); izooto.log(`---\x3e Payload :${JSON.stringify(d, null, 4)}`); return fetch(c).catch((a) => { izooto.log(`Failed to send log, description : ${a}`); });
}
function logNotificationView(a, d) {
  try { a = JSON.parse(JSON.stringify(a)); } catch (b) { logError(b); }izooto.log('logNotificationView ---'); const c = { pid: izooto.client, bkey: izooto.bKey, cid: izooto.campData.campaignDetails.id, rid: izooto.campData.campaignDetails.rid, op: izooto.VIEW_OP, ver: version }; d || typeof a !== 'object' || void 0 === a.keys || (void 0 !== a.keys.auth && (c.auth = a.keys.auth), void 0 !== a.keys.p256dh && (c.pk = a.keys.p256dh)); c.pl = d ? 1 : 0; sendLog(izooto.logReciever, c).then((a) => {
    izooto.log('Notification view has been logged successfully : ');
    izooto.log(`Response code : ${a.status}`);
  });
} function logError(a) { izooto.log('logError ---'); console.error('izError', a.message); console.log(a.lineNumber); sendLog(izooto.logReciever, { pid: izooto.client, bkey: izooto.bKey, op: izooto.ERROR_OP, response: encodeURIComponent(a.message) }); } function logNotificationClick(a, d) { izooto.log('logNotificationClick ---'); sendLog(izooto.logReciever, { op: izooto.CLICK_OP, pid: izooto.client, action: a, url: encodeURIComponent(d) }); }
function validateCampaignData(a) { izooto.log('validateCampaignData ---'); if (!a && izooto.campData.error) throw Error(izooto.campData.error); if (!izooto.campData.campaignDetails) throw Error(`No ${a ? 'Payload ' : ''}json return`); if (!izooto.campData.campaignDetails.hasOwnProperty('title') || !izooto.campData.campaignDetails.hasOwnProperty('message')) throw Error('Incomplete Json'); }
self.addEventListener('push', (a) => {
  izooto.log('pushEvent ---'); a.waitUntil(self.registration.pushManager.getSubscription().then((d) => {
    izooto.bKey = getEndPoint(d); if (a.data) try { try { var c = a.data.json(); } catch (b) { throw Error(`Invalid push : ${b.message}`); }izooto.campData = c; validateCampaignData(!0); console.log('Push data validated'); return showNotification(c).then((a) => { logNotificationView(d, !0); }); } catch (b) { logError(b); } else {
      return izooto.fetchDataURL = `${izooto.fetchData}?client=${izooto.client
      }&bkey=${izooto.bKey}`, izooto.log(`Fetching campaign data from : ${izooto.fetchDataURL}`), fetch(izooto.fetchDataURL).then((a) => { if (a.status !== 200) throw console.log(`Looks like there was a problem. Status Code: ${a.status}`), Error(`Status Code: ${a.status}`); return a.json().then((a) => { izooto.campData = a; validateCampaignData(!1); return showNotification(a).then((a) => { logNotificationView(d, !1); }); }); }).catch(logError);
    }
  }));
});
self.addEventListener('notificationclick', (a) => {
  izooto.log('notificationClick event ---'); a.notification.close(); izooto.url_redirect = a.action === 'action1' ? getCampaignLink('act1', a.notification.icon) : a.action === 'action2' ? getCampaignLink('act2', a.notification.icon) : getCampaignLink('act', a.notification.icon); a.waitUntil(clients.matchAll({ type: 'window' }).then((a) => { for (let c = 0; c < a.length; c++) { const b = a[c]; if (b.url === izooto.url_redirect && 'focus' in b) return b.focus(); } if (clients.openWindow) return clients.openWindow(izooto.url_redirect); }));
  try { logNotificationClick(a.action, izooto.url_redirect); } catch (d) { izooto.log(`Logging error : ${d}`); }
});
