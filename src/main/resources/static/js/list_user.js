 $(document).ready(function(){
	makejqGrid();
	loadjqGridData();	
});
 function btnUpdateClick(){
	 var ret = confirm("Bạn muốn lưu dữ liệu ?");
	 if (!ret){
		 return;
	 }
	 var gridData = $('#grid-table').jqGrid('getGridParam','data');
	 $.ajax({
		 type:"post",
		 url:"/api/update_list_user",
		 data:	JSON.stringify(gridData),
		 datatype:"json",
	     contentType: "application/json",
         cache: false,
         timeout: 600000,
		 success: function(msg) {
				//if(msg == '1'){
					alert("Luu xong 。");						
				//}
				
			},
			error: function(res, textstatus, xhr) {				
				alert("Luu that bai !!!!!。\n" + xhr.statustext);	
			}
	 });
 }
//------------------------------------------------------------------------------
//jqGrid作成
//------------------------------------------------------------------------------
const common_col = ['ID', 'USERNAME',  'PASS'];

const common_col_model = [
	{index:'id',		name:'id',			width:'110px', align:'center', frozen:true, editable:true, sorttype:'text'},
	{index:'username',	name:'username',    width:'250px', align:'left',   frozen:true, editable:true, sorttype:'text'},
	{index:'password',	name:'password',    width:'150px', align:'left',   frozen:true, editable:true, sorttype:'text'}
];
function makejqGrid(){
	var col			= $.extend(true, [], common_col);	
	var col_model	= $.extend(true, [], common_col_model);
	
	$('#grid-table').jqGrid({
		datatype: "local",
		colNames: col,
		colModel: col_model,
		height:520,
		cellEdit: true,
		cellsubmit: 'clientArray',
		rowNum:10,
		pager:'grid-pager',
		rowList:[10, 20, 30, 100],
		viewrecords:true,
		cmTemplate: {sortable: false},
		sortable: true,
		width:"auto",	
		height:"100%",
		shrinkToFit:false,
	});	
	$('#grid-table').jqGrid('setFrozenColumns'); 
	$('#grid-table').jqGrid('navGrid',"#grid-pager",{edit:true,add:true,del:true});
	$('#grid-table').jqGrid('inlineNav',"#grid-pager");
}
function loadjqGridData(){
	$.ajax({
		type: 'get',
		url:  '/api/user', // http://localhost:8080/api/user
		dataType: 'json',
		timeout: 20000,		
		cache: false,
		/**
		 * 表示前
		 */
		beforeSend  : function (data){
			setTimeout($.unblockUI, 10000);
			$("#grid-table").jqGrid("clearGridData");
		},

		/**
		 * データ受領
		 */
		success : function (data, dataType){
			if(data == null)  return;			
			$("#grid-table")
				.jqGrid('setGridParam',
					{ 
						data:data
					})
				.trigger("reloadGrid")
				.jqGrid('setFrozenColumns');
		},
		/**
		 * エラー発生
		 */
		error: function(XMLHttpRequest, textStatus, errorThrown) {			
			if(textStatus == 'parsererror'){
				alert("parsererror");
			} else if(errorThrown == 'timeout'){
				alert('タイムアウト');
				location.reload();
			} else {				
				alert('Error : ' + errorThrown);
			}			
		}
	});
}
var test_data=[
				{"id":1,"username":"thanh","password":"thanh"},
				{"id":2,"username":"test","password":"test"},
				{"id":3,"username":"mybrothervnn","password":"mybrothervnn"},
				{"id":4,"username":"4","password":"4"},
				{"id":5,"username":"5","password":"5"},
				{"id":6,"username":"6","password":"6"},
				{"id":7,"username":"7","password":"7"},
				{"id":8,"username":"8","password":"8"},
				{"id":9,"username":"9","password":"9"},
				{"id":10,"username":"10","password":"10"},
				{"id":11,"username":"11","password":"11"}];