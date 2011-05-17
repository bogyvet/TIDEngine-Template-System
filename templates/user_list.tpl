{SEARCH_FORM}
<table id="user-list">
	<tr>
		<th>No.</th>
		<th>{F.NICK}</th>
		<th>{F.FULL}</th>
		<th>{F.MAIL}</th>
		<th>{F.GROUP}</th>
		<th>{F.JOIN}</th>
		<th class="actions">{F.ACTION}</th>
	</tr>
	{USERS}
	{NO_RECORDS}
</table>
<div class="paginate">{PAGINATE}</div>
<div style="display: none" id="alertMessage">
<div style="padding: 20px 0 20px 0;">Are you sure? Deleting user is permanent!!</div>
<div style="text-align: center" id="alert-holder">
<form name="alert" id="alert" method="post" >
	<input type="submit" id="confirm" class="btn" value="Confirm" /> 
	<input type="button" id="cancel" class="btn cancel" value="Cancel" />
</form>
</div>
</div>


