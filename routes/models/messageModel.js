
/**
 * 用户消息模型，用于存储用户之间发送的消息内容；
 * 消息最多寸多少条？其余查数据库，然后下载？＝＝>后期考虑,隔段时间清理
 * @author: 王利华
 * @time: 2015-5-7
 * @email:lh_wang@ctrip.com
 * 
 * */

module.exports.Message = {
	owner_id: '',			/*发送消息的用户id*/
	accept_id: '',			/*接收消息的用户id*/
	messages:[],              /*消息数组,存放MessageContent*/
	update_time: ''			/*最新更新的时间*/
};


module.exports.MessageContent = {
	time: '',				/*消息发送的时间*/
	content: ''				/*消息内容*/
};
