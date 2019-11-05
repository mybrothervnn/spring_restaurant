 $(document).ready(function(){
	makejqGrid();
	loadjqGridData();	
});
 function btnUpdateClick(){
	 alert("btnUpdate - chức năng cập nhật dữ liệu cho grid");
 }
//------------------------------------------------------------------------------
//jqGrid作成
//------------------------------------------------------------------------------
const common_col = ['ID', 'USERNAME',  'PASS'];

const common_col_model = [
	{index:'id',     name:'id',      width:'110px', align:'center', frozen:true },
	{index:'username',   name:'username',    width:'250px', align:'left',   frozen:true, editable:true},
	{index:'password',   name:'password',    width:'150px', align:'left',   frozen:true, editable:true}
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
		rowNum:25,
		pager:'grid-pager',
		rowList:[25, 50, 75, 100],
		viewrecords:true,
		cmTemplate: {sortable: false},
		sortable: false,
		//width:1200,
		shrinkToFit:false,
	});	
	$('#grid-table').jqGrid('setFrozenColumns'); 
	$('#grid-table').jqGrid('navGrid',"#grid-pager",{edit:true,add:true,del:true});
	$('#grid-table').jqGrid('inlineNav',"#grid-pager");
}
function loadjqGridData(){
	$.ajax({
		type: 'get',
		url:  '/user', // http://localhost:8080/user
		dataType: 'json',
		timeout: 20000,		
		cache: false,
//		data: {'store_cd' : vStore_cd,
//				'ctg_cd'  : vCtg_cd,
//				'supp_cd' : vSupp_cd,
//				},

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