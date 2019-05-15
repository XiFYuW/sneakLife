$(function() {
	console.log("initTables");
	$('#table').bootstrapTable({
		url: '../json/system/system-static-tables.json',
		striped: true,
		clickToSelect: true,
		showColumns: true,
		showRefresh: true,
		sortable: true,
		pagination: true, //分页
		sidePagination: "server", //服务端处理分页
		pageNumber: 1, // 默认显示第几页
		pageSize: 10, // 每页显示条数
		columns: [{
				checkbox: true,
				'data-halign': 'center'
			},
			{
				field: 'id',
				title: 'Item ID'
			}, {
				field: 'name',
				title: 'Item Name'
			}, {
				field: 'age',
				title: 'Item Age'
			}
		]
	})

	$('.update').on('click', function() {
		var data = $('#table').bootstrapTable('getAllSelections');
		if(data.length == 0 || data.length > 1) {
			$('.update').popover({
				placement: "bottom",
				content: "请选择一行",
				trigger: "focus"
			});
			$('.update').popover('show');
			return;
		}
		console.log(data);
	})

	$("#navbar ul li").click(function() {
		$("#navbar ul li").removeClass();
		if(!$(this).hasClass("active")) {
			$(this).addClass("active");
		}
		var href = $(this).find("a").attr("href");
		var hr = href.substring(1, href.length);
		var text = $(this).find("a").text();
		var name = $(this).find("a").attr("name");
		console.log(name);
		var panel = $("#defalut");
		panel.attr("id", hr);
		panel = $("#" + hr);
		$.get(name, function(e) {
			panel.html(e);
		});

	})

})