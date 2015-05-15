

/**
 * 文章模型，包含用户评论对象；文章支持修改，评论不支持修改
 * DB的读写分离，后期根据压测结果调整
 * @author: 王利华
 * @time: 2015-5-7
 * @email: lh_wang@ctrip.com
 * */

module.exports.Article = {
	user_id: '',				/*用户id*/
	title: '',				/*文章标题*/
	create_time: '',			/*创建时间*/
	update_time: '',			/*更新时间*/
	content: '',				/*内容*/
	comments: []				/*评论*/
};

module.exports.ArticleComment = {
	user_id: '',				/*评论者id*/
	time: '',				/*评论时间*/
	content: '',				/*评论内容*/
};


