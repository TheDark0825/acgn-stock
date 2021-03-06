import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';
import { dbCompanyArchive } from '/db/dbCompanyArchive';


export const pageNameHash = {
  mainPage: '首頁',
  announcementList: '系統公告',
  tutorial: '遊戲規則',
  instantMessage: '即時訊息',
  companyList: '股市總覽',
  foundationList: '新創計劃',
  advertising: '廣告宣傳',
  productCenterBySeason: '產品中心',
  productCenterByCompany: '產品中心',
  arenaInfo: '最萌亂鬥大賽',
  seasonalReport: '季度報告',
  accountInfo: '帳號資訊',
  ruleAgendaList: '規則討論',
  violationCaseList: '違規案件列表',
  fscLogs: '金管會執行紀錄',
  fscStock: '金管會持股'
};

// default route
FlowRouter.route('/', {
  name: 'mainPage',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName);
  }
});

const announcementRoute = FlowRouter.group({
  prefix: '/announcement',
  name: 'announcementRoute'
});
announcementRoute.route('/', {
  name: 'announcementList',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 系統公告`);
  }
});
announcementRoute.route('/view/:announcementId', {
  name: 'announcementDetail',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 系統公告內容`);
  }
});
announcementRoute.route('/new', {
  name: 'createAnnouncement',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 新增系統公告`);
  }
});
announcementRoute.route('/reject/:announcementId', {
  name: 'rejectAnnouncement',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 系統公告否決`);
  }
});

const violationRoute = FlowRouter.group({
  prefix: '/violation',
  name: 'violationRoute'
});
violationRoute.route('/', {
  name: 'violationCaseList',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 違規案件列表`);
  }
});
violationRoute.route('/report', {
  name: 'reportViolation',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 舉報違規`);
  }
});
violationRoute.route('/view/:violationCaseId', {
  name: 'violationCaseDetail',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 違規案件內容`);
  }
});

FlowRouter.route('/fscLogs', {
  name: 'fscLogs',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 違規處置紀錄`);
  }
});

FlowRouter.route('/fscStock', {
  name: 'fscStock',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 金管會持股');
  }
});

FlowRouter.route('/tutorial', {
  name: 'tutorial',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 遊戲規則');
  }
});

FlowRouter.route('/instantMessage', {
  name: 'instantMessage',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 即時訊息');
  }
});

const companyRoute = FlowRouter.group({
  prefix: '/company',
  name: 'companyRoute'
});
companyRoute.route('/', {
  name: 'companyListRedirect',
  triggersEnter: [
    (context, redirect) => {
      redirect('/company/1');
    }
  ]
});
companyRoute.route('/:page', {
  name: 'companyList',
  action(params) {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 股市總覽');
    if (Meteor.isClient) {
      const { rCompanyOffset } = require('/client/company/companyList');
      const page = window.parseInt(params.page, 10) || 1;
      const offset = (page - 1) * 12;
      rCompanyOffset.set(offset);
    }
  }
});
companyRoute.route('/detail/:companyId', {
  name: 'companyDetail',
  action(params) {
    if (Meteor.isServer) {
      const companyArchiveData = companyArchiveData.findOne(params.companyId, {
        fields: {
          companyName: 1
        }
      });
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 「' + companyArchiveData.companyName + '」公司資訊');
    }
    else {
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 公司資訊');
    }
  }
});
FlowRouter.route('/edit/:companyId', {
  name: 'editCompany',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 經營管理');
  }
});

const foundationRoute = FlowRouter.group({
  prefix: '/foundation',
  name: 'foundationRoute'
});
foundationRoute.route('/', {
  name: 'foundationRedirect',
  triggersEnter: [
    (context, redirect) => {
      redirect('/foundation/1');
    }
  ]
});
foundationRoute.route('/:page', {
  name: 'foundationList',
  action(params) {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 新創計劃');
    if (Meteor.isClient) {
      const { rFoundationOffset } = require('/client/foundation/foundationList');
      const page = window.parseInt(params.page, 10) || 1;
      const offset = (page - 1) * 12;
      rFoundationOffset.set(offset);
    }
  }
});
foundationRoute.route('/view/:foundationId', {
  name: 'foundationDetail',
  action(params) {
    if (Meteor.isServer) {
      const companyArchiveData = companyArchiveData.findOne(params.foundationId, {
        fields: {
          companyName: 1
        }
      });
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 「' + companyArchiveData.companyName + '」公司資訊');
    }
    else {
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 新創計劃資訊');
    }
  }
});
foundationRoute.route('/edit/new', {
  name: 'createFoundationPlan',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 發起新創計劃');
  }
});
foundationRoute.route('/edit/:foundationId', {
  name: 'editFoundationPlan',
  action() {
    if (Meteor.isClient) {
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 編輯新創計劃');
    }
  }
});

const productCenterRoute = FlowRouter.group({
  prefix: '/productCenter',
  name: 'productCenterRoute'
});
productCenterRoute.route('/season/:seasonId', {
  name: 'productCenterBySeason',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 產品中心');
  }
});
productCenterRoute.route('/company/:companyId', {
  name: 'productCenterByCompany',
  action(params) {
    if (Meteor.isServer) {
      const companyArchiveData = dbCompanyArchive.findOne(params.companyId, {
        fields: {
          companyName: 1
        }
      });
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 產品中心 - ' + companyArchiveData.companyName);
    }
    else {
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 產品中心');
    }
  }
});

FlowRouter.route('/advertising', {
  name: 'advertising',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 廣告宣傳');
  }
});

const arenaInfoRoute = FlowRouter.group({
  prefix: '/arenaInfo',
  name: 'arenaInfoRoute'
});
arenaInfoRoute.route('/', {
  name: 'arenaInfoRedirect',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 最萌亂鬥大賽');
  }
});
arenaInfoRoute.route('/:arenaId', {
  name: 'arenaInfo',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 最萌亂鬥大賽');
  }
});

const seasonalReportRoute = FlowRouter.group({
  prefix: '/seasonalReport',
  name: 'seasonalReportRoute'
});
seasonalReportRoute.route('/', {
  name: 'seasonalReportRedirect',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 季度報告');
  }
});
seasonalReportRoute.route('/:seasonId', {
  name: 'seasonalReport',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 季度報告');
  }
});

const accountInfoRoute = FlowRouter.group({
  prefix: '/accountInfo',
  name: 'accountInfoRoute'
});
accountInfoRoute.route('/', {
  name: 'accountInfo',
  triggersEnter: [
    (context, redirect) => {
      if (Meteor.isClient) {
        const user = Meteor.user();
        if (user) {
          redirect('/accountInfo/' + user._id);
        }
      }
    }
  ]
});
accountInfoRoute.route('/:userId', {
  name: 'accountInfo',
  action(params) {
    if (Meteor.isServer) {
      const user = Meteor.users.findOne(params.userId, {
        fields: {
          'profile.name': 1
        }
      });
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 「' + user.profile.name + '」帳號資訊');
    }
    else {
      DocHead.setTitle(Meteor.settings.public.websiteName + ' - 帳號資訊');
    }
  }
});

const ruleDiscussRoute = FlowRouter.group({
  prefix: '/ruleDiscuss',
  name: 'ruleDiscussRoute'
});
ruleDiscussRoute.route('/', {
  name: 'ruleDiscussRedirect',
  triggersEnter: [
    (context, redirect) => {
      redirect('/ruleDiscuss/list');
    }
  ]
});
ruleDiscussRoute.route('/list', {
  name: 'ruleAgendaList',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 規則討論');
  }
});
ruleDiscussRoute.route('/new', {
  name: 'createRuleAgenda',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 建立新議程');
  }
});
ruleDiscussRoute.route('/view/:agendaId', {
  name: 'ruleAgendaDetail',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 議程資訊');
  }
});
ruleDiscussRoute.route('/vote/:agendaId', {
  name: 'ruleAgendaVote',
  action() {
    DocHead.setTitle(Meteor.settings.public.websiteName + ' - 議程投票');
  }
});

// 控制中心
const controlCenterRoute = FlowRouter.group({
  prefix: '/controlCenter',
  name: 'controlCenterRoute'
});
controlCenterRoute.route('/sendGift', {
  name: 'controlCenterSendGift',
  action() {
    DocHead.setTitle(`${Meteor.settings.public.websiteName} - 控制中心 - 發送禮物`);
  }
});
