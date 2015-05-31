define(['jquery', 'uploader'], function($, WebUploader){
	var list = $('#fileList_avatar');
    var ratio = window.devicePixelRatio || 1;
    var width = 100 * ratio;
    var height = 100 * ratio;
  
    var uploader = WebUploader.create({
        auto: true,
        swf: '../js/Uploader.swf',
        server: '/avatar/upload',
        pick: '#filePicker_avatar',
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    uploader.on('fileQueued', function(file){
    		var htmlStr = '<div id="' + file.id + '" class="file-item thumbnail">';
    			htmlStr += '<img><div class="info">' + file.name + '</div></div>';
        var li = $(htmlStr);
        var img = li.find('img');
        list.append(li);
        // 创建缩略图
        uploader.makeThumb( file, function(error, src) {
            if (error) {
                img.replaceWith('<span>不能预览</span>');
                return;
            }
            img.attr('src', src);
        }, width, height);
    });

    uploader.on('uploadProgress', function(file, percentage) {
        var li = $('#' + file.id);
        var percent = li.find('.progress span');
        // 避免重复创建
        if(!percent.length){
            percent = $('<p class="progress"><span></span></p>').appendTo(li).find('span');
        }
        percent.css('width', percentage * 100 + '%');
    });

    uploader.on('uploadSuccess', function(file) {
        $('#'+file.id ).addClass('upload-state-done');
    });

    uploader.on('uploadError', function(file) {
        var li = $('#'+file.id );
        var error = li.find('div.error');
        // 避免重复创建
        if(!error.length) {
            error = $('<div class="error"></div>').appendTo( li );
        }

        error.text('上传失败');
    });

    uploader.on('uploadComplete', function(file) {
        $('#'+file.id).find('.progress').remove();
    });
    
    uploader.on('uploadAccept', function(obj, ret){
    		if(ret.status){
    			var info = $('#' + obj.cuted.file.id + ' .info');
    			var str = '<a target="_blank" href="' + ret.path + '">' + ret.path + '</a>'
    			info.empty();
    			info.append(str);
    		}
    });
});