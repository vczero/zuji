
define(['jquery'], function($){
	var select_year = $('#select_year');
	var select_month = $('#select_month');
	var select_day = $('#select_day');
	
	var year = new Date().getFullYear();
	for(var i = 0; i < 30; i++){
		var newYear = year - i;
		select_year.append('<option>' + newYear + '</option>');
	}
	
	
	
	select_year.on('change', function(e){
		select_month.empty();
		select_day.empty();
		select_month.append('<option>选择月</option>');
		//如果是当前年份，则只显示当前月份之前的月份
		if(parseInt($(this).val()) === year){
			var month = parseInt(new Date().getMonth()) + 1;
			for(var i = 0; i < month; i++){
				select_month.append('<option>' + (month - i) + '</option>');
			}
		}else{
			for(var i = 12; i > 0; i--){
				select_month.append('<option>' + i + '</option>');
			}
		}
	});
	
	select_month.on('change', function(e){
		select_day.empty();
		var yyyy = select_year.val();
		var mm = select_month.val();
		var days = new Date(yyyy, mm, 0).getDate();
		for(var i = 1; i < days +1; i++){
			select_day.append('<option>' + i + '</option>');
		}
		
	});

	
});
