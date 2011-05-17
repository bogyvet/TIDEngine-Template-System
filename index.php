<?php
	
	include('TIDEngine/core/TIDEngine.php');
	
    $data['breadcrumbs'] = 'Site Administration + Users Administration + User List';
    
    //$data['page_title'] = 'User List';
    $data['meta']= array('title'=>'TIDEngine Test Page',
    					 'description'=>'TIDEngine new PHP Template engine',
    					 'keywords'=>'PHP Template engine, TIDEngine, Optimisation, SEO Frioendly',
    					 'author'=>'Goran Bogdanovic',
    					);

    $data['css'] 		= array('core', 
    							'modal');
    
    $data['javascript'] = array('0'=>'core', '1'=>'modal');
    
	$data['frameworks'] = array('0'=>'prototype', 
								'1'=>array('scriptaculous', 
											'builder',
											'effects',
											'dragdrop',  
											'controls', 
											'slider', 
											'sound')
								);

	$data['paginate'] 	= ' <a href="admin/user/users/1" class="paginate_element"> 1 </a>&nbsp; <a href="admin/user/users/2" class="paginate_element"> 2 </a>';
 	$data['modal']		= '1';
	
 	$data['B'] = array(
			            'CREATE' 		=> 'Create User',
			            'BAN_LIST' 		=> 'User Ban List',
			            'SEARCH_USER' 	=> 'Search Users',
			            'EDIT' 			=> 'Edit User Data',
			            'DELETE' 		=> 'Delete User',
			            'BAN' 			=> 'Ban User',
			            'BANNED' 		=> 'User Banned',
			            'R_BAN' 		=> 'Remove User Ban',
			            'UPDATE' 		=> 'Update User Data'	
 						);



	$data['F'] = array(
			            'NO' 		=> 'No',
			            'NICK'		=> 'Nick Name',
			            'FULL' 		=> 'Full Name',
			            'MAIL' 		=> 'E-Mail',
			            'GROUP' 	=> 'User Group',
			            'JOIN' 		=> 'Joined',
			            'ACTION'	=> 'Actions',
			            'PASS'	 	=> 'Password',
			            'PASS_CNF' 	=> 'Confirm Password',
			            'BAN_EX' 	=> 'Ban Expire Date',
			            'BAN_RES' 	=> 'Ban Reason',
			            'BAN_DUR' 	=> 'Ban Duration',
			            'MATCH' 	=> 'Match case',
			            'S_USER' 	=> 'Search Users',
			            'DUR' 	=> array(
					                    'day' 	=> '24 Hours',
					                    'week' 	=> '1 Week',
					                    'month' => '1 Month',
					                    'perm' 	=> 'Permanent'
					               		)
        			);

 
    $data['I'] = array(
            'MN_LEN' 	=> 'Minimum lenght',
            'MX_LEN' 	=> 'Maximum lenght',
            'CHR' 		=> 'chars',
            'V_MAIL' 	=> 'Valid E-Mail address',
            'DEF_USER' 	=> 'Default Member'
        );
    $data['image'] = '<img src="logo/TIDEngine-256-3D-2+.png" alt="TIDEngine_logo" />';
	$data['users'] 	= '<tr>
				    <td class="">1</td>
					<td class="user-list">ssss</td>
					<td class="user-list">sddd</td>
					<td class="user-list">asd@west.com</td>
					<td class="user-list group">Member</td>
					<td class="user-list acc_created">2011-03-30 00:11:55</td>
		
					<td><a href="admin/user/edit/1" title="Title: Edit User, Type: Ajax, Content: Form, Validation: true, Width: 1000, Height: 500, Footer: goodCMS System"  class="icon edit modal">Edit</a><a href="admin/user/delete/1" title="Title: Delete User, Type: Alert, Content: Inline, Container: alertMessage, Width: 300, Height: 120, Footer: , Link: check, Ref: 0" class="icon delete modal">Delete</a><a href="admin/user/ban/1" title="Title: Ban User, Type: Ajax, Content: Form, Validation: true, Width: 900, Height: 420, Footer: goodCMS System"  class="icon ban modal"> Ban User </a></td></tr><tr>
				    <td class="">2</td>
					<td class="user-list">wewer</td>
					<td class="user-list">rrr</td>
					<td class="user-list">srds@gmail.com</td>
		
					<td class="user-list group">Member</td>
					<td class="user-list acc_created">2011-03-29 23:48:35</td>
					<td><a href="admin/user/edit/2" title="Title: Edit User, Type: Ajax, Content: Form, Validation: true, Width: 1000, Height: 500, Footer: goodCMS System"  class="icon edit modal">Edit</a><a href="admin/user/delete/2" title="Title: Delete User, Type: Alert, Content: Inline, Container: alertMessage, Width: 300, Height: 120, Footer: , Link: check, Ref: 0" class="icon delete modal">Delete</a><a href="admin/user/ban/2" title="Title: Ban User, Type: Ajax, Content: Form, Validation: true, Width: 900, Height: 420, Footer: goodCMS System"  class="icon ban modal"> Ban User </a></td>
				</tr>';
	
    $template_array['header'] = 'page_elements/';
    $template_array['search_form'] = 'templates/';
 	$template_array['body'] = '';
	$template_array['footer'] = 'page_elements/';
	//$template_array['debugg'] = 'page_elements/';
	$templ_path = 'templates/';
    
	$TIDE = new TIDEngine();
	$TIDE->check_cache($data,
						$templ_path, 
					    'user_list', 
					    $template_array, '');
//	$TIDE->clear_cache('USER_LIST');