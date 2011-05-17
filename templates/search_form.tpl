<div class="action-bar">
	<a href="{SITE_URL}admin/user/users" id="list-btn" class="btn left">User List</a>
	<a href="{SITE_URL}admin/user/create" id="create-btn" class="btn left">Create User</a>
	<a href="{SITE_URL}admin/user/ban_list" id="ban-btn" class="btn left">Ban List</a>

<form name="search_users" method="post" class="right" action="?u=admin/user/search">
	<label>{B.SEARCH_USER}: </label> 
	<input type="text" name="search_term" id="search_term" value="" /> 
	<select id="search-select" name="search_type">
		<option value="nick_name">{F.NICK}</option>
		<option value="full_name">{F.FULL}</option>
		<option value="e_mail">{F.MAIL}</option>
		<option value="match_case">{F.MATCH}</option>
	</select> 
	<input type="submit" name="search_user" id="search_user" class="btn form-btn" value="{F.S_USER}" />
</form>
</div>