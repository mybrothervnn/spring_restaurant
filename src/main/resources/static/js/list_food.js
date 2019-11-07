 $(document).ready(function(){
	makejqGrid();
	loadjqGridData();	
});
 // id = jqg1 => cho id = 0
 function editIdFunction(item, index){
	 console.log(item, index);
	 if(!$.isNumeric(item.id))
		 item.id = null;
	 console.log(item, index);
 }
 function btnUpdateClick(){
	 var ret = confirm("Bạn muốn lưu dữ liệu ?");
	 if (!ret){
		 return;
	 }
	 var gridData = $('#grid-table').jqGrid('getGridParam','data');
	 gridData.forEach(editIdFunction);
	 
	 $.ajax({
		 type:"post",
		 url:"/api/update_list_food",
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
const common_col = ['NAME',  'PRICE', 'PICTURE', 'DETAIL'];

const common_col_model = [
	//{index:'id',	name:'id',			width:'110px', align:'center', frozen:true, editable:false},
	{index:'name',	name:'name',    width:'250px', align:'left',   frozen:true, editable:true, sorttype:'text'},
	{index:'price',	name:'price',    width:'150px', align:'left',   frozen:true, editable:true, sorttype:'text'},
	{index:'picture',	name:'picture',    width:'150px', align:'left',   frozen:true, editable:true, sorttype:'text'},
	{index:'detail',	name:'detail',    width:'150px', align:'left',   frozen:true, editable:true, sorttype:'text'}
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
		idPrefix:"",
	});	
	$('#grid-table').jqGrid('setFrozenColumns'); 
	$('#grid-table').jqGrid('navGrid',"#grid-pager",{edit:true,add:true,del:true});
	$('#grid-table').jqGrid('inlineNav',"#grid-pager");
}
function loadjqGridData(){
	$.ajax({
		type: 'get',
		url:  '/api/food', // http://localhost:8080/api/food
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