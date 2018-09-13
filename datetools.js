/**
 * 日期工具类
 * 
 * ----------------------------
 * @version v0.2 
 * @author 关彦明
 * @date 2016-07-25
 * 1、增加了绑定区间选项方法 DateTools.bindSelectFast("id");
 * 2、增加了按选项获取区间值方法 DateTools.getBeginEndDateByKind(intValue);
 * 3、调整了初始化代码，支持指定日期（起点日期，不指定时取系统当前时间）
 * ----------------------------
 * @version v0.1 
 * @author tdy 
 * @date 2016-07-25
 * 实现了各个获取单个时间值方法
 */

/**
 * 使用api
 * 
 * DateTools.getTodayDate(); // 获取今日的日期 2016-07-25 DateTools.getDateByNum(num); //
 * 回滚 num天后的日期，向前回滚 为负数，向后回滚为正数(number) 2016-07-20
 * DateTools.getMonthDays(myMonth); // 获取某月的天数(number) 31
 * DateTools.getQuarterStartMonth(); //获得本季度的开始月份 6
 * DateTools.getWeekStartDate(); //获得本周的开始日期 2016-07-25
 * DateTools.getWeekEndDate(); //获得本周的截止日期 2016-07-31
 * DateTools.getLastWeekStartDate(); //获得上周的起始日期 2016-07-18
 * DateTools.getLastWeekEndDate(); //获得上周的截止日期 2016-07-24
 * DateTools.getMonthStartDate(); //获得本月的开始日期 2016-07-01
 * DateTools.getMonthEndDate();//获得本月的截止日期 2016-07-31
 * DateTools.getLastMonthStartDate(); //获得上月开始日期 2016-06-01
 * DateTools.getLastMonthEndDate();//获得上月截止日期 2016-06-30
 * DateTools.getQuarterStartDate();//获得本季度的开始日期 2016-07-01
 * DateTools.getQuarterEndDate(); //获得本季度的截止日期 2016-09-30 //获取起始截止时间
 * DateTools.getBeginEndDateByKind(intValue); intValue:
 * 时间分类【1当天，2本周，3本月，4本季度，5本年，6昨天，7上周，8上月，9一季度，10二季度，11三季度，12四季度，13去年】 返回：
 * {"beginDate" : "2016-07-01", "endDate" : "2016-07-31"}
 * 
 * //绑定快速选择时间区间选项（select控件） DateTools.bindSelectFast("selectDateTimeFast");
 */
DateTools = {
	now : null, // 起点日期（当前日期）
	nowDayOfWeek : null, // 今天是本周的第几天
	nowDay : null, // 当前日
	nowMonth : null, // 当前月份
	nowYear : null, // 当前年份
	lastYear : null, // 去年年份
	lastMonth : null, // 上月
	init : function(d) {
		if (d != null && d != undefined && (typeof d == 'object')) {
			DateTools.now = d;
		} else {
			DateTools.now = new Date(); // 当前日期
		}
		DateTools.nowDayOfWeek =DateTools.now.getDay()-1 ; // 今天本周的第几天
		DateTools.nowDay = DateTools.now.getDate(); // 当前日
		DateTools.nowMonth = DateTools.now.getMonth(); // 当前月

		DateTools.nowYear = DateTools.now.getYear(); // 当前年
		DateTools.nowYear += (DateTools.nowYear < 2000) ? 1900 : 0;

		DateTools.lastYear = DateTools.nowYear - 1;
		
		var lastMonthDate = new Date(); // 上月日期
		lastMonthDate.setDate(1);
		lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
		DateTools.lastMonth = lastMonthDate.getMonth();
	},
	formatDate : function(date) {
		var myyear = date.getFullYear();
		var mymonth = date.getMonth() + 1;
		var myweekday = date.getDate();

		if (mymonth < 10) {
			mymonth = "0" + mymonth;
		}
		if (myweekday < 10) {
			myweekday = "0" + myweekday;
		}
		return (myyear + "-" + mymonth + "-" + myweekday);
	},
	getTodayDate : function() {
		return DateTools.formatDate(DateTools.now);
	},
	getNowTime : function() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			+ " " + date.getHours() + seperator2 + date.getMinutes()
			+ seperator2 + date.getSeconds();
		return currentdate;
	},
	// 获取几日前的日期
	getDateByNum : function(num) {
		var ddate = new Date(DateTools.nowYear, DateTools.nowMonth,
				DateTools.nowDay);
		ddate.setDate(ddate.getDate() + num);
		return DateTools.formatDate(ddate);
	},
	// 获得某月的天数
	getMonthDays : function(myMonth) {
		//传入参数是自然月份，要减一
		myMonth--;
		var monthStartDate = new Date(DateTools.nowYear, myMonth, 1);
		var monthEndDate = new Date(DateTools.nowYear, myMonth + 1, 1);
		var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	},
	// 获得本季度的开始月份
	getQuarterStartMonth : function() {
		var quarterStartMonth = 0;
		if (DateTools.nowMonth < 3) {
			quarterStartMonth = 0;
		}
		if (2 < DateTools.nowMonth && DateTools.nowMonth < 6) {
			quarterStartMonth = 3;
		}
		if (5 < DateTools.nowMonth && DateTools.nowMonth < 9) {
			quarterStartMonth = 6;
		}
		if (DateTools.nowMonth > 8) {
			quarterStartMonth = 9;
		}
		return quarterStartMonth;
	},
	// 获得本周的开始日期
	getWeekStartDate : function() {
		if(DateTools.nowDayOfWeek == -1){
			//处理星期天显示不对的问题

			 var tmpd = DateTools.nowDay + ( DateTools.nowDayOfWeek+1-6);
			 var weekEndDate = new Date(DateTools.nowYear, DateTools.nowMonth, tmpd);
			 return DateTools.formatDate(weekEndDate);
		}else{
			//源码
			var tmpd = DateTools.nowDay - DateTools.nowDayOfWeek;
			var weekStartDate = new Date(DateTools.nowYear, DateTools.nowMonth,
					tmpd);
			return DateTools.formatDate(weekStartDate);
		}



	},
	// 获得本周的截止日期
	getWeekEndDate : function() {
		if(DateTools.nowDayOfWeek == -1){
			//处理星期天显示不对的问题
			 var tmpd = DateTools.nowDay - (DateTools.nowDayOfWeek+1);
			 var weekStartDate = new Date(DateTools.nowYear, DateTools.nowMonth,
			 tmpd);
			 return DateTools.formatDate(weekStartDate);
		}else{
			//源码
			var tmpd = DateTools.nowDay + (6 - DateTools.nowDayOfWeek);
			var weekEndDate = new Date(DateTools.nowYear, DateTools.nowMonth, tmpd);
			return DateTools.formatDate(weekEndDate);
		}




	},
	// 获得上周的开始日期
	getLastWeekStartDate : function() {
		if(DateTools.nowDayOfWeek == -1){
			 //处理星期天显示不对的问题
			 var weekEndDate = new Date(DateTools.nowYear, DateTools.nowMonth,
			 DateTools.nowDay - (DateTools.nowDayOfWeek+1) - 13);
			 return DateTools.formatDate(weekEndDate);
		}else{
			//源码
			var weekStartDate = new Date(DateTools.nowYear, DateTools.nowMonth,
					DateTools.nowDay - DateTools.nowDayOfWeek - 7);
			return DateTools.formatDate(weekStartDate);
		}

	},
	// 获得上周的截止日期
	getLastWeekEndDate : function() {
		if(DateTools.nowDayOfWeek == -1){
			//处理星期天显示不对的问题
			 var weekEndDate = new Date(DateTools.nowYear, DateTools.nowMonth,
			 DateTools.nowDay - (DateTools.nowDayOfWeek+1) - 7);
			 return DateTools.formatDate(weekEndDate);
		}else{
			//源码
			var weekEndDate = new Date(DateTools.nowYear, DateTools.nowMonth,
					DateTools.nowDay - DateTools.nowDayOfWeek - 1);
			return DateTools.formatDate(weekEndDate);
		}

	},
	// 获得本月的开始日期
	getMonthStartDate : function() {
		var monthStartDate = new Date(DateTools.nowYear, DateTools.nowMonth, 1);
		return DateTools.formatDate(monthStartDate);
	},
	// 获得本月的截止日期
	getMonthEndDate : function() {
		var monthEndDate = new Date(DateTools.nowYear, DateTools.nowMonth,
				DateTools.getMonthDays(DateTools.nowMonth+1));
		return DateTools.formatDate(monthEndDate);
	},
	// 获得上月开始时候
	getLastMonthStartDate : function() {
		if(DateTools.nowMonth==0){
			var lastMonthStartDate = new Date(DateTools.lastYear,
					DateTools.lastMonth, 1);
		}else{
			var lastMonthStartDate = new Date(DateTools.nowYear,
					DateTools.lastMonth, 1);
		}

		return DateTools.formatDate(lastMonthStartDate);
	},
	// 获得上月截止时候
	getLastMonthEndDate : function() {
		if(DateTools.nowMonth==0){
			var lastMonthEndDate = new Date(DateTools.lastYear, DateTools.lastMonth,
					DateTools.getMonthDays(DateTools.lastMonth+1));
		}else{
			var lastMonthEndDate = new Date(DateTools.nowYear, DateTools.lastMonth,
					DateTools.getMonthDays(DateTools.lastMonth+1));
		}

		return DateTools.formatDate(lastMonthEndDate);
	},
	// 获得本季度的开始日期
	getQuarterStartDate : function() {
		var quarterStartDate = new Date(DateTools.nowYear, DateTools
				.getQuarterStartMonth(), 1);
		return DateTools.formatDate(quarterStartDate);
	},
	// 获取本季度的截止日期
	getQuarterEndDate : function() {
		var quarterEndMonth = DateTools.getQuarterStartMonth() + 2;
		var quarterStartDate = new Date(DateTools.nowYear, quarterEndMonth,
				DateTools.getMonthDays(quarterEndMonth));
		return DateTools.formatDate(quarterStartDate);
	},
	// 获取起始截止时间
	getBeginEndDateByKind : function(kind) {
		// kind(int):
		// 时间分类【1当天，2本周，3本月，4本季度，5本年，6昨天，7上周，8上月，9一季度，10二季度，11三季度，12四季度，13去年】
		kind = parseInt(kind);
		var beginDate = "";
		var endDate = "";
		switch (kind) {
		case 1:// 当天
			beginDate = DateTools.getTodayDate();
			endDate = beginDate;
			break;
		case 2:// 本周
			beginDate = DateTools.getWeekStartDate();
			endDate = DateTools.getWeekEndDate();
			break;
		case 3:// 本月
			beginDate = DateTools.getMonthStartDate();
			endDate = DateTools.getMonthEndDate();
			break;
		case 4:// 本季度
			beginDate = DateTools.getQuarterStartDate();
			endDate = DateTools.getQuarterEndDate();
			break;
		case 5:// 本年
			beginDate = DateTools.nowYear + "-01-01";
			endDate = DateTools.nowYear + "-12-31";
			break;
		case 6:// 昨天
			beginDate = DateTools.getDateByNum(-1);
			endDate = beginDate;
			break;
		case 7:// 上周
			beginDate = DateTools.getLastWeekStartDate();
			endDate = DateTools.getLastWeekEndDate();
			break;
		case 8:// 上月
			beginDate = DateTools.getLastMonthStartDate();
			endDate = DateTools.getLastMonthEndDate();
			break;
		case 9:// 一季度
			beginDate = DateTools.nowYear + "-01-01";
			endDate = DateTools.nowYear + "-12-31";
			break;
		case 10:// 二季度
			beginDate = DateTools.nowYear + "-04-01";
			endDate = DateTools.nowYear + "-06-30";
			break;
		case 11:// 三季度
			beginDate = DateTools.nowYear + "-07-01";
			endDate = DateTools.nowYear + "-09-30";
			break;
		case 12:// 四季度
			beginDate = DateTools.nowYear + "-10-01";
			endDate = DateTools.nowYear + "-12-31";
			break;
		case 13:// 去年
			beginDate = (DateTools.nowYear - 1) + "-01-01";
			endDate = (DateTools.nowYear - 1) + "-12-31";
			break;
		}
		var bd = {
			"beginDate" : beginDate,
			"endDate" : endDate
		};
		return bd;
	},
	bindSelectFast : function(id) {
		// 绑定时间区间选择项
		// 时间分类【1当天，2本周，3本月，4本季度，5本年，6昨天，7上周，8上月，9一季度，10二季度，11三季度，12四季度，13去年】
		// var opts = "<option value=''></option><option
		// value='1'>今天</option><option value='2'>本周</option><option
		// value='3'>本月</option><option value='4'>本季度</option><option
		// value='5'>今年</option><option value='6'>昨天</option><option
		// value='7'>上周</option><option value='8'>上个月</option></optgroup><option
		// value='9'>一季度</option><option value='10'>二季度</option><option
		// value='11'>三季度</option><option value='12'>四季度</option><option
		// value='13'>去年</option>";
		var opts = "<option value=''></option><optgroup label='天'><option value='1'>今天</option><option value='6'>昨天</option></optgroup>"
				+ "<optgroup label='周'><option value='2'>本周</option><option value='7'>上周</option></optgroup>"
				+ "<optgroup label='月'><option value='3'>本月</option><option value='8'>上个月</option></optgroup>"
				+ "<optgroup label='季'><option value='4'>本季度</option><option value='9'>一季度</option><option value='10'>二季度</option><option value='11'>三季度</option><option value='12'>四季度</option></optgroup>"
				+ "<optgroup label='年'><option value='5'>今年</option><option value='13'>去年</option></optgroup>";
		$(opts).appendTo($("#" + id));
	}
};
// 初始化
DateTools.init();
