'use strict';
export const config = {
  websiteName: 'PTT ACGN股票交易市場', //網站名稱
  intervalTimer: 60000, //每隔多少微秒進行一次工作檢查
  paySalaryCounter: 180, //每隔多少次工作檢查就付多少薪水給所有驗證通過的使用者
  releaseStocksForHighPriceMinCounter: 30, //公司檢查是否要釋出股票的最小隨機工作檢查次數
  releaseStocksForHighPriceMaxCounter: 60, //公司檢查是否要釋出股票的最大隨機工作檢查次數
  releaseStocksForNoDealMinCounter: 360, //公司檢查是否要釋出股票的最小隨機工作檢查次數
  releaseStocksForNoDealMaxCounter: 720, //公司檢查是否要釋出股票的最大隨機工作檢查次數
  recordListPriceMinCounter: 60, //為所有公司紀錄參考價格的最小隨機工作檢查次數
  recordListPriceMaxCounter: 120, //為所有公司紀錄參考價格的最大隨機工作檢查次數
  foundExpireTime: 3600000, //創立公司的投資時間期限，單位為微秒
  foundationNeedUsers: 10, //創立公司所需要的投資人數量
  minReleaseStock: 1000, //公司初創時的最小釋出股份數量(可能會有些微誤差)
  beginMoney: 10000, //所有使用者驗證通過後的起始資金數量
  salaryPerPay: 1000, //所有驗證通過的使用者每隔一段時間可以固定領取的薪資數量
  seasonTime: 86400000, //每個商業季度的持續時間，單位為微秒
  seasonProfitPerUser: 2000, //每個商業季度、每個驗證的使用者的「所有推薦票加總」將產生多少可能營利額
  managerProfitPercent: 0.05, //經理人獲得公司營利分紅的比例
  costFromProfit: 0.05, //系統將扣除多少公司的營利做為公司營運成本
  displayAdvertisingNumber: 5, //同時最多顯示的廣告筆數
  advertisingExpireTime: 86400000 //廣告持續時間，單位為微秒
};
export default config;
