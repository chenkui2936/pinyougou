package com.pinyougou.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellergoods.service.SellerService;

public class UserDetailsServiceImpl implements UserDetailsService {
	
	private SellerService sellerService;
	
	public void setSellerService(SellerService sellerService) {
		this.sellerService = sellerService;
	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		List<GrantedAuthority> grantdAuths=new ArrayList<GrantedAuthority>();
		grantdAuths.add(new SimpleGrantedAuthority("ROLE_SELLER"));
		System.out.println(username);
//		return new User(username, "123456", grantdAuths);
		//得到商家对象
				TbSeller seller = sellerService.findOne(username);
				if(seller!=null){
					if(seller.getStatus().equals("1")){
						return new User(username,seller.getPassword(),grantdAuths);
					}else{
						return null;
					}			
				}else{
					return null;
				}
	}

}
